/**
 * Webhook receptor de leads — Bruno Almirante Lass
 * Deploy em: Vercel → /api/leads
 *
 * Recebe leads de:
 *  - Meta Ads (Facebook/Instagram Lead Ads)
 *  - Google Ads (via Zapier/Make webhook)
 *  - Landing pages próprias
 *  - WhatsApp (formulário site)
 *
 * Salva no Supabase + dispara mensagem WhatsApp via Z-API
 */

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ─── TEMPLATES DE MENSAGEM WHATSAPP ──────────────────────────────────────────

const MENSAGENS = {
  padrao: (nome) =>
    `Olá, ${nome}! 👋 Tudo bem?\n\nSou o Bruno Almirante, especialista Cyrela & Living na Zona Sul de SP.\n\nRecebi seu interesse e quero entender melhor o que você está buscando.\n\nPode me contar um pouco mais sobre o imóvel que procura? 🏡`,

  alto_padrao: (nome) =>
    `Olá, ${nome}! ✨\n\nAqui é o Bruno Almirante, consultor especializado em alto padrão — Cyrela e Living na Zona Sul de SP.\n\nSoube do seu interesse e adoraria apresentar algumas opções exclusivas para você.\n\nPodemos conversar hoje? 🤝`,

  investidor: (nome) =>
    `Olá, ${nome}!\n\nSou o Bruno Almirante, especialista Cyrela & Living.\n\nVejo que você tem interesse em oportunidades de investimento imobiliário na Zona Sul de SP — área com forte valorização e lançamentos premium.\n\nQuando é um bom momento para uma conversa rápida? 📊`,
}

// ─── CLASSIFICAÇÃO AUTOMÁTICA ─────────────────────────────────────────────────

function classificarLead(dados) {
  const valor = parseFloat((dados.investimento || "0").replace(/\D/g, ""))

  let temperatura = "frio"
  let perfil = "padrao"
  let template = "padrao"

  if (valor >= 3000000) {
    temperatura = "quente"
    perfil = "alto_padrao"
    template = "alto_padrao"
  } else if (valor >= 1500000) {
    temperatura = "morno"
    perfil = "medio_alto"
    template = "padrao"
  }

  if (dados.tipo?.toLowerCase().includes("investimento")) {
    perfil = "investidor"
    template = "investidor"
    temperatura = "morno"
  }

  return { temperatura, perfil, template }
}

// ─── NORMALIZAÇÃO DOS DADOS ───────────────────────────────────────────────────

function normalizarLeadMeta(body) {
  // Meta Leads API envia um array de field_data
  const entry   = body?.entry?.[0]
  const changes = entry?.changes?.[0]
  const value   = changes?.value

  if (!value?.leadgen_id) return null

  const fields = {}
  ;(value.field_data || []).forEach(({ name, values }) => {
    fields[name] = values?.[0] || ""
  })

  return {
    nome:         fields["full_name"]   || fields["nome"]   || "",
    email:        fields["email"]       || "",
    whatsapp:     fields["phone_number"]|| fields["whatsapp"]|| "",
    bairro:       fields["bairro"]      || fields["regiao"] || "",
    investimento: fields["orcamento"]   || fields["valor"]  || "",
    tipo:         fields["tipo_imovel"] || "",
    dormitorios:  fields["dormitorios"] || "",
    origem:       "Meta Ads — " + (value.ad_name || "Facebook/Instagram"),
    campanha:     value.campaign_name   || "",
    ad_id:        value.ad_id           || "",
    leadgen_id:   value.leadgen_id      || "",
  }
}

function normalizarLeadGoogle(body) {
  // Google Ads / Zapier envia JSON direto
  return {
    nome:         body.nome     || body.name    || "",
    email:        body.email    || "",
    whatsapp:     body.telefone || body.phone   || body.whatsapp || "",
    bairro:       body.bairro   || body.regiao  || "",
    investimento: body.orcamento|| body.valor   || "",
    tipo:         body.tipo     || "",
    dormitorios:  body.dormitorios || "",
    origem:       "Google Ads — " + (body.campanha || "Search"),
    campanha:     body.campanha || "",
    ad_id:        body.gclid    || "",
    leadgen_id:   body.lead_id  || "",
  }
}

function normalizarLeadGenerico(body) {
  return {
    nome:         body.nome     || body.name    || "",
    email:        body.email    || "",
    whatsapp:     body.telefone || body.whatsapp|| body.phone || "",
    bairro:       body.bairro   || "",
    investimento: body.orcamento|| body.valor   || "",
    tipo:         body.tipo     || "",
    dormitorios:  body.dormitorios || "",
    origem:       body.origem   || "Site",
    campanha:     body.campanha || "",
    ad_id:        "",
    leadgen_id:   "",
  }
}

// ─── ENVIO WHATSAPP via Z-API ─────────────────────────────────────────────────

async function enviarWhatsApp(whatsapp, mensagem) {
  if (!whatsapp || !process.env.ZAPI_INSTANCE || !process.env.ZAPI_TOKEN) {
    console.warn("Z-API não configurada ou número vazio.")
    return
  }

  const numero = whatsapp.replace(/\D/g, "")
  const url = `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: `55${numero}`, message: mensagem }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("Erro Z-API:", err)
  }
}

// ─── SALVAR NO SUPABASE ───────────────────────────────────────────────────────

async function salvarLead(lead) {
  const { error, data } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single()

  if (error) throw new Error("Supabase insert error: " + error.message)
  return data
}

// ─── HANDLER PRINCIPAL ────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // Vercel: GET para verificação de webhook do Meta
  if (req.method === "GET") {
    const mode      = req.query["hub.mode"]
    const token     = req.query["hub.verify_token"]
    const challenge = req.query["hub.challenge"]

    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
      console.log("Meta webhook verificado com sucesso.")
      return res.status(200).send(challenge)
    }
    return res.status(403).json({ error: "Token inválido" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  const body = req.body

  // ── Detectar origem e normalizar dados ──
  let dadosBrutos
  if (body?.object === "page" && body?.entry) {
    dadosBrutos = normalizarLeadMeta(body)
  } else if (body?.gclid || body?.google_lead_id) {
    dadosBrutos = normalizarLeadGoogle(body)
  } else {
    dadosBrutos = normalizarLeadGenerico(body)
  }

  if (!dadosBrutos || !dadosBrutos.nome) {
    return res.status(400).json({ error: "Dados do lead inválidos ou incompletos" })
  }

  // ── Classificar lead ──
  const { temperatura, perfil, template } = classificarLead(dadosBrutos)

  // ── Montar objeto final ──
  const lead = {
    ...dadosBrutos,
    temperatura,
    perfil,
    etapa:        "Novo Lead",
    status:       "ativo",
    score:        temperatura === "quente" ? 70 : temperatura === "morno" ? 40 : 15,
    data_entrada: new Date().toISOString(),
    ultimo_contato: null,
    observacoes:  "",
  }

  try {
    // ── Salvar no banco ──
    const leadSalvo = await salvarLead(lead)
    console.log("Lead salvo:", leadSalvo.id, lead.nome)

    // ── Enviar WhatsApp automaticamente ──
    if (lead.whatsapp) {
      const mensagem = MENSAGENS[template](lead.nome.split(" ")[0])
      await enviarWhatsApp(lead.whatsapp, mensagem)
      console.log("WhatsApp enviado para:", lead.whatsapp)
    }

    return res.status(200).json({
      success: true,
      lead_id: leadSalvo.id,
      nome:    lead.nome,
      temp:    temperatura,
    })
  } catch (err) {
    console.error("Erro ao processar lead:", err)
    return res.status(500).json({ error: err.message })
  }
}
