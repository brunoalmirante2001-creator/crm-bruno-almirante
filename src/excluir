import { useState, useEffect } from "react"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// ── THEME ─────────────────────────────────────────────────────────────────────
const G = "#C9A96E", Gl = "#D4BA84", Gd = "#8A6A3A"
const BG = "#09080A", BG2 = "#0F0E0B", BG3 = "#181510", BG4 = "#221D15"
const TX = "#EAE0CC", TX2 = "#8A7A62", TX3 = "#5A4F3C"
const BD = "rgba(201,169,110,0.13)", BDh = "rgba(201,169,110,0.28)"
const GRN = "rgba(37,211,102,0.12)", GRNt = "#35C070"

// ── DATA ──────────────────────────────────────────────────────────────────────
const LEADS = [
  {id:1,nome:"Fernanda Rocha",wa:"11 99234-5678",email:"fernanda@email.com",bairro:"Brooklin",valor:"R$ 1,8M",tipo:"Apartamento",dorms:"3",m2:"120m²",origem:"Instagram Ads",entrada:"12/05",etapa:"Cliente interessado",temp:"quente",obs:"Quer varanda gourmet. Muito engajada nos vídeos do Garden II. Ligou 2x."},
  {id:2,nome:"Ricardo Almeida",wa:"11 98765-4321",email:"ricardo@empresa.com",bairro:"Campo Belo",valor:"R$ 3,2M",tipo:"Cobertura",dorms:"4",m2:"280m²",origem:"Google Ads",entrada:"08/05",etapa:"Agendamento de visita",temp:"quente",obs:"Investidor. Já possui 2 imóveis Cyrela. Busca cobertura duplex premium."},
  {id:3,nome:"Mariana Santos",wa:"11 91234-5678",email:"mariana@gmail.com",bairro:"Vila Mariana",valor:"R$ 1,1M",tipo:"Apartamento",dorms:"2",m2:"75m²",origem:"Facebook Ads",entrada:"15/05",etapa:"Envio de material",temp:"morno",obs:"Primeiro imóvel. Precisa de financiamento. Casal jovem."},
  {id:4,nome:"André Hoffmann",wa:"11 97654-3210",email:"andre@hoffmann.com.br",bairro:"Chácara S.A.",valor:"R$ 5,0M",tipo:"Penthouse",dorms:"4+",m2:"400m²",origem:"WhatsApp",entrada:"02/05",etapa:"Negociação",temp:"quente",obs:"CEO de tech. Quer rooftop exclusivo com heliponto. Perfil altíssimo padrão."},
  {id:5,nome:"Cristina Lopes",wa:"11 96789-0123",email:"cristina@uol.com.br",bairro:"Ipiranga",valor:"R$ 850k",tipo:"Apartamento",dorms:"2",m2:"68m²",origem:"Landing Page",entrada:"18/05",etapa:"Primeiro Contato",temp:"frio",obs:"Em fase de pesquisa. Aguardar retorno em 2 semanas."},
  {id:6,nome:"Paulo Mendes",wa:"11 95678-9012",email:"paulo@outlook.com",bairro:"Mooca",valor:"R$ 1,5M",tipo:"Garden",dorms:"3",m2:"140m²",origem:"RD Station",entrada:"10/05",etapa:"Visita realizada",temp:"morno",obs:"Gostou muito do empreendimento. Aguardando aprovação de crédito no banco."},
  {id:7,nome:"Juliana Ferrari",wa:"11 94567-8901",email:"ju.ferrari@gmail.com",bairro:"Klabin",valor:"R$ 2,1M",tipo:"Alto Padrão",dorms:"3",m2:"160m²",origem:"Instagram Ads",entrada:"05/05",etapa:"Proposta enviada",temp:"quente",obs:"Quer apartamento de andar alto. Vista privilegiada é requisito."},
  {id:8,nome:"Roberto Yamamoto",wa:"11 93456-7890",email:"r.yamamoto@gmail.com",bairro:"Aclimação",valor:"R$ 1,3M",tipo:"Apartamento",dorms:"3",m2:"98m²",origem:"Google Ads",entrada:"14/05",etapa:"Atendimento em andamento",temp:"morno",obs:"Família de 4 pessoas. Prioridade é lazer completo e escola próxima."},
  {id:9,nome:"Sofia Carvalho",wa:"11 92345-6789",email:"sofia@gmail.com",bairro:"Vila Mascote",valor:"R$ 1,6M",tipo:"Garden",dorms:"3",m2:"135m²",origem:"Instagram Ads",entrada:"19/05",etapa:"Novo Lead",temp:"frio",obs:"Recém chegou via instagram. Aguardar primeiro contato."},
  {id:10,nome:"Eduardo Lima",wa:"11 91234-5670",email:"edu@hotmail.com",bairro:"Brooklin",valor:"R$ 4,5M",tipo:"Cobertura",dorms:"4",m2:"350m²",origem:"Google Ads",entrada:"20/05",etapa:"Primeiro Contato",temp:"morno",obs:"Perfil alto padrão. Executivo de multinacional. Retornar amanhã 10h."},
]

const IMOVEIS = [
  {id:1,nome:"Reserva Brooklin",bairro:"Brooklin",const:"Cyrela",tier:"Alto Padrão",valor:"R$ 1,6M – 3,2M",m2:"110–220m²",dorms:"3 e 4",status:"Lançamento",leads:24,tags:["Rooftop Piscina","Academia Premium","Co-working","Vista 360°","Wine Bar"]},
  {id:2,nome:"Living Campo Belo",bairro:"Campo Belo",const:"Living",tier:"Médio-Alto",valor:"R$ 1,1M – 2,4M",m2:"78–160m²",dorms:"2 e 3",status:"Em Obras",leads:18,tags:["Terraço Gourmet","Spa","Pet Place","Salão Festas","Brinquedoteca"]},
  {id:3,nome:"Garden Klabin",bairro:"Klabin",const:"Cyrela",tier:"Alto Padrão",valor:"R$ 1,8M – 2,9M",m2:"120–185m²",dorms:"3 e 4",status:"Pronto",leads:12,tags:["Garden Privativo","Piscina Privada","Churrasqueira","Parque Interno"]},
  {id:4,nome:"Alto Vila Mariana",bairro:"Vila Mariana",const:"Living",tier:"Médio Padrão",valor:"R$ 890k – 1,5M",m2:"62–95m²",dorms:"2 e 3",status:"Lançamento",leads:15,tags:["Varanda Gourmet","Academia","Studio Pilates","Bicicletário"]},
  {id:5,nome:"Penthouse Chácara",bairro:"Chácara S.A.",const:"Cyrela",tier:"Altíssimo Padrão",valor:"R$ 3,8M – 7,0M",m2:"280–450m²",dorms:"4+",status:"Sob Consulta",leads:6,tags:["Rooftop Exclusivo","Heliponto","Wine Cellar","Piscina Aquecida","Spa Privativo"]},
  {id:6,nome:"Mooca Life",bairro:"Mooca",const:"Living",tier:"Médio Padrão",valor:"R$ 750k – 1,3M",m2:"58–120m²",dorms:"2 e 3",status:"Em Obras",leads:8,tags:["Espaço Família","Home Office","Brinquedoteca","Piscina","Pet Place"]},
  {id:7,nome:"Aclimação Green",bairro:"Aclimação",const:"Cyrela",tier:"Alto Padrão",valor:"R$ 1,4M – 2,2M",m2:"90–155m²",dorms:"2 e 3",status:"Lançamento",leads:9,tags:["Wellness Club","Yoga Deck","Piscina Natural","Horta Orgânica"]},
  {id:8,nome:"Ipiranga Haus",bairro:"Ipiranga",const:"Living",tier:"Médio Padrão",valor:"R$ 680k – 1,1M",m2:"52–88m²",dorms:"1 e 2",status:"Em Obras",leads:7,tags:["Studio Moderno","Academia","Co-work","Área Gourmet"]},
]

const FUNIL = [
  {stage:"Novo Lead",full:"Novo Lead",count:9,cor:"#3A5A8A"},
  {stage:"1º Contato",full:"Primeiro Contato",count:7,cor:"#4A6898"},
  {stage:"Atendimento",full:"Atendimento em andamento",count:6,cor:"#5A7898"},
  {stage:"Material Env.",full:"Envio de material",count:5,cor:"#6A8880"},
  {stage:"Interessado",full:"Cliente interessado",count:7,cor:"#8A8860"},
  {stage:"Agendamento",full:"Agendamento de visita",count:4,cor:"#A88840"},
  {stage:"Visita Realiz.",full:"Visita realizada",count:3,cor:"#B87830"},
  {stage:"Negociação",full:"Negociação",count:3,cor:"#C86820"},
  {stage:"Proposta Env.",full:"Proposta enviada",count:2,cor:"#D85810"},
  {stage:"Reserva/Apr.",full:"Reserva / aprovação",count:2,cor:"#C8A010"},
  {stage:"Venda Concl.",full:"Venda concluída",count:5,cor:"#288A40"},
  {stage:"Pós-venda",full:"Pós-venda",count:3,cor:"#38A050"},
]

const AUTOMACOES = [
  {id:1,titulo:"Boas-vindas no WhatsApp",desc:"Mensagem humanizada ao captar novo lead em qualquer canal",trigger:"Novo lead captado",ativa:true,exec:247,tipo:"whatsapp"},
  {id:2,titulo:"Follow-up 24h sem resposta",desc:"Lembrete de retorno se lead não respondeu em 24 horas",trigger:"24h sem resposta",ativa:true,exec:89,tipo:"alerta"},
  {id:3,titulo:"Follow-up 72h parado",desc:"Alerta para reativar lead parado no funil",trigger:"72h sem contato",ativa:true,exec:44,tipo:"alerta"},
  {id:4,titulo:"Book digital automático",desc:"Envia PDF do empreendimento baseado na região de interesse",trigger:"Etapa: Envio de material",ativa:true,exec:132,tipo:"email"},
  {id:5,titulo:"Alerta lead quente",desc:"Notificação imediata quando lead atinge score alto",trigger:"Score ≥ 70 pts",ativa:true,exec:28,tipo:"alerta"},
  {id:6,titulo:"Mensagem pós-visita",desc:"Agradecimento personalizado após visita realizada",trigger:"Etapa: Visita realizada",ativa:false,exec:0,tipo:"whatsapp"},
  {id:7,titulo:"Etiqueta por orçamento",desc:"Classifica automaticamente por faixa de investimento",trigger:"Entrada do lead",ativa:true,exec:189,tipo:"tag"},
  {id:8,titulo:"Lembrete proposta 48h",desc:"Aviso quando proposta enviada não teve resposta",trigger:"48h após proposta",ativa:true,exec:12,tipo:"alerta"},
]

const ORIGEM_DATA = [
  {name:"Instagram Ads",value:38,color:"#C9507C"},
  {name:"Google Ads",value:27,color:"#4A90E2"},
  {name:"Facebook Ads",value:18,color:"#3A70C2"},
  {name:"WhatsApp",value:9,color:"#25D366"},
  {name:"Outros",value:8,color:G},
]

const MONTHLY = [
  {mes:"Jan",leads:12,visitas:4,vendas:1},
  {mes:"Fev",leads:18,visitas:6,vendas:2},
  {mes:"Mar",leads:22,visitas:8,vendas:2},
  {mes:"Abr",leads:31,visitas:11,vendas:3},
  {mes:"Mai",leads:27,visitas:9,vendas:4},
]

const BAIRROS = [
  {b:"Brooklin",n:24},{b:"Campo Belo",n:18},{b:"Vila Mariana",n:15},
  {b:"Klabin",n:12},{b:"Chácara S.A.",n:10},{b:"Mooca",n:8},{b:"Aclimação",n:7},
]

// ── HELPERS ───────────────────────────────────────────────────────────────────
function tempC(temp) {
  if (temp==="quente") return {bg:"rgba(210,80,50,0.14)",tx:"#E08060",dot:"#D06040"}
  if (temp==="morno")  return {bg:"rgba(210,160,50,0.14)",tx:"#D0A050",dot:"#C08030"}
  return {bg:"rgba(90,110,180,0.14)",tx:"#8090C0",dot:"#6070A0"}
}
function statusC(s) {
  if (s==="Lançamento")   return {bg:"rgba(201,169,110,0.12)",tx:G,br:`${G}30`}
  if (s==="Em Obras")     return {bg:"rgba(80,140,230,0.12)",tx:"#70A8E0",br:"rgba(80,140,230,0.3)"}
  if (s==="Pronto")       return {bg:"rgba(60,170,100,0.12)",tx:"#50C080",br:"rgba(60,170,100,0.3)"}
  return {bg:"rgba(160,100,220,0.12)",tx:"#B080D0",br:"rgba(160,100,220,0.3)"}
}
function waLink(wa, msg="") {
  return `https://wa.me/55${wa.replace(/\D/g,"")}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`
}
function initials(nome) { return nome.split(" ").map(w=>w[0]).slice(0,2).join("") }

// ── TOOLTIP ───────────────────────────────────────────────────────────────────
function ChartTip({active,payload,label}) {
  if (!active || !payload?.length) return null
  return (
    <div style={{background:BG4,border:`1px solid ${BD}`,borderRadius:8,padding:"10px 14px"}}>
      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:G,marginBottom:6,fontWeight:500,letterSpacing:"0.08em"}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX2,marginBottom:2}}>
          <span style={{color:p.color||G}}>{p.name}: </span>
          <span style={{color:TX}}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const NAV = [
  {id:"dashboard",sym:"⬡",label:"Dashboard"},
  {id:"leads",sym:"◎",label:"Leads"},
  {id:"funil",sym:"▽",label:"Funil de Vendas"},
  {id:"imoveis",sym:"⬘",label:"Empreendimentos"},
  {id:"automacoes",sym:"⟳",label:"Automações"},
  {id:"relatorios",sym:"◫",label:"Relatórios"},
]

function Sidebar({view,setView}) {
  return (
    <div style={{
      width:232,minHeight:"100vh",background:BG2,
      borderRight:`1px solid ${BD}`,
      display:"flex",flexDirection:"column",flexShrink:0
    }}>
      {/* Brand */}
      <div style={{padding:"26px 22px 22px",borderBottom:`1px solid ${BD}`}}>
        <div style={{
          display:"flex",gap:6,alignItems:"center",marginBottom:14
        }}>
          <div style={{
            padding:"3px 8px",borderRadius:3,
            border:`1px solid ${BD}`,
            fontFamily:"Montserrat,sans-serif",
            fontSize:9,color:G,letterSpacing:"0.15em",textTransform:"uppercase"
          }}>Cyrela</div>
          <div style={{
            padding:"3px 8px",borderRadius:3,
            border:`1px solid rgba(100,160,100,0.3)`,
            fontFamily:"Montserrat,sans-serif",
            fontSize:9,color:"#70B080",letterSpacing:"0.15em",textTransform:"uppercase"
          }}>Living</div>
        </div>
        <div style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:22,fontWeight:600,color:TX,lineHeight:1.1,marginBottom:3
        }}>Bruno Almirante</div>
        <div style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:14,fontStyle:"italic",color:G,marginBottom:10
        }}>Corretor Especialista</div>
        <div style={{
          fontFamily:"Montserrat,sans-serif",fontSize:10,
          color:TX3,letterSpacing:"0.1em",textTransform:"uppercase"
        }}>Zona Sul · São Paulo</div>
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:"10px 0"}}>
        {NAV.map(n=>{
          const on = view===n.id
          return (
            <button key={n.id} onClick={()=>setView(n.id)} style={{
              width:"100%",display:"flex",alignItems:"center",gap:11,
              padding:"11px 22px",border:"none",cursor:"pointer",
              background: on ? "rgba(201,169,110,0.09)" : "transparent",
              borderLeft: on ? `2px solid ${G}` : "2px solid transparent",
              color: on ? G : TX2,
              fontFamily:"Montserrat,sans-serif",
              fontSize:12,fontWeight: on ? 500 : 400,
              letterSpacing:"0.05em",transition:"all 0.15s",textAlign:"left"
            }}>
              <span style={{fontSize:13,width:16,textAlign:"center",opacity:on?1:0.6}}>{n.sym}</span>
              {n.label}
            </button>
          )
        })}
      </nav>

      {/* WA Quick */}
      <div style={{padding:"14px 16px",borderTop:`1px solid ${BD}`}}>
        <a href={waLink("11947933199")} target="_blank" rel="noreferrer" style={{
          display:"flex",alignItems:"center",gap:10,
          padding:"10px 13px",borderRadius:9,
          background:"rgba(37,211,102,0.09)",
          border:"1px solid rgba(37,211,102,0.22)",
          textDecoration:"none"
        }}>
          <div style={{
            width:28,height:28,borderRadius:"50%",
            background:"rgba(37,211,102,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",
            color:GRNt,fontSize:14,flexShrink:0
          }}>✆</div>
          <div>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:GRNt,fontWeight:500}}>WhatsApp</div>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:"rgba(53,192,112,0.6)"}}>11 94793-3199</div>
          </div>
        </a>
      </div>
    </div>
  )
}

// ── TOPBAR ────────────────────────────────────────────────────────────────────
function TopBar({view}) {
  const T = {
    dashboard:"Dashboard",leads:"Gestão de Leads",
    funil:"Funil de Vendas",imoveis:"Empreendimentos",
    automacoes:"Automações",relatorios:"Relatórios"
  }
  const d = new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})
  return (
    <div style={{
      height:62,background:BG,borderBottom:`1px solid ${BD}`,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 32px",flexShrink:0
    }}>
      <h1 style={{
        fontFamily:"'Cormorant Garamond',Georgia,serif",
        fontSize:24,fontWeight:500,color:TX,margin:0,letterSpacing:"0.02em"
      }}>{T[view]||"CRM"}</h1>
      <div style={{display:"flex",alignItems:"center",gap:20}}>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:G,marginBottom:2,letterSpacing:"0.08em"}}>● ATIVO</div>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX2,letterSpacing:"0.04em"}}>{d}</div>
        </div>
        <div style={{
          width:36,height:36,borderRadius:"50%",
          background:"rgba(201,169,110,0.12)",border:`1px solid ${BD}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:14,fontWeight:600,color:G
        }}>BA</div>
      </div>
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const kpis = [
    {l:"Total de Leads",v:"60",sub:"↑ 12 esta semana",pos:true},
    {l:"CPL Médio",v:"R$ 42",sub:"Meta: R$ 35,00",pos:false},
    {l:"Taxa de Conversão",v:"8,3%",sub:"↑ 1,2pp no mês",pos:true},
    {l:"Volume em Vendas",v:"R$ 8,4M",sub:"4 vendas em maio",pos:true},
  ]
  return (
    <div style={{padding:"26px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {kpis.map((k,i)=>(
          <div key={i} style={{
            background:BG3,border:`1px solid ${BD}`,borderRadius:12,
            padding:"20px 22px",position:"relative",overflow:"hidden"
          }}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:"1.5px",background:`${G}60`}} />
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>{k.l}</div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:34,fontWeight:600,color:TX,lineHeight:1,marginBottom:7}}>{k.v}</div>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:k.pos?"#50C080":"#C07050"}}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:14,marginBottom:14}}>
        {/* Area */}
        <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"22px 24px"}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Performance Mensal</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:TX,marginBottom:18}}>Leads · Visitas · Vendas</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={MONTHLY} margin={{top:5,right:5,bottom:0,left:-24}}>
              <defs>
                <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={G} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={G} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,110,0.06)" />
              <XAxis dataKey="mes" tick={{fill:TX2,fontSize:9,fontFamily:"Montserrat"}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:TX2,fontSize:9,fontFamily:"Montserrat"}} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip/>} />
              <Area type="monotone" dataKey="leads" stroke={G} fill="url(#gL)" strokeWidth={2} name="Leads" dot={{fill:G,r:3,strokeWidth:0}} />
              <Area type="monotone" dataKey="visitas" stroke="#60A0D0" fill="none" strokeWidth={1.5} strokeDasharray="5 3" name="Visitas" dot={{fill:"#60A0D0",r:2,strokeWidth:0}} />
              <Area type="monotone" dataKey="vendas" stroke="#50C080" fill="none" strokeWidth={1.5} name="Vendas" dot={{fill:"#50C080",r:2,strokeWidth:0}} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:16,marginTop:10}}>
            {[{c:G,l:"Leads"},{c:"#60A0D0",l:"Visitas"},{c:"#50C080",l:"Vendas"}].map((x,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:5,fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2}}>
                <div style={{width:14,height:2,background:x.c,borderRadius:1}}/>
                {x.l}
              </div>
            ))}
          </div>
        </div>
        {/* Pie */}
        <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"22px 24px"}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Origem dos Leads</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:TX,marginBottom:10}}>Campanhas</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={ORIGEM_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={66} dataKey="value" paddingAngle={2} strokeWidth={0}>
                {ORIGEM_DATA.map((e,i)=><Cell key={i} fill={e.color} opacity={0.8}/>)}
              </Pie>
              <Tooltip content={<ChartTip/>} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:4}}>
            {ORIGEM_DATA.map((o,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"Montserrat,sans-serif",fontSize:10}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:7,height:7,borderRadius:2,background:o.color}}/>
                  <span style={{color:TX2}}>{o.name}</span>
                </div>
                <span style={{color:TX,fontWeight:500}}>{o.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {/* Bairros */}
        <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"22px 24px"}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Demanda por Região</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:TX,marginBottom:16}}>Top Bairros</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={BAIRROS} layout="vertical" margin={{left:0,right:12,top:0,bottom:0}}>
              <XAxis type="number" tick={{fill:TX2,fontSize:9,fontFamily:"Montserrat"}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="b" tick={{fill:TX2,fontSize:10,fontFamily:"Montserrat"}} axisLine={false} tickLine={false} width={82}/>
              <Tooltip content={<ChartTip/>} />
              <Bar dataKey="n" fill={G} radius={[0,4,4,0]} opacity={0.72} name="Leads"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Activity */}
        <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"22px 24px"}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Atividade Recente</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:TX,marginBottom:14}}>Últimas Ações</div>
          {[
            {t:"Novo lead captado",n:"Eduardo Lima",src:"Google Ads",time:"há 2h",c:G},
            {t:"Visita agendada",n:"Ricardo Almeida",src:"Campo Belo",time:"há 4h",c:"#60A0D0"},
            {t:"Proposta enviada",n:"Juliana Ferrari",src:"Garden Klabin",time:"há 5h",c:"#50C080"},
            {t:"Novo lead captado",n:"Sofia Carvalho",src:"Instagram",time:"há 7h",c:G},
            {t:"Follow-up realizado",n:"Mariana Santos",src:"WhatsApp",time:"há 9h",c:TX2},
            {t:"Venda concluída 🏆",n:"Carlos Vieira",src:"Reserva Brooklin",time:"ontem",c:"#50C080"},
          ].map((a,i)=>(
            <div key={i} style={{
              display:"flex",alignItems:"flex-start",gap:9,
              padding:"9px 0",borderBottom: i<5 ? `1px solid ${BD}` : "none"
            }}>
              <div style={{width:5,height:5,borderRadius:"50%",background:a.c,marginTop:5,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX,fontWeight:500,marginBottom:1}}>
                  {a.t} — <span style={{color:G}}>{a.n}</span>
                </div>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.04em"}}>{a.src} · {a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── LEADS ──────────────────────────────────────────────────────────────────────
function Leads() {
  const [q,setQ] = useState("")
  const [ft,setFt] = useState("todos")
  const [sel,setSel] = useState(null)

  const items = LEADS.filter(l=>
    (!q || l.nome.toLowerCase().includes(q.toLowerCase()) || l.bairro.toLowerCase().includes(q.toLowerCase()) || l.etapa.toLowerCase().includes(q.toLowerCase())) &&
    (ft==="todos" || l.temp===ft)
  )

  return (
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Filter bar */}
        <div style={{
          padding:"16px 32px",borderBottom:`1px solid ${BD}`,
          display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0
        }}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Buscar por nome, bairro, etapa..."
              style={{
                background:BG3,border:`1px solid ${BD}`,borderRadius:8,
                padding:"8px 13px",color:TX,fontFamily:"Montserrat,sans-serif",
                fontSize:12,width:250,outline:"none"
              }}/>
            {["todos","quente","morno","frio"].map(t=>(
              <button key={t} onClick={()=>setFt(t)} style={{
                padding:"7px 13px",borderRadius:7,cursor:"pointer",
                border:`1px solid ${ft===t ? G : BD}`,
                background: ft===t ? "rgba(201,169,110,0.10)" : "transparent",
                color: ft===t ? G : TX2,
                fontFamily:"Montserrat,sans-serif",fontSize:11,
                textTransform:"capitalize",letterSpacing:"0.04em"
              }}>{t}</button>
            ))}
          </div>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX2}}>
            <span style={{color:G}}>{items.length}</span> leads encontrados
          </div>
        </div>

        {/* Table */}
        <div style={{flex:1,overflowY:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead style={{position:"sticky",top:0,background:BG}}>
              <tr style={{borderBottom:`1px solid ${BD}`}}>
                {["Nome / Valor","Bairro","Tipo","Origem","Etapa","Temp.",""].map(h=>(
                  <th key={h} style={{
                    fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,
                    letterSpacing:"0.13em",textTransform:"uppercase",
                    textAlign:"left",padding:"13px 14px 10px",fontWeight:500,
                    borderBottom:`1px solid ${BD}`
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(l=>{
                const tc = tempC(l.temp)
                const on = sel?.id===l.id
                return (
                  <tr key={l.id} onClick={()=>setSel(on?null:l)} style={{
                    borderBottom:`1px solid ${BD}`,cursor:"pointer",
                    background: on ? "rgba(201,169,110,0.05)" : "transparent",
                    transition:"background 0.1s"
                  }}>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:13,color:TX,fontWeight:500}}>{l.nome}</div>
                      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:14,color:G,marginTop:1}}>{l.valor}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontFamily:"Montserrat,sans-serif",fontSize:12,color:TX2}}>{l.bairro}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX}}>{l.tipo}</div>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX2,marginTop:1}}>{l.dorms} dorms · {l.m2}</div>
                    </td>
                    <td style={{padding:"13px 14px",fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX2}}>{l.origem}</td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{
                        display:"inline-block",padding:"3px 8px",borderRadius:5,
                        background:"rgba(201,169,110,0.09)",border:`1px solid ${BD}`,
                        fontFamily:"Montserrat,sans-serif",fontSize:9,color:Gl,
                        letterSpacing:"0.05em",whiteSpace:"nowrap"
                      }}>{l.etapa}</div>
                    </td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{
                        display:"inline-flex",alignItems:"center",gap:5,
                        padding:"3px 8px",borderRadius:5,
                        background:tc.bg,
                        fontFamily:"Montserrat,sans-serif",fontSize:10,color:tc.tx
                      }}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:tc.dot}}/>
                        {l.temp}
                      </div>
                    </td>
                    <td style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",gap:6}}>
                        <a href={waLink(l.wa)} target="_blank" onClick={e=>e.stopPropagation()}
                          style={{
                            width:30,height:30,borderRadius:7,
                            background:"rgba(37,211,102,0.11)",border:"1px solid rgba(37,211,102,0.22)",
                            display:"flex",alignItems:"center",justifyContent:"center",
                            color:GRNt,fontSize:14,textDecoration:"none"
                          }}>✆</a>
                        <button onClick={e=>{e.stopPropagation();setSel(l)}} style={{
                          width:30,height:30,borderRadius:7,
                          background:BG3,border:`1px solid ${BD}`,cursor:"pointer",
                          color:TX2,fontSize:13
                        }}>→</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side panel */}
      {sel && (
        <div style={{
          width:296,borderLeft:`1px solid ${BD}`,background:BG2,
          overflowY:"auto",flexShrink:0,padding:"22px 20px"
        }}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",paddingTop:2}}>Perfil do Lead</div>
            <button onClick={()=>setSel(null)} style={{
              width:22,height:22,borderRadius:5,border:`1px solid ${BD}`,
              background:"transparent",color:TX2,cursor:"pointer",fontSize:11
            }}>✕</button>
          </div>
          <div style={{
            width:46,height:46,borderRadius:"50%",
            background:"rgba(201,169,110,0.12)",border:`1px solid ${BD}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:18,fontWeight:600,color:G,marginBottom:12
          }}>{initials(sel.nome)}</div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:TX,marginBottom:3}}>{sel.nome}</div>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:G,marginBottom:4,letterSpacing:"0.06em"}}>{sel.etapa}</div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:5,marginBottom:18,
            padding:"3px 8px",borderRadius:5,
            background:tempC(sel.temp).bg,
            fontFamily:"Montserrat,sans-serif",fontSize:10,color:tempC(sel.temp).tx
          }}>
            <div style={{width:5,height:5,borderRadius:"50%",background:tempC(sel.temp).dot}}/>
            Lead {sel.temp}
          </div>
          {[
            {l:"WhatsApp",v:sel.wa},{l:"Email",v:sel.email},
            {l:"Bairro",v:sel.bairro},{l:"Investimento",v:sel.valor},
            {l:"Tipo",v:sel.tipo},{l:"Dormitórios",v:sel.dorms},
            {l:"Metragem",v:sel.m2},{l:"Origem",v:sel.origem},
            {l:"Entrada",v:sel.entrada},
          ].map((r,i)=>(
            <div key={i} style={{
              display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"8px 0",borderBottom:`1px solid ${BD}`
            }}>
              <span style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.06em",paddingTop:1}}>{r.l}</span>
              <span style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX,textAlign:"right",maxWidth:155,lineHeight:1.4}}>{r.v}</span>
            </div>
          ))}
          {sel.obs && (
            <div style={{marginTop:14,padding:"12px 14px",background:BG3,borderRadius:8,border:`1px solid ${BD}`}}>
              <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>Observações</div>
              <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX,lineHeight:1.65}}>{sel.obs}</div>
            </div>
          )}
          <a href={waLink(sel.wa)} target="_blank" style={{
            display:"flex",alignItems:"center",justifyContent:"center",gap:8,
            marginTop:16,padding:"10px 0",borderRadius:8,
            background:"rgba(37,211,102,0.10)",border:"1px solid rgba(37,211,102,0.22)",
            color:GRNt,fontFamily:"Montserrat,sans-serif",fontSize:12,
            textDecoration:"none",fontWeight:500,letterSpacing:"0.05em"
          }}>✆ Abrir no WhatsApp</a>
          <div style={{
            marginTop:10,padding:"10px 12px",borderRadius:8,
            background:BG3,border:`1px solid ${BD}`
          }}>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Mover no Funil</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {["Agendamento de visita","Negociação","Proposta enviada"].map((e,i)=>(
                <button key={i} style={{
                  padding:"6px 10px",borderRadius:6,border:`1px solid ${BD}`,
                  background:"transparent",color:TX2,cursor:"pointer",
                  fontFamily:"Montserrat,sans-serif",fontSize:10,textAlign:"left",letterSpacing:"0.04em"
                }}>→ {e}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── FUNIL ──────────────────────────────────────────────────────────────────────
function Funil() {
  const [active,setActive] = useState(null)
  const maxC = Math.max(...FUNIL.map(x=>x.count))

  const stageLds = active ? LEADS.filter(l=>{
    const slug = active.toLowerCase().replace("."," ").split(" ")[0]
    return l.etapa.toLowerCase().includes(slug)
  }) : []

  return (
    <div style={{padding:"24px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Funil Imobiliário</div>
      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:TX,marginBottom:22}}>12 etapas · 60 leads ativos</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:28}}>
        <div>
          {FUNIL.map((s,i)=>{
            const pct = Math.round((s.count/maxC)*100)
            const on = active===s.stage
            return (
              <div key={i} onClick={()=>setActive(on?null:s.stage)} style={{
                display:"flex",alignItems:"center",gap:12,cursor:"pointer",
                padding:"7px 10px",borderRadius:8,marginBottom:2,
                background: on ? "rgba(201,169,110,0.07)" : "transparent",
                border: on ? `1px solid ${BD}` : "1px solid transparent",
                transition:"all 0.14s"
              }}>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:on?G:TX2,width:110,flexShrink:0,letterSpacing:"0.04em"}}>{s.stage}</div>
                <div style={{flex:1,height:18,background:BG3,borderRadius:4,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:s.cor,borderRadius:4,opacity:0.65,transition:"width 0.3s"}}/>
                </div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:on?G:TX,width:20,textAlign:"right",flexShrink:0}}>{s.count}</div>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX3,width:52,flexShrink:0}}>
                  {i>0 ? `↓ ${Math.round(100-(s.count/FUNIL[0].count)*100)}%` : "entrada"}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stage summary */}
        <div>
          <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"20px 22px",marginBottom:14}}>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:14}}>Resumo do Funil</div>
            {[
              {l:"Total Leads",v:"60",c:TX},
              {l:"Leads Quentes",v:"4",c:"#E08060"},
              {l:"Visitas Agendadas",v:"4",c:G},
              {l:"Propostas Ativas",v:"2",c:"#60A0D0"},
              {l:"Vendas no Mês",v:"4",c:"#50C080"},
              {l:"Taxa de Conversão",v:"8,3%",c:"#50C080"},
            ].map((r,i)=>(
              <div key={i} style={{
                display:"flex",justifyContent:"space-between",
                padding:"8px 0",borderBottom: i<5 ? `1px solid ${BD}` : "none"
              }}>
                <span style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX2}}>{r.l}</span>
                <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:r.c}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{background:BG3,border:`1px solid ${BD}`,borderRadius:12,padding:"16px 22px"}}>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>Leads para Follow-up hoje</div>
            {LEADS.filter(l=>["morno","quente"].includes(l.temp)).slice(0,4).map(l=>(
              <div key={l.id} style={{
                display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"8px 0",borderBottom:`1px solid ${BD}`
              }}>
                <div>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontSize:12,color:TX}}>{l.nome}</div>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX2,marginTop:1}}>{l.bairro} · {l.valor}</div>
                </div>
                <a href={waLink(l.wa)} target="_blank" style={{
                  padding:"4px 10px",borderRadius:6,
                  background:"rgba(37,211,102,0.10)",border:"1px solid rgba(37,211,102,0.2)",
                  color:GRNt,fontFamily:"Montserrat,sans-serif",fontSize:10,textDecoration:"none"
                }}>✆</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards of active stage */}
      {active && (
        <div>
          <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>
            Leads em — <span style={{color:G}}>{active}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {stageLds.length > 0 ? stageLds.map(l=>{
              const tc = tempC(l.temp)
              return (
                <div key={l.id} style={{
                  background:BG3,border:`1px solid ${BD}`,borderRadius:10,padding:"16px 18px"
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <div>
                      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,color:TX}}>{l.nome}</div>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:G,marginTop:2}}>{l.valor}</div>
                    </div>
                    <div style={{
                      padding:"3px 7px",borderRadius:4,background:tc.bg,
                      fontFamily:"Montserrat,sans-serif",fontSize:9,color:tc.tx
                    }}>{l.temp}</div>
                  </div>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX2,marginBottom:10}}>
                    {l.bairro} · {l.tipo} · {l.dorms} dorms · {l.m2}
                  </div>
                  <a href={waLink(l.wa)} target="_blank" style={{
                    display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                    padding:"7px",borderRadius:7,
                    background:"rgba(37,211,102,0.09)",border:"1px solid rgba(37,211,102,0.2)",
                    color:GRNt,fontFamily:"Montserrat,sans-serif",fontSize:10,
                    textDecoration:"none",fontWeight:500
                  }}>✆ WhatsApp</a>
                </div>
              )
            }) : (
              <div style={{fontFamily:"Montserrat,sans-serif",fontSize:12,color:TX2,gridColumn:"1/-1",padding:"20px 0"}}>
                Clique em outra etapa para ver os leads correspondentes.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── EMPREENDIMENTOS ───────────────────────────────────────────────────────────
function Imoveis() {
  const [search,setSearch] = useState("")
  const items = IMOVEIS.filter(im=>
    !search || im.nome.toLowerCase().includes(search.toLowerCase()) || im.bairro.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div style={{padding:"24px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Portfólio de Empreendimentos</div>
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:22
      }}>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:TX}}>Cyrela · Living · Zona Sul SP</div>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Buscar empreendimento..."
          style={{
            background:BG3,border:`1px solid ${BD}`,borderRadius:8,
            padding:"7px 12px",color:TX,fontFamily:"Montserrat,sans-serif",
            fontSize:11,width:210,outline:"none"
          }}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:16}}>
        {items.map(im=>{
          const sc = statusC(im.status)
          return (
            <div key={im.id} style={{
              background:BG3,border:`1px solid ${BD}`,borderRadius:12,overflow:"hidden"
            }}>
              {/* Header */}
              <div style={{
                padding:"20px 22px 18px",
                borderBottom:`1px solid ${BD}`,
                position:"relative"
              }}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`${G}50`}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:20,color:TX,fontWeight:500,flex:1}}>{im.nome}</div>
                  <div style={{
                    padding:"3px 9px",borderRadius:4,flexShrink:0,marginLeft:10,marginTop:2,
                    background:sc.bg,border:`1px solid ${sc.br}`,
                    fontFamily:"Montserrat,sans-serif",fontSize:9,color:sc.tx,letterSpacing:"0.08em"
                  }}>{im.status}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX2,letterSpacing:"0.06em"}}>{im.bairro}</div>
                  <div style={{width:3,height:3,borderRadius:"50%",background:TX3}}/>
                  <div style={{
                    fontFamily:"Montserrat,sans-serif",fontSize:9,color:G,
                    padding:"2px 7px",borderRadius:3,
                    background:"rgba(201,169,110,0.09)",
                    letterSpacing:"0.06em"
                  }}>{im.const}</div>
                  <div style={{
                    fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX3,
                    marginLeft:"auto",letterSpacing:"0.04em"
                  }}>{im.leads} leads</div>
                </div>
              </div>

              <div style={{padding:"16px 22px 18px"}}>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:G,letterSpacing:"0.08em",fontWeight:500,marginBottom:12}}>{im.tier}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                  {[{l:"Valor",v:im.valor},{l:"Área",v:im.m2},{l:"Dorms",v:im.dorms}].map((f,j)=>(
                    <div key={j} style={{
                      padding:"8px 10px",background:BG2,borderRadius:6,border:`1px solid ${BD}`
                    }}>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:8,color:TX2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>{f.l}</div>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX,fontWeight:500,lineHeight:1.3}}>{f.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
                  {im.tags.map((t,j)=>(
                    <div key={j} style={{
                      padding:"3px 8px",borderRadius:4,
                      background:"rgba(201,169,110,0.06)",border:`1px solid ${BD}`,
                      fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,
                      letterSpacing:"0.04em"
                    }}>{t}</div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={{
                    flex:1,padding:"8px 12px",borderRadius:7,
                    background:"rgba(201,169,110,0.09)",border:`1px solid ${G}40`,
                    color:G,fontFamily:"Montserrat,sans-serif",fontSize:11,cursor:"pointer",
                    fontWeight:500,letterSpacing:"0.04em"
                  }}>Ver Detalhes</button>
                  <a href={waLink("11947933199",`Olá Bruno! Tenho interesse no ${im.nome} em ${im.bairro}.`)}
                    target="_blank" style={{
                    padding:"8px 14px",borderRadius:7,
                    background:"rgba(37,211,102,0.09)",border:"1px solid rgba(37,211,102,0.2)",
                    color:GRNt,fontFamily:"Montserrat,sans-serif",fontSize:11,
                    textDecoration:"none",fontWeight:500,display:"flex",alignItems:"center"
                  }}>✆</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── AUTOMAÇÕES ─────────────────────────────────────────────────────────────────
function Automacoes() {
  const [rules,setRules] = useState(AUTOMACOES)
  const toggle = id => setRules(r=>r.map(x=>x.id===id?{...x,ativa:!x.ativa}:x))

  const TC = {
    whatsapp:{bg:"rgba(37,211,102,0.10)",tx:"#35C070",ico:"✆"},
    alerta:{bg:"rgba(220,180,60,0.10)",tx:"#D0A040",ico:"⚡"},
    email:{bg:"rgba(80,140,230,0.10)",tx:"#5090D0",ico:"✉"},
    tag:{bg:"rgba(201,169,110,0.10)",tx:G,ico:"◈"},
  }

  const active = rules.filter(r=>r.ativa).length
  const total = rules.reduce((a,r)=>a+r.exec,0)

  return (
    <div style={{padding:"24px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
      <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>Sistema de Automação</div>
      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:TX,marginBottom:6}}>Fluxos Automáticos</div>
      <div style={{display:"flex",gap:20,marginBottom:26}}>
        {[
          {l:"Automações ativas",v:active,c:G},
          {l:"Total de execuções",v:total.toLocaleString("pt-BR"),c:"#50C080"},
          {l:"Em pausa",v:rules.length-active,c:TX2},
        ].map((k,i)=>(
          <div key={i} style={{
            background:BG3,border:`1px solid ${BD}`,borderRadius:9,
            padding:"14px 18px",minWidth:140
          }}>
            <div style={{fontFamily:"Montserrat,sans-serif",fontSize:9,color:TX2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{k.l}</div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,color:k.c}}>{k.v}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {rules.map(r=>{
          const t = TC[r.tipo]
          return (
            <div key={r.id} style={{
              background:BG3,border:`1px solid ${r.ativa?BD:"rgba(201,169,110,0.06)"}`,
              borderRadius:10,padding:"17px 20px",
              display:"flex",alignItems:"center",gap:14,
              opacity:r.ativa?1:0.5,transition:"opacity 0.2s"
            }}>
              <div style={{
                width:42,height:42,borderRadius:10,flexShrink:0,
                background:t.bg,border:`1px solid ${t.tx}25`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:18,color:t.tx
              }}>{t.ico}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontFamily:"Montserrat,sans-serif",fontSize:13,color:TX,fontWeight:500}}>{r.titulo}</span>
                  <span style={{
                    padding:"2px 7px",borderRadius:4,background:t.bg,
                    fontFamily:"Montserrat,sans-serif",fontSize:8,color:t.tx,
                    letterSpacing:"0.08em",textTransform:"uppercase"
                  }}>{r.tipo}</span>
                </div>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:11,color:TX2,marginBottom:4,lineHeight:1.4}}>{r.desc}</div>
                <div style={{fontFamily:"Montserrat,sans-serif",fontSize:10,color:TX3,letterSpacing:"0.04em"}}>
                  <span style={{color:G}}>Gatilho:</span> {r.trigger}
                  {r.exec>0 && <span style={{marginLeft:16}}>· {r.exec} execuções</span>}
                </div>
              </div>
              {/* Toggle */}
              <button onClick={()=>toggle(r.id)} style={{
                width:46,height:26,borderRadius:13,flexShrink:0,
                background:r.ativa?"rgba(201,169,110,0.13)":BG2,
                border:`1px solid ${r.ativa?G:BD}`,cursor:"pointer",
                position:"relative",transition:"all 0.2s"
              }}>
                <div style={{
                  position:"absolute",top:4,
                  left:r.ativa?24:4,
                  width:16,height:16,borderRadius:"50%",
                  background:r.ativa?G:TX3,transition:"left 0.2s"
                }}/>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── RELATÓRIOS ─────────────────────────────────────────────────────────────────
function Relatorios() {
  return (
    <div style={{padding:"40px 32px",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",boxSizing:"border-box"}}>
      <div style={{textAlign:"center",maxWidth:420}}>
        <div style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:48,color:G,marginBottom:14,opacity:0.4
        }}>◫</div>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,color:TX,marginBottom:8}}>Relatórios Avançados</div>
        <div style={{fontFamily:"Montserrat,sans-serif",fontSize:12,color:TX2,lineHeight:1.7}}>
          Módulo em desenvolvimento. Em breve: relatórios de performance por campanha, análise de ROI, comparativo de períodos e exportação em PDF.
        </div>
      </div>
    </div>
  )
}

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function CRM() {
  const [view,setView] = useState("dashboard")

  useEffect(()=>{
    const l = document.createElement("link")
    l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap"
    document.head.appendChild(l)
    return ()=>{ try{ document.head.removeChild(l) }catch(e){} }
  },[])

  return (
    <div style={{
      display:"flex",height:"100vh",
      background:BG,fontFamily:"Montserrat,sans-serif",
      color:TX,overflow:"hidden"
    }}>
      <Sidebar view={view} setView={setView}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <TopBar view={view}/>
        <div style={{flex:1,overflow:"hidden"}}>
          {view==="dashboard"  && <Dashboard/>}
          {view==="leads"      && <Leads/>}
          {view==="funil"      && <Funil/>}
          {view==="imoveis"    && <Imoveis/>}
          {view==="automacoes" && <Automacoes/>}
          {view==="relatorios" && <Relatorios/>}
        </div>
      </div>
    </div>
  )
}
