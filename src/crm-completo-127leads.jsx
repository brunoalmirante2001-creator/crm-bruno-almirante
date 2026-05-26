import { useState, useEffect, useCallback } from "react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

// ─── FONTS ────────────────────────────────────────────────────────────────────
function useFont() {
  useEffect(() => {
    const l = document.createElement("link")
    l.rel = "stylesheet"
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
    document.head.appendChild(l)
  }, [])
}

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const T = {
  bg:     "#080602",
  bg2:    "#100E07",
  bg3:    "#171309",
  card:   "#1C1710",
  card2:  "#221C0F",
  gold:   "#C89A3C",
  goldL:  "#E0BC72",
  goldD:  "#8A6420",
  goldBg: "rgba(200,154,60,0.10)",
  goldBd: "rgba(200,154,60,0.22)",
  goldBdH:"rgba(200,154,60,0.42)",
  white:  "#F8F0DC",
  white2: "#C8B888",
  tx2:    "#887858",
  tx3:    "#504030",
  bd:     "rgba(200,154,60,0.12)",
  bd2:    "rgba(200,154,60,0.22)",
  green:  "#4AB87A",
  greenBg:"rgba(74,184,122,0.12)",
  red:    "#D05040",
  redBg:  "rgba(208,80,64,0.10)",
  amber:  "#D4960A",
  amberBg:"rgba(212,150,10,0.10)",
  blue:   "#5090D0",
  blueBg: "rgba(80,144,208,0.10)",
  purple: "#A060D0",
  purpleBg:"rgba(160,96,208,0.10)",
  brunoCl: "#C89A3C",
  alanaCl: "#7ABCE0",
}
const SF = "'DM Sans', sans-serif"
const SS = "'Cormorant Garamond', Georgia, serif"

// ─── LEADS REAIS — importados da planilha LEADS 2026 ─────────────────────────
const LEADS_INIT = [
  {id:21,nome:"Claudio Ikeda",wa:"11 94197-7838",email:"claudeik@hotmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"Living Full",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: Living Full | Cliente já investido",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: Living Full | Cliente já investido"}],criadoEm:"2020-10-10 00:00:00"},
  {id:22,nome:"Thiago",wa:"11 94357-4800",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Indicação/Pirata",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote | Stand-By ir mantendo informado, mas não está buscando no momento",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Mediteraneé Mascote | Stand-By ir mantendo informado, mas não está buscando no momento"}],criadoEm:"2020-10-10 00:00:00"},
  {id:23,nome:"Otávio Tarrago",wa:"11 94371-9482",email:"",ig:"",regiao:"Saúde",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"LIVING UNIQUE SAÚDE",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: LIVING UNIQUE SAÚDE | Retornar em junho/2026 Mora no ipiranga em 100m² e está divorciando da mulher, quer ir pra um menos ou reformar o dele. | Retornar: Junho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: LIVING UNIQUE SAÚDE | Retornar em junho/2026 Mora no ipiranga em 100m² e está divorciando da mulher, quer ir pra um menos ou reformar "}],criadoEm:"2020-10-10 00:00:00"},
  {id:24,nome:"Reginaldo Sangiacomo",wa:"11 94724-1349",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"GRAND RESORT BY LIVING",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: GRAND RESORT BY LIVING | Ligar pos eleições | Retornar: Eleições",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: GRAND RESORT BY LIVING | Ligar pos eleições | Retornar: Eleições"}],criadoEm:"2020-10-10 00:00:00"},
  {id:25,nome:"Antonio",wa:"11 95779-1130",email:"",ig:"",regiao:"Vila Mariana",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"Vila Mariana",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Vila Mariana | Cliente Vila Mariana 27/03 tentei agendar e ele pediu para enviar o projeto no Wpp novamente, enviado the palace e Green Garden",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Vila Mariana | Cliente Vila Mariana 27/03 tentei agendar e ele pediu para enviar o projeto no Wpp novamente, enviado the palac"}],criadoEm:"2020-10-10 00:00:00"},
  {id:26,nome:"JAIR",wa:"11 95799-1929",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"retornar pós eleições para ver como vai estra o cenario | Retornar: Eleições",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. retornar pós eleições para ver como vai estra o cenario | Retornar: Eleições"}],criadoEm:"2020-10-10 00:00:00"},
  {id:27,nome:"Delcio",wa:"11 96252-0360",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"23/01 Ligar pós eleições, outubro | Retornar: Eleições",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. 23/01 Ligar pós eleições, outubro | Retornar: Eleições"}],criadoEm:"2020-10-10 00:00:00"},
  {id:28,nome:"Neuba Silva",wa:"11 96352-9547",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"GRAND RESORT BY LIVING",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: GRAND RESORT BY LIVING | Interesse em studios e pediu para ir mandando",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Comprou outro. Projeto: GRAND RESORT BY LIVING | Interesse em studios e pediu para ir mandando"}],criadoEm:"2020-10-10 00:00:00"},
  {id:29,nome:"Fernanda Faiwichow",wa:"11 96456-6556",email:"ffaiwichow@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"25/02 Está ainda, pediu para ligar amanha cedo, 31/03 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. 25/02 Está ainda, pediu para ligar amanha cedo, 31/03 não atendeu"}],criadoEm:"2020-10-10 00:00:00"},
  {id:30,nome:"Daniel Porshe",wa:"11 96868-7306",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Indicação/Pirata",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote | 23/01 vai invetir na empresa e volta olhar daqui 6 meses, ligarem Junho | Retornar: Junho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Mediteraneé Mascote | 23/01 vai invetir na empresa e volta olhar daqui 6 meses, ligarem Junho | Retornar: Junho"}],criadoEm:"2020-10-10 00:00:00"},
  {id:31,nome:"Ana Paula Baccaro Rodrigues",wa:"",email:"anabaccaro@hotmail.com",ig:"",regiao:"Anália Franco",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Analia Franco",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Analia Franco | 10/03/2026 pediu mais infos no wpp",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Comprou outro. Projeto: Analia Franco | 10/03/2026 pediu mais infos no wpp"}],criadoEm:"2020-10-10 00:00:00"},
  {id:32,nome:"Luca",wa:"11 97448-4506",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"20/03 disse que passou em frente e iria no prox. final de semana, 16/04 disse que investiu muito na empresa e vai voltar a olhar no segundo semestre | Retornar: Julho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. 20/03 disse que passou em frente e iria no prox. final de semana, 16/04 disse que investiu muito na empresa e vai voltar a olhar no segundo"}],criadoEm:"2020-10-10 00:00:00"},
  {id:33,nome:"Renato Kunichiro",wa:"11 97474-7069",email:"",ig:"",regiao:"Klabin",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"GRAND LIVING NOVA KLABIN",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: GRAND LIVING NOVA KLABIN | Sim está procurando, mas não podia falar na hr,31/03 não atendeu,22/04 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: GRAND LIVING NOVA KLABIN | Sim está procurando, mas não podia falar na hr,31/03 não atendeu,22/04 não atendeu"}],criadoEm:"2020-10-10 00:00:00"},
  {id:34,nome:"Wellington Bitencourt",wa:"11 97613-6405",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"LIVING MAGIC 1",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: LIVING MAGIC 1 | Interesse, na zona oeste para investimento, pode um apartamento com uns 2 dorms",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: LIVING MAGIC 1 | Interesse, na zona oeste para investimento, pode um apartamento com uns 2 dorms"}],criadoEm:"2020-10-10 00:00:00"},
  {id:35,nome:"Márcio Ferreira de Souza",wa:"11 97688-1913",email:"marcio.souza@beneficiosseguros.com.br",ig:"",regiao:"Anália Franco",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"ANALIA FRANCO",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: ANALIA FRANCO | Pediu para retornar no meio do ano, ligar em Julho | Retornar: Julho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: ANALIA FRANCO | Pediu para retornar no meio do ano, ligar em Julho | Retornar: Julho"}],criadoEm:"2020-10-10 00:00:00"},
  {id:36,nome:"Elis Calil",wa:"11 98047-8887",email:"ellyev@yahoo.com.br",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"23/01 está no RJ e pediu para retornar na Quinta-Feira 29/01",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. 23/01 está no RJ e pediu para retornar na Quinta-Feira 29/01"}],criadoEm:"2020-10-10 00:00:00"},
  {id:37,nome:"Alexandre",wa:"11 98759-0045",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Indicação/Pirata",campanha:"Mediteraneé Mascote",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: Mediteraneé Mascote | 10/03/2026 Visitou com Miguel, tem interesse nos studios, Em contato com a Lavinia",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: Mediteraneé Mascote | 10/03/2026 Visitou com Miguel, tem interesse nos studios, Em contato com a Lavinia"}],criadoEm:"2020-10-10 00:00:00"},
  {id:38,nome:"CESAR CHENA",wa:"11 98870-4348",email:"cesarchena@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"Mooca",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: Mooca | Investir até 500k, retornar em Junho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: Mooca | Investir até 500k, retornar em Junho"}],criadoEm:"2020-10-10 00:00:00"},
  {id:39,nome:"Cida Matos",wa:"11 98931-8333",email:"cidarochamatos@hotmail.com",ig:"",regiao:"Klabin",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"INFINITY NOVA KLABIN",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: INFINITY NOVA KLABIN | Tem interesse em algo na saúde, santa cruz, vila mariana, 31/03 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: INFINITY NOVA KLABIN | Tem interesse em algo na saúde, santa cruz, vila mariana, 31/03 não atendeu"}],criadoEm:"2020-10-10 00:00:00"},
  {id:40,nome:"Marcelo Luz",wa:"11 98992-0899",email:"",ig:"",regiao:"Tatuapé",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"LIVING VILLAGGIO TATUAPÉ - FIRENZE",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: LIVING VILLAGGIO TATUAPÉ - FIRENZE | Cliente tem varios, é adm de condominios",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: LIVING VILLAGGIO TATUAPÉ - FIRENZE | Cliente tem varios, é adm de condominios"}],criadoEm:"2020-10-10 00:00:00"},
  {id:41,nome:"Engenheiro Sandro",wa:"11 99146-8298",email:"engsandro1@gmail.com",ig:"",regiao:"Anália Franco",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"ANALIA FRANCO",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: ANALIA FRANCO | 10/03/2026 pediu para retornar em 6 meses 10/08/2026 | Retornar: Agosto",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: ANALIA FRANCO | 10/03/2026 pediu para retornar em 6 meses 10/08/2026 | Retornar: Agosto"}],criadoEm:"2020-10-10 00:00:00"},
  {id:42,nome:"Bruna Sá",wa:"11 99228-1126",email:"bruna.mssa@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. "}],criadoEm:"2020-10-10 00:00:00"},
  {id:43,nome:"Alex",wa:"11 99306-4198",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"23/01 Está com muita demanda no trabalho e pediu para retornar daqui 45dias, prefere lançamento pois ja fez aquisição boa assim, enviei nosso cronograma",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. 23/01 Está com muita demanda no trabalho e pediu para retornar daqui 45dias, prefere lançamento pois ja fez aquisição boa assim, enviei"}],criadoEm:"2020-10-10 00:00:00"},
  {id:44,nome:"Felipe Caetano",wa:"11 99530-0211",email:"felipeqcaetano@gmail.com",ig:"",regiao:"Anália Franco",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"ANALIA FRANCO",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: ANALIA FRANCO | entrar em contato em dezembro/2026 | Retornar: Dezembro",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: ANALIA FRANCO | entrar em contato em dezembro/2026 | Retornar: Dezembro"}],criadoEm:"2020-10-10 00:00:00"},
  {id:45,nome:"Philippe Moraes Guerra",wa:"11 99917-0396",email:"",ig:"",regiao:"Vila Mariana",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"THE EDITION BY LIVING VILA MARIANA",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: THE EDITION BY LIVING VILA MARIANA | Ligar em julho/2026 | Retornar: Julho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: THE EDITION BY LIVING VILA MARIANA | Ligar em julho/2026 | Retornar: Julho"}],criadoEm:"2020-10-10 00:00:00"},
  {id:46,nome:"Serra",wa:"11 99973-4189",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Indicação/Pirata",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote | ligar na sexta-feira no mesmo horario., 31/03 não atedeu enviado mensagem | Retornar: junho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Mediteraneé Mascote | ligar na sexta-feira no mesmo horario., 31/03 não atedeu enviado mensagem | Retornar: junho"}],criadoEm:"2020-10-10 00:00:00"},
  {id:47,nome:"Fernando Basile",wa:"14 99871-4397",email:"fernandobasilepiraju@hotmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Mudou para cidade Natal, tem interesse em fazer um investimento futuro aqui em SP",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Mudou para cidade Natal, tem interesse em fazer um investimento futuro aqui em SP"}],criadoEm:"2020-10-10 00:00:00"},
  {id:48,nome:"Amanda",wa:"16 98155-9283",email:"",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Está bem no inicio, ainda não visitou nenhum.",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Está bem no inicio, ainda não visitou nenhum."}],criadoEm:"2020-10-10 00:00:00"},
  {id:49,nome:"Matheus Menta",wa:"16 99176-0608",email:"",ig:"",regiao:"Moema",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"CYRELA FOR YOU MOEMA",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: CYRELA FOR YOU MOEMA | investidor, algo entre 60/70m²",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: CYRELA FOR YOU MOEMA | investidor, algo entre 60/70m²"}],criadoEm:"2020-10-10 00:00:00"},
  {id:50,nome:"Cesar",wa:"16 99245-7107",email:"cesarinvestidordointeriaos@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"Full Vila Nova Conceiçao",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: Full Vila Nova Conceiçao | 23/01 tem interesse nos projetos para investimento, excpliquei sobre o his e r2v e pediu para manter atualizado",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: Full Vila Nova Conceiçao | 23/01 tem interesse nos projetos para investimento, excpliquei sobre o his e r2v e pediu para manter at"}],criadoEm:"2020-10-10 00:00:00"},
  {id:51,nome:"Kaique",wa:"19 99419-0505",email:"kaiquecpenteado@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"mmv",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Sem Perfil. mmv"}],criadoEm:"2020-10-10 00:00:00"},
  {id:52,nome:"Lillian’ Machádo",wa:"41 99999-6690",email:"lilianaxt@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Full invetidora, mora em curitiba, e quer comprar algo aqui porque vem sempre e paga diarias de 600 reias, disse que me ama e é solteira",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Full invetidora, mora em curitiba, e quer comprar algo aqui porque vem sempre e paga diarias de 600 reias, disse que me ama e é solteira"}],criadoEm:"2020-10-10 00:00:00"},
  {id:53,nome:"Kênia Souza Martins",wa:"66 99985-7329",email:"keniaeanna@hotmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"05/03 Retornar dps das eleições | Retornar: Eleições",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. 05/03 Retornar dps das eleições | Retornar: Eleições"}],criadoEm:"2020-10-10 00:00:00"},
  {id:54,nome:"Anderson",wa:"11 97135-0199",email:"andersonsouza912@hotmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Chat/WhatsApp",campanha:"Living One",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Living One | 23/01 Depende da venda do dele, valor que pretende investir ate 2.600.000 com 3 suítes e 2 vagas na vila leopoldina, disse que estava vendo",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Living One | 23/01 Depende da venda do dele, valor que pretende investir ate 2.600.000 com 3 suítes e 2 vagas na vila leopoldina, d"}],criadoEm:"2020-10-10 00:00:00"},
  {id:55,nome:"Alessia Ruiz Gazaffi",wa:"11 99462-8008",email:"alessia.gazaffi@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"05/02 Ela esta vendendo a casa e pediu para retornar daqui 6 meses | Retornar: Agosto",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. 05/02 Ela esta vendendo a casa e pediu para retornar daqui 6 meses | Retornar: Agosto"}],criadoEm:"2020-10-10 00:00:00"},
  {id:56,nome:"Karin",wa:"11 97024-2494",email:"KARINSZURKALO@GMAIL.COM",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"Mooca",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mooca | Interesseem 68m², 31/03 disse que vai ver no fim do ano | Retornar: Outubro",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Mooca | Interesseem 68m², 31/03 disse que vai ver no fim do ano | Retornar: Outubro"}],criadoEm:"2020-10-10 00:00:00"},
  {id:57,nome:"REGINA MESQUITA",wa:"11 98375-9406",email:"REGINAMESQUITA1977@GMAIL.COM",ig:"",regiao:"Tatuapé",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"LIVING VILLAGGIO TATUAPÉ",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: LIVING VILLAGGIO TATUAPÉ | 03/02 mora em 70m² e tem interesse em algo maior, está na duvida se mais antigo ou novo, marava em casa a 11 anos atras e foi assaltada",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: LIVING VILLAGGIO TATUAPÉ | 03/02 mora em 70m² e tem interesse em algo maior, está na duvida se mais antigo ou novo, marava em casa "}],criadoEm:"2020-10-10 00:00:00"},
  {id:58,nome:"Dani Carlos",wa:"11 97977-0196",email:"dani.carllos@gmail.com",ig:"",regiao:"Belém",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"PACIFIC BELÉM",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: PACIFIC BELÉM | 23/01 Interesse na ZL, ligar daqui 3 meses 23/03/2026, 26/03 não atendeu | Retornar: Março",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: PACIFIC BELÉM | 23/01 Interesse na ZL, ligar daqui 3 meses 23/03/2026, 26/03 não atendeu | Retornar: Março"}],criadoEm:"2020-10-10 00:00:00"},
  {id:59,nome:"Camila Rodrigues Fernandes",wa:"11 99105-2950",email:"camilarodrigueslindoso@yahoo.com.br",ig:"",regiao:"Belém",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"PACIFIC BELÉM",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: PACIFIC BELÉM | 10/03/2026 cliente investidora, pediu para retornar no segundo semestre 10/07/2026",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: PACIFIC BELÉM | 10/03/2026 cliente investidora, pediu para retornar no segundo semestre 10/07/2026"}],criadoEm:"2020-10-10 00:00:00"},
  {id:60,nome:"MONICA GARCIA",wa:"11 99597-9877",email:"MONICA.GARCIA.PERNA@GMAIL.COM",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | trabalham com tinta, familia humilde c interesse em 140m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Mediterranée Vila Mascote | trabalham com tinta, familia humilde c interesse em 140m²"}],criadoEm:"2025-12-12 00:00:00"},
  {id:61,nome:"DANIEL SANTOS",wa:"11 99241-6420",email:"DAS_ALVES@YAHOO.COM.BR",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"MEDITERRANÉE VILA MASCOTE BY LIVING",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Mas para seu momento atual de vida não faz sentido.",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Mas para seu momento atual de vida não faz sentido."}],criadoEm:"2025-12-12 00:00:00"},
  {id:62,nome:"CAROLINA BANFIELD",wa:"11 99901-2686",email:"CAROL2BANFIELD@GMAIL.COM",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"MEDITERRANÉE VILA MASCOTE BY LIVING",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING"}],criadoEm:"2025-12-12 00:00:00"},
  {id:63,nome:"SONIA GABRIEL",wa:"11 99426-9797",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"MEDITERRANÉE VILA MASCOTE BY LIVING",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Mora em uma casa, estava querendo comprar p filha, mas sem renda.",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Mora em uma casa, estava querendo comprar p filha, mas sem renda."}],criadoEm:"2025-12-12 00:00:00"},
  {id:64,nome:"Pabllo Adelino Estevam",wa:"11 97545-3504",email:"pablloestevam@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 31/03 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | 31/03 não atendeu"}],criadoEm:"2026-01-16 00:00:00"},
  {id:65,nome:"Thiago Gattini",wa:"11 94796-3159",email:"thiago.gattini@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 31/03 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | 31/03 não atendeu"}],criadoEm:"2026-01-22 00:00:00"},
  {id:66,nome:"Dan Fergon",wa:"11 98891-0041",email:"dr.dfg.adv@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 31/03 não atendeu",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | 31/03 não atendeu"}],criadoEm:"2026-01-23 00:00:00"},
  {id:67,nome:"Aline",wa:"11 99006-1159",email:"alinemoraes10@hotmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | procura até 600mil",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Sem Perfil. Projeto: Mediterranée Vila Mascote | procura até 600mil"}],criadoEm:"2026-01-25 00:00:00"},
  {id:68,nome:"Aísha",wa:"11 95975-1111",email:"ash.barbosa@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | Visitou e comrpou Villaggio Duplex com a parceria",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Duett Mooca 126m² | Visitou e comrpou Villaggio Duplex com a parceria"}],criadoEm:"2026-01-28 00:00:00"},
  {id:69,nome:"Bia",wa:"11 95421-1380",email:"bia-biomed@bol.com.br",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 28/03 enviado HB CAMPO BELO",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | 28/03 enviado HB CAMPO BELO"}],criadoEm:"2026-01-30 00:00:00"},
  {id:70,nome:"Débora",wa:"11 94579-6363",email:"debbyfly@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Duett Mooca 126m² | 20/03 procura até 1M - visitando_imóveis_com_interesse renda +38mil",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Nenhum projeto. Projeto: Duett Mooca 126m² | 20/03 procura até 1M - visitando_imóveis_com_interesse renda +38mil"}],criadoEm:"2026-01-31 00:00:00"},
  {id:71,nome:"Kelly Cristina",wa:"11 99332-3617",email:"kellycrinac@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: . Projeto: Mediterranée Vila Mascote"}],criadoEm:"2026-02-01 00:00:00"},
  {id:72,nome:"Lucas Viana",wa:"11 98898-2717",email:"blitzlvm@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | pronto(a)_para_fazer_proposta renda até 27mil interesse em andar alto até 1.3M/ 22/04 enviado mensagem se interessou no ARQ",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Duett Mooca 126m² | pronto(a)_para_fazer_proposta renda até 27mil interesse em andar alto até 1.3M/ 22/04 enviado mensagem se "}],criadoEm:"2026-02-04 00:00:00"},
  {id:73,nome:"Maria Rosilene Farias Aquino",wa:"11 93225-7763",email:"Mariarosiaquino76@gmail.com",ig:"",regiao:"São Paulo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"05/02 Ainda está prucurando!",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Sem Perfil. 05/02 Ainda está prucurando!"}],criadoEm:"2026-02-05 00:00:00"},
  {id:74,nome:"Peng Zheng",wa:"11 94161-2254",email:"",ig:"",regiao:"Tatuapé",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Carteira",campanha:"Nativ Tatuape Garden Club",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Nativ Tatuape Garden Club | Ligar em Janeiro 2027 | Retornar: 2027-01-01 00:00:00",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Nativ Tatuape Garden Club | Ligar em Janeiro 2027 | Retornar: 2027-01-01 00:00:00"}],criadoEm:"2026-02-05 00:00:00"},
  {id:75,nome:"Rosa Bossa",wa:"11 99615-7156",email:"csantaclara@csantaclara.com.br",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | 13/03 precisa vendar imovel perto do juventus - apenas_olhando renda até 27mil",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Duett Mooca 126m² | 13/03 precisa vendar imovel perto do juventus - apenas_olhando renda até 27mil"}],criadoEm:"2026-02-08 00:00:00"},
  {id:76,nome:"Marcelo",wa:"11 98175-5447",email:"marceloyamano@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | nenhum produto atende. Mora prox. ao parque da Aclimação, disse que o nooso não é aclimação",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Nenhum projeto. Projeto: Wellnness Aclimação 110m² | nenhum produto atende. Mora prox. ao parque da Aclimação, disse que o nooso não é aclimação"}],criadoEm:"2026-02-15 00:00:00"},
  {id:77,nome:"Rafael Ferracioli",wa:"11 98901-4700",email:"rafaelferracioli@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 20/03 liguei e estava em reunião pediu para chamar no zap. Cliente mora na Vila Clementino em um imovel antigo com 100m² 2 vagas e condominio de 2.200 sem muita area de lazer, procura na planta ou pro",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Wellnness Aclimação 110m² | 20/03 liguei e estava em reunião pediu para chamar no zap. Cliente mora na Vila Clementino em um imovel"}],criadoEm:"2026-02-19 00:00:00"},
  {id:78,nome:"Lilian",wa:"11 99272-3337",email:"lili_grega@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda até 35mil 27/03 nunca atende e parou de responder",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda até 35mil 27/03 nunca atende e parou de responder"}],criadoEm:"2026-03-01 00:00:00"},
  {id:79,nome:"Vanessa",wa:"11 99484-6996",email:"dravanessafelix@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | Visitou e não responde mais",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Duett Mooca 126m² | Visitou e não responde mais"}],criadoEm:"2026-03-01 00:00:00"},
  {id:80,nome:"Gustavo Bonfim",wa:"11 99162-3169",email:"gustavoebonfim@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 24/03 Já conhece, seu cunhado que mora fora do Brasil quase comprou mas acabou desistindo. 22/04 mora perto e disse que seu cunhado vai querer visitar no final do ano. | Retornar: Outubro",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Wellnness Aclimação 110m² | 24/03 Já conhece, seu cunhado que mora fora do Brasil quase comprou mas acabou desistindo. 22/04 mora pert"}],criadoEm:"2026-03-04 00:00:00"},
  {id:81,nome:"Fernanda",wa:"21 98141-4090",email:"fealbano@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda até 35mil",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: . Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda até 35mil"}],criadoEm:"2026-03-04 00:00:00"},
  {id:82,nome:"Ernaldo",wa:"11 99105-3028",email:"ernaldosantini@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | Está falando com varios corretores, já visitou o Wellnnes e não gostou da planta, quer algo com entrada de serviço até 1.600.000",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Nenhum projeto. Projeto: Wellnness Aclimação 110m² | Está falando com varios corretores, já visitou o Wellnnes e não gostou da planta, quer algo com en"}],criadoEm:"2026-03-05 00:00:00"},
  {id:83,nome:"Micki",wa:"11 94729-0304",email:"micki.1908@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda +38mil",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Duett Mooca 126m² | visitando_imóveis_com_interesse renda +38mil"}],criadoEm:"2026-03-05 00:00:00"},
  {id:84,nome:"Sergio",wa:"11 97574-3231",email:"sergio.a.caseiro@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 12/03 Está viajando, ligar na quinta-feira para alinhar visita no final de semana 26/03 não atendeu, 10/04 disse que está com uma obra no Litoral, e quando puder vai me avisar,24/04 gastou tudo na obr",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Comprou outro. Projeto: Wellnness Aclimação 110m² | 12/03 Está viajando, ligar na quinta-feira para alinhar visita no final de semana 26/03 não atendeu"}],criadoEm:"2026-03-09 00:00:00"},
  {id:85,nome:"Bruna Valeri",wa:"11 99290-6365",email:"valeri.bruna@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 15/04 agendou visita para sabado",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Wellnness Aclimação 110m² | 15/04 agendou visita para sabado"}],criadoEm:"2026-03-12 00:00:00"},
  {id:86,nome:"Ogier Santana",wa:"11 99286-2966",email:"santana@celacantoanalises.com.br",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-03-20 00:00:00"},
  {id:87,nome:"Roberta Folgueral",wa:"11 99660-6110",email:"roberta.folgueral@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Investidor",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:true,obs:"Projeto: Wellnness Aclimação 110m² | 22/03 disse que vai avaliar e me retorna.",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Investidor. Projeto: Wellnness Aclimação 110m² | 22/03 disse que vai avaliar e me retorna."}],criadoEm:"2026-03-22 00:00:00"},
  {id:88,nome:"Waldir",wa:"14 98161-5660",email:"Waldir@wfonline.com.br",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 23/03 está viajando de ferias e tem interesse em visitar para conhecer empreendimentos de 110 a 130m² na planta de preferência 27/03 visita agendada para conhecer na Vila Mascote",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Wellnness Aclimação 110m² | 23/03 está viajando de ferias e tem interesse em visitar para conhecer empreendimentos de 110 a 130m² na "}],criadoEm:"2026-03-22 00:00:00"},
  {id:89,nome:"Alessandro",wa:"11 96154-9476",email:"alessandroassisleleco@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | precisa vender o seu primeiro 85m² 1m | Retornar: JULHO",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Duett Mooca 126m² | precisa vender o seu primeiro 85m² 1m | Retornar: JULHO"}],criadoEm:"2026-03-23 00:00:00"},
  {id:90,nome:"Eduardo Nasa",wa:"11 99695-5095",email:"eduadooferta@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Oferta",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 27/03 liguei ele começou a gaguejar que estava trabalhando, 10/04 ofertei Eldorado ele não se interessou muito, já Full Moema Nr sim",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Mediterranée Vila Mascote | 27/03 liguei ele começou a gaguejar que estava trabalhando, 10/04 ofertei Eldorado ele não se inte"}],criadoEm:"2026-03-24 00:00:00"},
  {id:91,nome:"Cassia Oferta",wa:"11 98929-6023",email:"cassiaoferta@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Oferta",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote"}],criadoEm:"2026-03-24 00:00:00"},
  {id:92,nome:"Edvaldo Oferta",wa:"11 99237-2270",email:"edvaldooferta@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Oferta",campanha:"Mediterranée Vila Mascote",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | Retornar: Julho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Mediterranée Vila Mascote | Retornar: Julho"}],criadoEm:"2026-03-24 00:00:00"},
  {id:93,nome:"Ana Manu",wa:"11 94813-8058",email:"am.sn@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Perdido",assignedTo:"Bruno",descartado:true,investimento:false,obs:"Projeto: Duett Mooca 126m² | 24/03 disse que já comprou",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Comprou outro. Projeto: Duett Mooca 126m² | 24/03 disse que já comprou"}],criadoEm:"2026-03-24 00:00:00"},
  {id:94,nome:"Talita",wa:"11 98730-0617",email:"talitaraqueldepaulo@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | 26/03  tem preferência na planta, enviei opções e ela não atendeu mais./ 2703 não atende e não responde",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Duett Mooca 126m² | 26/03  tem preferência na planta, enviei opções e ela não atendeu mais./ 2703 não atende e não responde"}],criadoEm:"2026-03-24 00:00:00"},
  {id:95,nome:"Neto CppNeto",wa:"11 97414-8010",email:"cppneto@uol.com.br",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | 26/03 disse pra falar so por whats",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Wellnness Aclimação 110m² | 26/03 disse pra falar so por whats"}],criadoEm:"2026-03-25 00:00:00"},
  {id:96,nome:"Fabio",wa:"11 98151-0400",email:"oferta3c@gmail.com",ig:"",regiao:"Campo Belo",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Oferta",campanha:"HB Campo Belo",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: HB Campo Belo | 02/04 Enviado apresentação, não podia falar mas está procurando, 22/04 mora no brooklin tem interesse p/moradia nessa região e parainvestimento algo no max 40m² perto de metrô",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: HB Campo Belo | 02/04 Enviado apresentação, não podia falar mas está procurando, 22/04 mora no brooklin tem interesse p/moradia nes"}],criadoEm:"2026-04-02 00:00:00"},
  {id:97,nome:"EDIJANE",wa:"11 94777-6093",email:"MUNDOREALPRESENTES@GMAIL.COM",ig:"",regiao:"Freguesia do Ó",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Chat/WhatsApp",campanha:"LIVING GRAND VILLAGE FREGUESIA DO Ó",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: LIVING GRAND VILLAGE FREGUESIA DO Ó | 02/04 Vai confirmar agendamento para sexta ou sabado.",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: LIVING GRAND VILLAGE FREGUESIA DO Ó | 02/04 Vai confirmar agendamento para sexta ou sabado."}],criadoEm:"2026-04-02 00:00:00"},
  {id:98,nome:"DACIO DAMIANI",wa:"11 98326-5009",email:"NEWCARESP@GMAIL.COM",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Chat/WhatsApp",campanha:"LIVING DUETT MOOCA",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: LIVING DUETT MOOCA | 02/04 Disse para retornar ele na semana que vem que a gente marca, lembrou de mim naepoca do Duett..16/04 passei pro Telo",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: LIVING DUETT MOOCA | 02/04 Disse para retornar ele na semana que vem que a gente marca, lembrou de mim naepoca do Duett..16/04"}],criadoEm:"2026-04-02 00:00:00"},
  {id:99,nome:"Elizabeth",wa:"11 99472-4517",email:"elizabeth.calegari@outlook.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m² | interesse em torre unica, algo mais excluisivo.",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Wellnness Aclimação 110m² | interesse em torre unica, algo mais excluisivo."}],criadoEm:"2026-04-06 00:00:00"},
  {id:100,nome:"Piero",wa:"14 99773-7227",email:"piero@servitecnet.com.br",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m² | 250k entrada, visitando e renda +65mil, Mooca e Tatuapé 24/04 disse que investiu em outro | Retornar: dezembro",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Duett Mooca 126m² | 250k entrada, visitando e renda +65mil, Mooca e Tatuapé 24/04 disse que investiu em outro | Retornar: dezembro"}],criadoEm:"2026-04-08 12:07:00"},
  {id:101,nome:"Alexandra Takeda",wa:"11 98352-7374",email:"ahtakeda@gmail.com",ig:"",regiao:"Saúde",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Unique Saúde",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Unique Saúde | 14/04 DEU UMA PAUSA NA PESQUISA MAS PEDIU PARA MANTER INFORMADA | Retornar: JULHO",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Unique Saúde | 14/04 DEU UMA PAUSA NA PESQUISA MAS PEDIU PARA MANTER INFORMADA | Retornar: JULHO"}],criadoEm:"2026-04-14 00:00:00"},
  {id:102,nome:"Gilmar Oliveira",wa:"11 94954-2325",email:"gilmaroliveira354@gmail.com",ig:"",regiao:"Freguesia do Ó",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Freguesia Do Ó",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Freguesia Do Ó | TEM INTERESSE E PEDI APRESENTAÇÃO PARA MARCAR VISITA",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Freguesia Do Ó | TEM INTERESSE E PEDI APRESENTAÇÃO PARA MARCAR VISITA"}],criadoEm:"2026-04-14 00:00:00"},
  {id:103,nome:"Mindo Carvalho",wa:"11 99767-2088",email:"ademildo.jc@hotmail.com",ig:"",regiao:"Freguesia do Ó",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Freguesia Do Ó",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Freguesia Do Ó | TEM INTERESSE EM 3DORMS, MORA LA A ANOS",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Freguesia Do Ó | TEM INTERESSE EM 3DORMS, MORA LA A ANOS"}],criadoEm:"2026-04-14 00:00:00"},
  {id:104,nome:"Gabriel Beverari",wa:"11 99966-9929",email:"gabriel_beverari@hotmail.com",ig:"",regiao:"Freguesia do Ó",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Freguesia Do Ó",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Freguesia Do Ó | PEDIU PARA LIGAR DPS DO ALMOÇO",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Freguesia Do Ó | PEDIU PARA LIGAR DPS DO ALMOÇO"}],criadoEm:"2026-04-15 00:00:00"},
  {id:105,nome:"Ricardo Belo Garcia",wa:"11 99802-5763",email:"ricardobelogarcia@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca",temp:"Frio",etapa:"Novo Lead",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Duett Mooca | Tem interesse em 2 dorms, enviar apresentação",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Sem Perfil. Projeto: Duett Mooca | Tem interesse em 2 dorms, enviar apresentação"}],criadoEm:"2026-04-15 00:00:00"},
  {id:106,nome:"christina s.p.",wa:"11 95950-2201",email:"christinabex@hotmail.com",ig:"",regiao:"Saúde",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Unique Saúde",temp:"Frio",etapa:"Primeiro Contato",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Unique Saúde | 15/04 pediu para retornar em julho | Retornar: Julho",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Futuro. Projeto: Unique Saúde | 15/04 pediu para retornar em julho | Retornar: Julho"}],criadoEm:"2026-04-15 00:00:00"},
  {id:107,nome:"Ale E Carla",wa:"11 99475-2985",email:"caslombardi@hotmail.com",ig:"",regiao:"Freguesia do Ó",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Freguesia Do Ó",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Freguesia Do Ó | 15/04 está em um treinamento e pediu para retornar semana que vem, parece ser para investimento. | Retornar: agendar",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Freguesia Do Ó | 15/04 está em um treinamento e pediu para retornar semana que vem, parece ser para investimento. | Retornar: agend"}],criadoEm:"2026-04-15 00:00:00"},
  {id:108,nome:"William",wa:"11 98196-9009",email:"williamrecantodamascote@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PDV",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Mediterranée Vila Mascote"}],criadoEm:"2026-05-01 00:00:00"},
  {id:109,nome:"CAROL BUENO",wa:"11 96580-8749",email:"CAROLBUENOLOFT@GMAIL.COM",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | visitou com namorado e tem interesse em 89m² para ele e 140m² para ele, ele acabou de pagar o finan dele no de osasco",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: Mediterranée Vila Mascote | visitou com namorado e tem interesse em 89m² para ele e 140m² para ele, ele acabou de pagar o finan dele "}],criadoEm:"2026-05-01 00:00:00"},
  {id:110,nome:"José Eduardo",wa:"41 99131-4702",email:"",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"MEDITERRANÉE VILA MASCOTE BY LIVING",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Fez ficha para comprar 3 unidades",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Fez ficha para comprar 3 unidades"}],criadoEm:"2026-05-01 00:00:00"},
  {id:111,nome:"MONICA BARATA",wa:"11 98776-5415",email:"MNC.VAZ@GMAIL.COM",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Stand",campanha:"MEDITERRANÉE VILA MASCOTE BY LIVING",temp:"Morno",etapa:"Negociação",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Dr.a, disse que vai esperar vendr o dela primeiro, tem renda mas sem entrada",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Visitou. Projeto: MEDITERRANÉE VILA MASCOTE BY LIVING | Dr.a, disse que vai esperar vendr o dela primeiro, tem renda mas sem entrada"}],criadoEm:"2026-05-01 00:00:00"},
  {id:112,nome:"Ellen Mesquíta",wa:"11 93150-6047",email:"chsat@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 21/05 enviado mesnagem. 00 intereesse em 89m² enviado valores, feito follow up chacara santo antoniio",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | 21/05 enviado mesnagem. 00 intereesse em 89m² enviado valores, feito follow up chacara santo antoniio"}],criadoEm:"2026-05-01 00:00:00"},
  {id:113,nome:"Karen Oliveira",wa:"11 97733-2236",email:"karenoliveira02@hotmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PDV",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | teve uma experiencia ruim com imovel na planta mas tem interesse no mediterrrane",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Mediterranée Vila Mascote | teve uma experiencia ruim com imovel na planta mas tem interesse no mediterrrane"}],criadoEm:"2026-05-06 00:00:00"},
  {id:114,nome:"Valmira",wa:"11 98087-5867",email:"valmira@gmail.com",ig:"",regiao:"Vila Mariana",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"PAP",campanha:"The Palace Vila Mariana",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: The Palace Vila Mariana",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: The Palace Vila Mariana"}],criadoEm:"2026-12-15 00:00:00"},
  {id:115,nome:"Gustavo",wa:"11 99202-1115",email:"gustavotdias@hotmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | Tem interesse em aglo até 1.2m",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Wellness Chácara Santo Antônio | Tem interesse em aglo até 1.2m"}],criadoEm:"2026-05-09T10:19:28-03:00"},
  {id:116,nome:"Claudia",wa:"11 99933-3428",email:"claudia.longo@uol.com.br",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | cliente que prox ao metro com quadra tenis saibro, não grama",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Wellness Chácara Santo Antônio | cliente que prox ao metro com quadra tenis saibro, não grama"}],criadoEm:"2026-05-10T14:31:52-03:00"},
  {id:117,nome:"Isabela Ribeiro",wa:"21 99945-4896",email:"isabelaribeirofrederico@gmail.com",ig:"",regiao:"Brooklin",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Brooklin",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Brooklin | 21/05 oferecendo chicago | Retornar: comecei_a_pesquisar_agora",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Brooklin | 21/05 oferecendo chicago | Retornar: comecei_a_pesquisar_agora"}],criadoEm:"2026-05-14T08:44:26-03:00"},
  {id:118,nome:"Carina Tcheon",wa:"11 97088-5032",email:"carinawft@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediterranée Vila Mascote",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Mediterranée Vila Mascote | 21/05 convite de fechamento vl mascote | Retornar: visitando_imóveis_com_interesse",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Mediterranée Vila Mascote | 21/05 convite de fechamento vl mascote | Retornar: visitando_imóveis_com_interesse"}],criadoEm:"2026-05-14T20:16:41-03:00"},
  {id:119,nome:"Felipe",wa:"11 93940-6336",email:"felipe.delpinoalves@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | 21/05 Enviado mensagem.  00 Ele só perguntou os valores",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Wellness Chácara Santo Antônio | 21/05 Enviado mensagem.  00 Ele só perguntou os valores"}],criadoEm:"2026-05-16T10:04:09-03:00"},
  {id:120,nome:"Netto",wa:"12 99666-9132",email:"oliveirasbeauty@gmail.com",ig:"",regiao:"Brooklin",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Brooklin",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Brooklin | 21/05 Enviado mensagem. 00 trabalha na berrine e quer morar mais perto, tem interesse no Brooklin 76m²",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Brooklin | 21/05 Enviado mensagem. 00 trabalha na berrine e quer morar mais perto, tem interesse no Brooklin 76m²"}],criadoEm:"2026-05-17T12:29:14-03:00"},
  {id:121,nome:"Dr Danilo",wa:"11 98627-0024",email:"doutor.odonto.danilo@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | 21/05 enviado mensagem.  00 Já conhece a região, paralela a Alexandre Dumas, perguntou quanto tempo já abriu",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Wellness Chácara Santo Antônio | 21/05 enviado mensagem.  00 Já conhece a região, paralela a Alexandre Dumas, perguntou quanto"}],criadoEm:"2026-05-17T16:26:42-03:00"},
  {id:122,nome:"Livia",wa:"11 98278-7002",email:"livia.silva@alumni.usp.br",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | 21/05 enviado mensagem.  00 Perguntou sobre os valores e condiçoes",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Agendar Visita. Projeto: Wellness Chácara Santo Antônio | 21/05 enviado mensagem.  00 Perguntou sobre os valores e condiçoes"}],criadoEm:"2026-05-18T05:32:04-03:00"},
  {id:123,nome:"Camila",wa:"11 98434-8096",email:"camy.hll@uol.com.br",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Em Atendimento",assignedTo:"Bruno",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio | 21/05 oferecendo chicago.  00 Conhece a região.",proximo:"hoje",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Bruno. Fase original: Follow-Up. Projeto: Wellness Chácara Santo Antônio | 21/05 oferecendo chicago.  00 Conhece a região."}],criadoEm:"2026-05-19T08:31:39-03:00"},
  {id:124,nome:"Maria Nadir Castro",wa:"11 99639-3772",email:"mandecastro@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: pronto(a)_para_fazer_proposta 89m². Projeto: Mediteraneé Mascote"}],criadoEm:"2026-01-16 00:00:00"},
  {id:125,nome:"Ruggiero Di Giamo",wa:"11 99121-0543",email:"ruggierodigiaimo@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: VISITANDO_IMOVEIS_COM_INTERESSE 89m². Projeto: Mediteraneé Mascote"}],criadoEm:"2026-01-18 00:00:00"},
  {id:126,nome:"Camila Silviano",wa:"11 99877-9139",email:"camilla.silviano@gmail.com",ig:"",regiao:"Vila Mascote",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Mediteraneé Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Mediteraneé Mascote",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: VISITANDO_IMOVEIS_COM_INTERESSE 89m². Projeto: Mediteraneé Mascote"}],criadoEm:"2026-01-21 00:00:00"},
  {id:127,nome:"Robson Pedrosa",wa:"11 99430-1834",email:"robspedrosa@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Perdido",assignedTo:"Alana",descartado:true,investimento:false,obs:"Projeto: Wellnness Aclimação 110m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Já comprou usado. Projeto: Wellnness Aclimação 110m²"}],criadoEm:"2026-02-25 00:00:00"},
  {id:128,nome:"Cléo Cavalcante",wa:"11 94673-2256",email:"cleo.cavalcante67@gmail.com",ig:"",regiao:"Aclimação",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellnness Aclimação 110m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellnness Aclimação 110m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: 25/03 me envio mensagem falando que gostou da planta para chamar ela amanhã 10/04 Nunca mais atendeu. Projeto: Wellnness Aclimação 110m²"}],criadoEm:"2026-03-25 00:00:00"},
  {id:129,nome:"Ls Soares",wa:"11 95391-2963",email:"Kerem57714@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"C. Santo Antônio",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: C. Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: . Projeto: C. Santo Antônio"}],criadoEm:"2026-02-06 00:00:00"},
  {id:130,nome:"Bruno",wa:"12 98123-5746",email:"brunohts86@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Pacific. Projeto: Duett Mooca 126m²"}],criadoEm:"2025-12-31 00:00:00"},
  {id:131,nome:"Nathaly",wa:"11 99835-8571",email:"nathaly.araujod@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Toda Quarta. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-02-02 00:00:00"},
  {id:132,nome:"Daniel",wa:"11 99613-9956",email:"Danieldoms@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Interesse em 120 á 150 m2 com 3 vagas. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-02-03 00:00:00"},
  {id:133,nome:"Vanderlei",wa:"11 94707-5415",email:"vanderleilopoesmooca@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Perdido",assignedTo:"Alana",descartado:true,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Comprou Brunello e vai me indicar um amig. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-02-09 00:00:00"},
  {id:134,nome:"Fadel",wa:"11 98747-7771",email:"fadel.alphasom@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Interesse em andar alto, torre unica, ofertado Arq, mas não quer andar baixo, ofertado HB Campo ele e HB Ipiranga não respondeu, Duett móoca não gostou"}],criadoEm:"2026-02-20 00:00:00"},
  {id:135,nome:"Suely Guandalini",wa:"11 97166-6766",email:"suelygrocabado@hotmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Vai falar com marido para agendar visita, mora perto do Arq móoca, tem interesse em 3 dorms, Duett também é uma opção.. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-02-22 00:00:00"},
  {id:136,nome:"Adriana",wa:"11 98888-1808",email:"adrianaramuno46@gmail.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: procura pro irmão.. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-03-05 00:00:00"},
  {id:137,nome:"Adriana",wa:"11 99844-1320",email:"adrianastos@uol.com.br",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"amanhã",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Ligar 19/03 para agendar. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-03-08 00:00:00"},
  {id:138,nome:"Rafael Inigo",wa:"11 99848-5114",email:"diretoria@Hafare.com",ig:"",regiao:"Mooca",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Duett Mooca 126m²",temp:"Morno",etapa:"Negociação",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Duett Mooca 126m²",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Visitou o Duett Mooca 24/03. Projeto: Duett Mooca 126m²"}],criadoEm:"2026-03-17 00:00:00"},
  {id:139,nome:"Claudia Adas",wa:"11 99654-4005",email:"claudiaadas@yahoo.com.br",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: corretora com interesse. Projeto: Wellness Chácara Santo Antônio"}],criadoEm:"2026-05-09T12:34:16-03:00"},
  {id:140,nome:"Jana",wa:"11 98231-4651",email:"janamingroni@hotmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Mora em casa, tem, um predio da eztec na frente e estão iniciando as buscas por aptos, vai tentar passar no Sábado. Projeto: Wellness Chácara Santo Ant"}],criadoEm:"2026-05-09T13:59:38-03:00"},
  {id:141,nome:"Lucia Maria",wa:"11 98777-3047",email:"luciaocchialini@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Não gosta que liga, enviar pelo whats. Projeto: Wellness Chácara Santo Antônio"}],criadoEm:"2026-05-10T00:00:56-03:00"},
  {id:142,nome:"Nanda Bastos",wa:"11 99662-1313",email:"nandafb.fb@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Morno",etapa:"Visita Agendada",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Agendou visita e não veio por não gostar da quadra de Tenis. Projeto: Wellness Chácara Santo Antônio"}],criadoEm:"2026-05-12T16:47:32-03:00"},
  {id:143,nome:"Cristo",wa:"11 98412-7586",email:"izaiascristo957@gmail.com",ig:"",regiao:"Chácara S.A.",valor:"",tipo:"Apartamento",dorms:"",m2:"",origem:"Mídias Próprias",campanha:"Wellness Chácara Santo Antônio",temp:"Frio",etapa:"Novo Lead",assignedTo:"Alana",descartado:false,investimento:false,obs:"Projeto: Wellness Chácara Santo Antônio",proximo:"",ultimoContato:"",historico:[{data:"planilha",tipo:"entrada",txt:"Lead importado da planilha Alana. Fase original: Enviado convite de lançamento. Projeto: Wellness Chácara Santo Antônio"}],criadoEm:"2026-05-13T02:13:47-03:00"},
]
    criadoEm:"2026-05-24T15:56:44-03:00",
  },
  {
    id:2,
    nome:"Gustavo",
    wa:"11 99846-7649",
    email:"bcmaioli@gmail.com",
    ig:"",
    regiao:"Brooklin",
    valor:"R$ 2M – 3M",
    tipo:"Apartamento",
    dorms:"—",
    m2:"180m²",
    origem:"Facebook Ads",
    campanha:"Sense Brooklin 145m² e 178m²",
    publico:"PUB - ABERTO",
    renda:"R$ 2M – 3M (investimento)",
    momento:"Apenas pesquisando",
    temp:"Frio",
    etapa:"Novo Lead",
    assignedTo:null,
    descartado:false,
    investimento:false,
    obs:"Apenas pesquisando. Interesse em 180m² no Brooklin. Campanha Sense Brooklin 145m² e 178m². Sem contato realizado.",
    proximo:"amanhã",
    ultimoContato:"",
    historico:[
      {data:"24/05 08:57",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Sense Brooklin 145m² e 178m² · Público: PUB-ABERTO · Interesse: 180m² · Renda/invest.: R$2M–3M · Momento: Apenas pesquisando."},
    ],
    criadoEm:"2026-05-24T08:57:01-03:00",
  },
  {
    id:3,
    nome:"Bruno Maioli",
    wa:"11 96618-6666",
    email:"bcmaioli@gmail.com",
    ig:"",
    regiao:"Brooklin",
    valor:"R$ 2M – 3M",
    tipo:"Casa / Apartamento",
    dorms:"—",
    m2:"180m²",
    origem:"Facebook Ads",
    campanha:"Casa Sense Brooklin 251m² e 436m²",
    publico:"PUB - SEGMENTADO",
    renda:"R$ 2M – 3M (investimento)",
    momento:"Pronto para comprar",
    temp:"Quente",
    etapa:"Em Atendimento",
    assignedTo:null,
    descartado:false,
    investimento:false,
    obs:"Pronto para comprar. Interesse em 180m² no Brooklin. Campanha Casa Sense Brooklin 251m²/436m². Público segmentado — perfil qualificado. Prioridade de contato.",
    proximo:"hoje",
    ultimoContato:"",
    historico:[
      {data:"20/05 16:31",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Casa Sense Brooklin 251m² e 436m² · Público: PUB-SEGMENTADO · Interesse: 180m² · Renda/invest.: R$2M–3M · Momento: Pronto para comprar."},
    ],
    criadoEm:"2026-05-20T16:31:13-03:00",
  },
  {
    id:4,
    nome:"Carina Tcheon",
    wa:"11 97088-5032",
    email:"carinawft@gmail.com",
    ig:"",
    regiao:"Vila Mascote",
    valor:"≈ R$ 1,2M – 1,5M",
    tipo:"Apartamento",
    dorms:"3 ou 4",
    m2:"128m²",
    origem:"Facebook Ads",
    campanha:"Fachada Zona Sul",
    publico:"PUB - SEGMENTADO",
    renda:"R$ 29k – 36k/mês",
    momento:"Visitando imóveis com interesse",
    temp:"Morno",
    etapa:"Em Atendimento",
    assignedTo:"Bruno",
    descartado:false,
    investimento:false,
    obs:"Visitando imóveis com interesse. 128m², 3 ou 4 dormitórios em Vila Mascote. Renda R$29k–36k/mês. Feedback Bruno: VÁLIDO C/PERFIL.",
    proximo:"hoje",
    ultimoContato:"14/05",
    historico:[
      {data:"14/05 20:16",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Fachada Zona Sul · Público: PUB-SEGMENTADO · Bairro: Vila Mascote · Interesse: 128m², 3 ou 4 dorms · Renda: R$29k–36k/mês · Momento: Visitando imóveis com interesse."},
      {data:"14/05 20:16",tipo:"anotacao",txt:"Feedback Bruno: VÁLIDO C/PERFIL. Perfil aprovado para atendimento."},
    ],
    criadoEm:"2026-05-14T20:16:41-03:00",
  },
  {
    id:5,
    nome:"Elyson Cordeiro",
    wa:"11 95035-9290",
    email:"elysoncordeiro@hotmail.com",
    ig:"",
    regiao:"Chácara Santo Antônio",
    valor:"≈ R$ 1,5M – 2M",
    tipo:"Apartamento",
    dorms:"3 ou 4",
    m2:"149m²",
    origem:"Facebook Ads",
    campanha:"Chácara Santo Antônio",
    publico:"PUB - LISTA+ADVANTAGE",
    renda:"R$ 38k – 45k/mês",
    momento:"Comecei a pesquisar agora",
    temp:"Frio",
    etapa:"Novo Lead",
    assignedTo:null,
    descartado:false,
    investimento:false,
    obs:"Começou a pesquisar. 149m², 3 ou 4 dormitórios em Chácara Santo Antônio. Renda R$38k–45k/mês — perfil de alta renda. Público lista + advantage. Sem contato realizado.",
    proximo:"hoje",
    ultimoContato:"",
    historico:[
      {data:"14/05 21:54",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Chácara Santo Antônio · Público: PUB-LISTA+ADVANTAGE · Bairro: Chácara Santo Antônio · Interesse: 149m², 3 ou 4 dorms · Renda: R$38k–45k/mês · Momento: Começou a pesquisar."},
    ],
    criadoEm:"2026-05-14T21:54:43-03:00",
  },
  {
    id:6,
    nome:"Isabela Ribeiro",
    wa:"21 99945-4896",
    email:"isabelaribeirofrederico@gmail.com",
    ig:"",
    regiao:"São Paulo (aberta a opções)",
    valor:"≈ R$ 800k – 1,2M",
    tipo:"Apartamento",
    dorms:"2",
    m2:"76m²",
    origem:"Facebook Ads",
    campanha:"Chácara Santo Antônio",
    publico:"PUB - ABERTO",
    renda:"R$ 20k – 27k/mês",
    momento:"Comecei a pesquisar agora",
    temp:"Frio",
    etapa:"Primeiro Contato",
    assignedTo:"Bruno",
    descartado:false,
    investimento:false,
    obs:"Aberta a ver todas as opções. 76m², 2 suítes. Renda R$20k–27k/mês. Número com DDD 21 (Rio?). Feedback Bruno: VÁLIDO C/PERFIL.",
    proximo:"amanhã",
    ultimoContato:"14/05",
    historico:[
      {data:"14/05 08:44",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Chácara Santo Antônio · Público: PUB-ABERTO · Bairro: Ver todas opções · Interesse: 76m², 2 suítes · Renda: R$20k–27k/mês · Momento: Começou a pesquisar."},
      {data:"14/05 08:44",tipo:"anotacao",txt:"Feedback Bruno: VÁLIDO C/PERFIL. Número DDD 21 — verificar se está em SP ou RJ."},
    ],
    criadoEm:"2026-05-14T08:44:26-03:00",
  },
  {
    id:7,
    nome:"Cissa Lamim",
    wa:"11 97611-8319",
    email:"cecilia.lamim@gmail.com",
    ig:"",
    regiao:"Vila Mascote",
    valor:"≈ R$ 800k – 1,2M",
    tipo:"Apartamento",
    dorms:"2",
    m2:"76m²",
    origem:"Facebook Ads",
    campanha:"Vila Mascote",
    publico:"PUB - SEGMENTADO",
    renda:"R$ 20k – 27k/mês",
    momento:"Comecei a pesquisar agora",
    temp:"Frio",
    etapa:"Novo Lead",
    assignedTo:null,
    descartado:false,
    investimento:false,
    obs:"Começou a pesquisar. 76m², 2 suítes em Vila Mascote. Renda R$20k–27k/mês. Sem contato realizado.",
    proximo:"hoje",
    ultimoContato:"",
    historico:[
      {data:"13/05 22:57",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Vila Mascote · Público: PUB-SEGMENTADO · Bairro: Vila Mascote · Interesse: 76m², 2 suítes · Renda: R$20k–27k/mês · Momento: Começou a pesquisar."},
    ],
    criadoEm:"2026-05-13T22:57:57-03:00",
  },
]

  {id:201,nome:"Tony Lopes",wa:"11 97275-1993",email:"gpaiva22@gmail.com",ig:"",regiao:"Brooklin",valor:"R$ 2M – 3M",tipo:"Casa / Apartamento",dorms:"—",m2:"180m²",origem:"Facebook Ads",campanha:"Casa Sense Brooklin 251M a 436M²",temp:"Quente",etapa:"Em Atendimento",assignedTo:null,descartado:false,investimento:false,obs:"Pronto para comprar. Interesse em 180m² no Brooklin (Sense). Campanha Casa Sense Brooklin.",proximo:"hoje",ultimoContato:"",historico:[{data:"24/05 15:56",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Casa Sense Brooklin 251M a 436M² · Pronto para comprar."}],criadoEm:"2026-05-24T15:56:44-03:00"},
  {id:202,nome:"Bruno Maioli",wa:"11 96618-6666",email:"bcmaioli@gmail.com",ig:"",regiao:"Brooklin",valor:"R$ 2M – 3M",tipo:"Casa / Apartamento",dorms:"—",m2:"180m²",origem:"Facebook Ads",campanha:"Casa Sense Brooklin 251m² e 436m²",temp:"Quente",etapa:"Em Atendimento",assignedTo:null,descartado:false,investimento:false,obs:"Pronto para comprar. 180m² Brooklin. Público segmentado — perfil qualificado.",proximo:"hoje",ultimoContato:"",historico:[{data:"20/05 16:31",tipo:"entrada",txt:"Lead captado via Facebook Ads · Campanha: Casa Sense Brooklin · Pronto para comprar."}],criadoEm:"2026-05-20T16:31:13-03:00"},
  {id:203,nome:"Elyson Cordeiro",wa:"11 95035-9290",email:"elysoncordeiro@hotmail.com",ig:"",regiao:"Chácara S.A.",valor:"≈ R$ 1,5M – 2M",tipo:"Apartamento",dorms:"3 ou 4",m2:"149m²",origem:"Facebook Ads",campanha:"Chácara Santo Antônio",temp:"Morno",etapa:"Novo Lead",assignedTo:null,descartado:false,investimento:false,obs:"Começou a pesquisar. 149m², 3/4 dorms em Chácara S.A. Renda R$38k–45k/mês. Alta renda.",proximo:"hoje",ultimoContato:"",historico:[{data:"14/05 21:54",tipo:"entrada",txt:"Lead Facebook Ads · Chácara Santo Antônio · Renda R$38k–45k/mês · Começou a pesquisar."}],criadoEm:"2026-05-14T21:54:43-03:00"},
  {id:204,nome:"Cissa Lamim",wa:"11 97611-8319",email:"cecilia.lamim@gmail.com",ig:"",regiao:"Vila Mascote",valor:"≈ R$ 800k – 1,2M",tipo:"Apartamento",dorms:"2",m2:"76m²",origem:"Facebook Ads",campanha:"Vila Mascote",temp:"Frio",etapa:"Novo Lead",assignedTo:null,descartado:false,investimento:false,obs:"Começou a pesquisar. 76m², 2 suítes em Vila Mascote. Renda R$20k–27k/mês.",proximo:"amanhã",ultimoContato:"",historico:[{data:"13/05 22:57",tipo:"entrada",txt:"Lead Facebook Ads · Vila Mascote · Renda R$20k–27k/mês · Começou a pesquisar."}],criadoEm:"2026-05-13T22:57:57-03:00"},
const ETAPAS   = ["Novo Lead","Primeiro Contato","Material Enviado","Em Atendimento","Visita Agendada","Negociação","Proposta Enviada","Fechado","Perdido"]
const BAIRROS  = ["Brooklin","Campo Belo","Vila Mariana","Klabin","Chácara S.A.","Mooca","Aclimação","Ipiranga","Pinheiros","Perdizes","Santana","Lapa","Tatuapé","Vila Madalena","Higienópolis","Jardins","Itaim Bibi","Vila Olímpia","Morumbi","Butantã","Santo André","ABC Paulista","Outro"]
const ORIGENS  = ["Facebook Ads","Instagram Ads","Google Ads","WhatsApp","Indicação","Landing Page","Site","RD Station","Outro"]
const TIPOS    = ["Apartamento","Cobertura","Cobertura Duplex","Garden","Penthouse","Studio","Outro"]

let _id = 100
function nextId() { return ++_id }

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function initials(n="") { return n.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase()||"?" }

function tempM(t) {
  if (t==="Quente")     return {bg:"rgba(208,80,64,0.12)",  tx:"#E07060", dot:"#D05040", label:"Quente 🔥"}
  if (t==="Morno")      return {bg:"rgba(212,150,10,0.12)", tx:"#D0A030", dot:"#D4960A", label:"Morno"}
  if (t==="Frio")       return {bg:"rgba(80,144,208,0.12)", tx:"#7090C0", dot:"#5090D0", label:"Frio"}
  if (t==="Investidor") return {bg:T.goldBg,                tx:T.goldL,   dot:T.gold,    label:"Investidor ★"}
  return {bg:"rgba(80,80,80,0.12)",tx:T.tx2,dot:T.tx3,label:t||"—"}
}

function etapaM(e) {
  const m = {
    "Novo Lead":         {bg:"rgba(80,144,208,0.10)",tx:"#5090D0"},
    "Primeiro Contato":  {bg:"rgba(88,88,88,0.10)",  tx:T.tx2},
    "Material Enviado":  {bg:"rgba(88,88,88,0.10)",  tx:T.tx2},
    "Em Atendimento":    {bg:T.goldBg,               tx:T.goldL},
    "Visita Agendada":   {bg:T.greenBg,              tx:T.green},
    "Negociação":        {bg:T.amberBg,              tx:"#D0A030"},
    "Proposta Enviada":  {bg:T.purpleBg,             tx:"#B080D0"},
    "Fechado":           {bg:T.greenBg,              tx:"#4AB87A"},
    "Perdido":           {bg:T.redBg,                tx:"#D07060"},
  }
  return m[e]||{bg:T.goldBg,tx:T.goldL}
}

function agentColor(a) {
  if (a==="Bruno") return T.brunoCl
  if (a==="Alana") return T.alanaCl
  return T.tx2
}

function waLink(n,msg="") {
  const num=(n||"").replace(/\D/g,"")
  return `https://wa.me/55${num}${msg?`?text=${encodeURIComponent(msg)}`:""}`
}

function now() {
  return new Date().toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})
}

// ─── PARSERS ──────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split("\n").map(l=>l.split(",").map(c=>c.trim().replace(/^"|"$/g,"")))
  if (lines.length<2) return []
  const headers = lines[0].map(h=>h.toLowerCase())
  return lines.slice(1).filter(r=>r.some(v=>v)).map((r,i)=>{
    const row = {}
    headers.forEach((h,j)=>{ row[h]=r[j]||"" })
    return {
      id: nextId(),
      nome:         row["nome"]||row["name"]||row["cliente"]||"Lead importado",
      wa:           row["whatsapp"]||row["telefone"]||row["phone"]||"",
      email:        row["email"]||"",
      ig:           row["instagram"]||"",
      regiao:       row["bairro"]||row["regiao"]||row["região"]||"São Paulo",
      valor:        row["valor"]||row["investimento"]||row["orcamento"]||"",
      tipo:         row["tipo"]||"Apartamento",
      dorms:        row["dorms"]||row["dormitorios"]||"",
      origem:       row["origem"]||"Importação CSV",
      temp:         row["temperatura"]||row["temp"]||"Frio",
      etapa:        row["etapa"]||row["status"]||"Novo Lead",
      assignedTo:   null,
      descartado:   false,
      obs:          row["obs"]||row["observacoes"]||row["notas"]||"",
      proximo:      row["followup"]||row["proximo"]||"",
      ultimoContato:row["ultimo_contato"]||"",
      historico:    [{data:now(),tipo:"entrada",txt:"Lead importado via CSV."}],
      criadoEm:     new Date().toISOString(),
    }
  })
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
function Av({nome="",size=36,style={}}) {
  const pal=["#C89A3C","#5090D0","#4AB87A","#A060D0","#D05040","#7ABCE0"]
  const ci=(nome.charCodeAt(0)||0)%pal.length
  return <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
    background:pal[ci]+"18",border:`1.5px solid ${pal[ci]}40`,
    display:"flex",alignItems:"center",justifyContent:"center",
    fontFamily:SS,fontSize:size*0.38,color:pal[ci],...style}}>{initials(nome)}</div>
}

// ─── BADGE ───────────────────────────────────────────────────────────────────
function Badge({children,bg,tx,style={}}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,
    padding:"3px 9px",borderRadius:20,fontFamily:SF,fontSize:10,
    fontWeight:500,background:bg,color:tx,whiteSpace:"nowrap",...style}}>{children}</span>
}

// ─── CHIP ────────────────────────────────────────────────────────────────────
function Chip({bg,tx,dot,label}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,
    padding:"3px 9px",borderRadius:20,fontFamily:SF,fontSize:10,
    background:bg,color:tx,whiteSpace:"nowrap"}}>
    {dot&&<span style={{width:5,height:5,borderRadius:"50%",background:dot,flexShrink:0}}/>}
    {label}
  </span>
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
function CTip({active,payload,label}) {
  if(!active||!payload?.length) return null
  return <div style={{background:T.card2,border:`1px solid ${T.bd2}`,borderRadius:8,padding:"10px 14px"}}>
    <div style={{fontFamily:SF,fontSize:10,color:T.goldL,marginBottom:5}}>{label}</div>
    {payload.map((p,i)=><div key={i} style={{fontFamily:SF,fontSize:11,color:T.white2,marginBottom:2}}>
      <span style={{color:p.color}}>{p.name}: </span><span style={{color:T.white}}>{p.value}</span>
    </div>)}
  </div>
}

// ─── MODAL: CONFIRMAR DESCARTE ────────────────────────────────────────────────
function ModalDescarte({lead,onConfirm,onCancel}) {
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:300,
    display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{background:T.card,border:`1px solid ${T.bd2}`,borderRadius:16,
      padding:"28px 32px",maxWidth:400,width:"90%"}}>
      <div style={{fontFamily:SS,fontSize:22,color:T.white,marginBottom:8}}>Descartar cliente?</div>
      <div style={{fontFamily:SF,fontSize:13,color:T.white2,marginBottom:6,lineHeight:1.6}}>
        <b style={{color:T.goldL}}>{lead.nome}</b> será movido para a lista de descartados.
      </div>
      <div style={{fontFamily:SF,fontSize:12,color:T.tx2,marginBottom:22}}>
        Você pode recuperar esse lead depois se necessário.
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={onConfirm} style={{flex:1,padding:"10px",borderRadius:9,border:"none",
          background:T.redBg,color:T.red,fontFamily:SF,fontSize:13,fontWeight:500,cursor:"pointer",
          border:`1px solid ${T.red}30`}}>Sim, descartar</button>
        <button onClick={onCancel} style={{flex:1,padding:"10px",borderRadius:9,
          border:`1px solid ${T.bd2}`,background:"transparent",
          color:T.white2,fontFamily:SF,fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  </div>
}

// ─── MODAL: TRANSFERIR LEAD ───────────────────────────────────────────────────
function ModalTransfer({lead,onConfirm,onCancel}) {
  const [dest,setDest]=useState(lead.assignedTo==="Bruno"?"Alana":"Bruno")
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:300,
    display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{background:T.card,border:`1px solid ${T.bd2}`,borderRadius:16,padding:"28px 32px",maxWidth:400,width:"90%"}}>
      <div style={{fontFamily:SS,fontSize:22,color:T.white,marginBottom:12}}>Transferir lead</div>
      <div style={{fontFamily:SF,fontSize:13,color:T.white2,marginBottom:18}}>
        Transferir <b style={{color:T.goldL}}>{lead.nome}</b> para:
      </div>
      <div style={{display:"flex",gap:10,marginBottom:22}}>
        {["Bruno","Alana"].map(a=>(
          <button key={a} onClick={()=>setDest(a)} style={{
            flex:1,padding:"14px",borderRadius:10,cursor:"pointer",
            border:`2px solid ${dest===a?agentColor(a):T.bd}`,
            background:dest===a?`${agentColor(a)}18`:"transparent",
            fontFamily:SS,fontSize:18,color:dest===a?agentColor(a):T.tx2,
            transition:"all 0.15s"
          }}>{a}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>onConfirm(dest)} style={{flex:1,padding:"10px",borderRadius:9,
          border:"none",background:T.goldBg,color:T.goldL,fontFamily:SF,fontSize:13,fontWeight:500,
          cursor:"pointer",border:`1px solid ${T.goldBd}`}}>Transferir</button>
        <button onClick={onCancel} style={{flex:1,padding:"10px",borderRadius:9,
          border:`1px solid ${T.bd}`,background:"transparent",
          color:T.white2,fontFamily:SF,fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  </div>
}

// ─── MODAL: NOVO LEAD ─────────────────────────────────────────────────────────
function ModalNovoLead({onSave,onCancel,agent}) {
  const [f,setF]=useState({nome:"",wa:"",email:"",ig:"",regiao:"",valor:"",
    tipo:"Apartamento",dorms:"",origem:"WhatsApp",temp:"Morno",obs:"",renda:"",investimento:false})
  const set = (k,v)=>setF(p=>({...p,[k]:v}))
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:300,
    display:"flex",alignItems:"center",justifyContent:"center",overflowY:"auto",padding:"20px"}}>
    <div style={{background:T.card,border:`1px solid ${T.bd2}`,borderRadius:16,
      padding:"28px 32px",width:"100%",maxWidth:560}}>
      <div style={{fontFamily:SS,fontSize:24,color:T.white,marginBottom:20}}>Novo Cliente</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[
          {k:"nome",   l:"Nome completo *",  ph:"Nome do cliente",full:true},
          {k:"wa",     l:"WhatsApp",          ph:"11 99999-9999"},
          {k:"email",  l:"E-mail",            ph:"email@email.com"},
          {k:"ig",     l:"Instagram",         ph:"@usuario"},
          {k:"valor",  l:"Faixa de investimento",ph:"R$ 1,5M"},
          {k:"dorms",  l:"Dormitórios",       ph:"2, 3, 4+"},
          {k:"obs",    l:"Observações",       ph:"Preferências, urgência...",full:true},
        ].map(fd=>(
          <div key={fd.k} style={{gridColumn:fd.full?"1/-1":"auto"}}>
            <div style={{fontFamily:SF,fontSize:10,color:T.tx2,letterSpacing:"0.08em",
              textTransform:"uppercase",marginBottom:5}}>{fd.l}</div>
            <input value={f[fd.k]} onChange={e=>set(fd.k,e.target.value)} placeholder={fd.ph}
              style={{width:"100%",padding:"9px 12px",background:T.bg3,
                border:`1px solid ${T.bd}`,borderRadius:8,fontFamily:SF,
                fontSize:12,color:T.white,outline:"none",boxSizing:"border-box"}}/>
          </div>
        ))}
        {/* Selects */}
        {[
          {k:"regiao",l:"Bairro / Região",opts:BAIRROS},
          {k:"tipo",  l:"Tipo de imóvel",  opts:TIPOS},
          {k:"origem",l:"Origem do lead",  opts:ORIGENS},
          {k:"temp",  l:"Temperatura",     opts:["Frio","Morno","Quente","Investidor"]},
        ].map(s=>(
          <div key={s.k}>
            <div style={{fontFamily:SF,fontSize:10,color:T.tx2,letterSpacing:"0.08em",
              textTransform:"uppercase",marginBottom:5}}>{s.l}</div>
            <select value={f[s.k]} onChange={e=>set(s.k,e.target.value)}
              style={{width:"100%",padding:"9px 12px",background:T.bg3,
                border:`1px solid ${T.bd}`,borderRadius:8,fontFamily:SF,
                fontSize:12,color:T.white,outline:"none",boxSizing:"border-box"}}>
              {s.opts.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div>
          <div style={{fontFamily:SF,fontSize:10,color:T.tx2,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Renda mensal</div>
          <select value={f.renda} onChange={e=>set("renda",e.target.value)}
            style={{width:"100%",padding:"9px 12px",background:T.bg3,border:`1px solid ${T.bd}`,
              borderRadius:8,fontFamily:SF,fontSize:12,color:T.white,outline:"none",boxSizing:"border-box"}}>
            <option value="">Não informado</option>
            <option>Até R$ 10k/mês</option>
            <option>R$ 10k – 20k/mês</option>
            <option>R$ 20k – 50k/mês</option>
            <option>Acima de R$ 50k/mês</option>
          </select>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:18}}>
          <input type="checkbox" id="inv" checked={f.investimento} onChange={e=>set("investimento",e.target.checked)}/>
          <label htmlFor="inv" style={{fontFamily:SF,fontSize:12,color:T.white2,cursor:"pointer"}}>
            Perfil investidor
          </label>
        </div>
      </div>
      <div style={{display:"flex",gap:10,marginTop:22}}>
        <button onClick={()=>{
          if(!f.nome.trim())return
          onSave({...f,id:nextId(),etapa:"Novo Lead",assignedTo:agent||null,
            descartado:false,historico:[{data:now(),tipo:"entrada",txt:"Lead criado manualmente."}],
            criadoEm:new Date().toISOString(),ultimoContato:"agora",proximo:""})
        }} style={{flex:1,padding:"11px",borderRadius:9,border:"none",
          background:T.goldBg,color:T.goldL,fontFamily:SF,fontSize:13,fontWeight:600,
          cursor:"pointer",border:`1px solid ${T.goldBd}`}}>Salvar cliente</button>
        <button onClick={onCancel} style={{flex:1,padding:"11px",borderRadius:9,
          border:`1px solid ${T.bd}`,background:"transparent",
          color:T.white2,fontFamily:SF,fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  </div>
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({lead,agent,onClose,onUpdate,onDiscard,onTransfer,onClaim}) {
  const [nota,setNota]=useState("")
  const [editEtapa,setEditEtapa]=useState(lead.etapa)
  const [editTemp,setEditTemp]=useState(lead.temp)

  function registrar(tipo,txt) {
    onUpdate(lead.id,{
      historico:[{data:now(),tipo,txt},...lead.historico],
      ultimoContato:"agora"
    })
  }

  const waPadrao=`Olá, ${(lead.nome||"").split(" ")[0]}! 👋 Aqui é ${agent||"Bruno"}, consultor Cyrela & Living em São Paulo. Tudo bem? Gostaria de continuar o nosso atendimento! 😊`

  const tipoColor = t=>{
    const m={ligacao:T.blue,material:T.tx2,visita:T.green,proposta:T.purple,
      whatsapp:T.green,agenda:T.amber,entrada:T.tx3,anotacao:T.gold}
    return m[t]||T.tx3
  }
  const tipoIco = t=>{
    const m={ligacao:"☎",material:"📎",visita:"🏢",proposta:"📋",
      whatsapp:"💬",agenda:"📅",entrada:"⊕",anotacao:"✏"}
    return m[t]||"·"
  }

  return <div style={{
    position:"fixed",top:0,right:0,bottom:0,width:490,
    background:T.bg2,borderLeft:`1px solid ${T.bd2}`,
    zIndex:100,display:"flex",flexDirection:"column",
    boxShadow:"-4px 0 40px rgba(0,0,0,0.5)",overflowY:"auto"
  }}>
    {/* Header */}
    <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${T.bd}`,
      background:T.card,flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.14em",textTransform:"uppercase",paddingTop:3}}>
          {lead.assignedTo ? <span>Responsável: <b style={{color:agentColor(lead.assignedTo)}}>{lead.assignedTo}</b></span> : "🏆 Pool geral"}
        </div>
        <button onClick={onClose} style={{width:24,height:24,borderRadius:6,
          border:`1px solid ${T.bd}`,background:"transparent",cursor:"pointer",
          color:T.tx2,fontSize:12}}>✕</button>
      </div>
      <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
        <Av nome={lead.nome} size={50}/>
        <div style={{flex:1}}>
          <div style={{fontFamily:SS,fontSize:22,color:T.white,lineHeight:1.1,marginBottom:6}}>{lead.nome}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:6}}>
            <Chip {...tempM(lead.temp)}/>
            <Badge bg={etapaM(lead.etapa).bg} tx={etapaM(lead.etapa).tx}>{lead.etapa}</Badge>
            {lead.investimento&&<Badge bg={T.goldBg} tx={T.goldL}>Investidor ★</Badge>}
          </div>
          <div style={{fontFamily:SF,fontSize:12,color:T.tx2}}>{lead.regiao} · {lead.valor}</div>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div style={{padding:"12px 24px",borderBottom:`1px solid ${T.bd}`,
      display:"flex",gap:7,flexWrap:"wrap",background:T.bg2}}>
      {lead.wa&&<a href={waLink(lead.wa,waPadrao)} target="_blank" style={{
        flex:1,minWidth:80,display:"flex",alignItems:"center",justifyContent:"center",gap:5,
        padding:"8px 4px",borderRadius:8,background:T.greenBg,
        border:"1px solid rgba(74,184,122,0.22)",color:T.green,
        fontFamily:SF,fontSize:11,fontWeight:500,textDecoration:"none"}}>✆ WhatsApp</a>}
      {!lead.assignedTo&&agent&&(
        <button onClick={()=>onClaim(lead.id)} style={{
          flex:1,minWidth:80,padding:"8px 4px",borderRadius:8,
          background:T.goldBg,border:`1px solid ${T.goldBd}`,
          color:T.goldL,fontFamily:SF,fontSize:11,fontWeight:600,cursor:"pointer"}}>
          ⚡ Pegar lead
        </button>
      )}
      {lead.assignedTo&&<button onClick={onTransfer} style={{
        flex:1,minWidth:80,padding:"8px 4px",borderRadius:8,
        background:T.blueBg,border:`1px solid ${T.blue}30`,
        color:T.blue,fontFamily:SF,fontSize:11,cursor:"pointer"}}>⇄ Transferir</button>}
      <button onClick={onDiscard} style={{
        flex:1,minWidth:80,padding:"8px 4px",borderRadius:8,
        background:T.redBg,border:`1px solid ${T.red}30`,
        color:T.red,fontFamily:SF,fontSize:11,cursor:"pointer"}}>🗑 Descartar</button>
    </div>

    <div style={{flex:1,overflowY:"auto"}}>
      {/* Dados */}
      <div style={{padding:"16px 24px",borderBottom:`1px solid ${T.bd}`}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
          textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Dados</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {[
            {l:"WhatsApp",v:lead.wa||"—"},{l:"E-mail",v:lead.email||"—"},
            {l:"Campanha",v:lead.campanha||"—"},{l:"Público",v:lead.publico||"—"},
            {l:"Tipo / Metragem",v:`${lead.tipo||"—"} · ${lead.m2||"—"}`},{l:"Dormitórios",v:lead.dorms||"—"},
            {l:"Renda bruta",v:lead.renda||"—"},{l:"Momento de compra",v:lead.momento||"—"},
            {l:"Investimento est.",v:lead.valor||"—"},{l:"Último contato",v:lead.ultimoContato||"—"},
          ].map((r,i)=>(
            <div key={i} style={{padding:"8px 10px",background:T.card2,borderRadius:7}}>
              <div style={{fontFamily:SF,fontSize:9,color:T.tx3,letterSpacing:"0.08em",
                textTransform:"uppercase",marginBottom:3}}>{r.l}</div>
              <div style={{fontFamily:SF,fontSize:12,color:T.white}}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Observações */}
      {lead.obs&&<div style={{padding:"14px 24px",borderBottom:`1px solid ${T.bd}`}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
          textTransform:"uppercase",marginBottom:7}}>Observações</div>
        <div style={{fontFamily:SF,fontSize:12,color:T.white2,lineHeight:1.7,
          background:T.card2,padding:"12px 14px",borderRadius:8}}>{lead.obs}</div>
      </div>}

      {/* Classificar */}
      <div style={{padding:"14px 24px",borderBottom:`1px solid ${T.bd}`}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
          textTransform:"uppercase",marginBottom:10}}>Classificação</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div>
            <div style={{fontFamily:SF,fontSize:10,color:T.tx2,marginBottom:5}}>Temperatura</div>
            <select value={editTemp} onChange={e=>{setEditTemp(e.target.value);onUpdate(lead.id,{temp:e.target.value})}}
              style={{width:"100%",padding:"7px 10px",background:T.card2,border:`1px solid ${T.bd}`,
                borderRadius:7,fontFamily:SF,fontSize:12,color:T.white,outline:"none"}}>
              {["Frio","Morno","Quente","Investidor"].map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontFamily:SF,fontSize:10,color:T.tx2,marginBottom:5}}>Etapa</div>
            <select value={editEtapa} onChange={e=>{setEditEtapa(e.target.value);onUpdate(lead.id,{etapa:e.target.value})}}
              style={{width:"100%",padding:"7px 10px",background:T.card2,border:`1px solid ${T.bd}`,
                borderRadius:7,fontFamily:SF,fontSize:12,color:T.white,outline:"none"}}>
              {ETAPAS.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Registrar */}
      <div style={{padding:"14px 24px",borderBottom:`1px solid ${T.bd}`}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
          textTransform:"uppercase",marginBottom:7}}>Registrar ação</div>
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          {[["ligacao","☎ Ligação"],["visita","🏢 Visita"],["material","📎 Material"],["proposta","📋 Proposta"],["agenda","📅 Agendar"]].map(([tp,lb])=>(
            <button key={tp} onClick={()=>registrar(tp,lb.replace(/^.+ /,"")+" registrado.")}
              style={{padding:"5px 10px",borderRadius:7,border:`1px solid ${T.bd}`,
                background:"transparent",color:T.tx2,fontFamily:SF,fontSize:10,cursor:"pointer"}}>
              {lb}
            </button>
          ))}
        </div>
        <textarea value={nota} onChange={e=>setNota(e.target.value)} placeholder="Escreva uma anotação..."
          style={{width:"100%",height:64,padding:"9px 12px",background:T.card2,
            border:`1px solid ${T.bd}`,borderRadius:8,fontFamily:SF,fontSize:12,
            color:T.white,outline:"none",resize:"none",boxSizing:"border-box",lineHeight:1.6}}/>
        <button onClick={()=>{if(!nota.trim())return;registrar("anotacao",nota);setNota("")}}
          style={{marginTop:7,padding:"8px 18px",borderRadius:8,border:"none",
            background:T.goldBg,color:T.goldL,fontFamily:SF,fontSize:12,
            fontWeight:500,cursor:"pointer",border:`1px solid ${T.goldBd}`}}>Registrar</button>
      </div>

      {/* Timeline */}
      <div style={{padding:"16px 24px 28px"}}>
        <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
          textTransform:"uppercase",marginBottom:14}}>Timeline</div>
        <div style={{position:"relative",paddingLeft:22}}>
          <div style={{position:"absolute",left:5,top:8,bottom:8,width:1.5,background:T.bd}}/>
          {lead.historico.map((h,i)=>{
            const cor=tipoColor(h.tipo)
            return <div key={i} style={{position:"relative",marginBottom:14}}>
              <div style={{position:"absolute",left:-22,top:3,width:12,height:12,
                borderRadius:"50%",background:`${cor}20`,border:`1.5px solid ${cor}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:7,color:cor}}>{tipoIco(h.tipo)}</div>
              <div style={{background:T.card2,border:`1px solid ${T.bd}`,borderRadius:8,padding:"9px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontFamily:SF,fontSize:10,color:cor,fontWeight:600,textTransform:"capitalize"}}>{h.tipo}</span>
                  <span style={{fontFamily:SF,fontSize:10,color:T.tx3}}>{h.data}</span>
                </div>
                <div style={{fontFamily:SF,fontSize:12,color:T.white2,lineHeight:1.6}}>{h.txt}</div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  </div>
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAVS=[
  {id:"dashboard",  ico:"▦", label:"Dashboard"},
  {id:"pool",       ico:"◉", label:"Pool de Leads"},
  {id:"meusCli",    ico:"★", label:"Minha Carteira"},
  {id:"funil",      ico:"⊫", label:"Funil de Vendas"},
  {id:"followup",   ico:"◷", label:"Follow-up"},
  {id:"integracao", ico:"⟳", label:"Integrações"},
  {id:"descartados",ico:"🗑", label:"Descartados"},
]

function Sidebar({view,setView,agent,setAgent,followCount,pool}) {
  return <div style={{width:230,minHeight:"100vh",background:T.bg2,
    borderRight:`1px solid ${T.bd}`,display:"flex",flexDirection:"column",flexShrink:0}}>
    {/* Brand */}
    <div style={{padding:"24px 20px 18px",borderBottom:`1px solid ${T.bd}`}}>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        {["Cyrela","Living"].map(b=><span key={b} style={{
          padding:"2px 7px",borderRadius:3,border:`1px solid ${T.goldBd}`,
          fontFamily:SF,fontSize:9,color:T.goldL,letterSpacing:"0.14em",textTransform:"uppercase"
        }}>{b}</span>)}
      </div>
      <div style={{fontFamily:SS,fontSize:22,color:T.white,lineHeight:1.1,marginBottom:1}}>Almirante Lass</div>
      <div style={{fontFamily:SS,fontStyle:"italic",fontSize:13,color:T.gold,marginBottom:10}}>CRM Imobiliário</div>
      <div style={{fontFamily:SF,fontSize:10,color:T.tx2,letterSpacing:"0.1em",textTransform:"uppercase"}}>São Paulo</div>
    </div>

    {/* Agent switcher */}
    <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.bd}`}}>
      <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Logado como</div>
      <div style={{display:"flex",gap:6}}>
        {["Bruno","Alana"].map(a=>(
          <button key={a} onClick={()=>setAgent(agent===a?null:a)} style={{
            flex:1,padding:"8px 0",borderRadius:8,cursor:"pointer",
            border:`1.5px solid ${agent===a?agentColor(a):T.bd}`,
            background:agent===a?`${agentColor(a)}15`:"transparent",
            fontFamily:SS,fontSize:15,color:agent===a?agentColor(a):T.tx2,
            transition:"all 0.15s"
          }}>{a}</button>
        ))}
      </div>
    </div>

    {/* Nav */}
    <nav style={{flex:1,padding:"8px 0"}}>
      {NAVS.map(n=>{
        const on=view===n.id
        const hasBadge=(n.id==="pool"&&pool>0)||(n.id==="followup"&&followCount>0)
        return <button key={n.id} onClick={()=>setView(n.id)} style={{
          width:"100%",display:"flex",alignItems:"center",gap:10,
          padding:"10px 20px",border:"none",cursor:"pointer",
          background:on?"rgba(200,154,60,0.10)":"transparent",
          borderLeft:`2px solid ${on?T.gold:"transparent"}`,
          color:on?T.goldL:"rgba(255,255,255,0.4)",
          fontFamily:SF,fontSize:12,fontWeight:on?500:400,
          letterSpacing:"0.01em",transition:"all 0.15s",textAlign:"left"
        }}>
          <span style={{fontSize:13,opacity:on?1:0.6}}>{n.ico}</span>
          {n.label}
          {hasBadge&&<span style={{marginLeft:"auto",minWidth:18,height:18,borderRadius:9,
            background:n.id==="pool"?T.gold:T.red,display:"flex",alignItems:"center",
            justifyContent:"center",fontFamily:SF,fontSize:9,color:T.bg,fontWeight:700,padding:"0 4px"}}>
            {n.id==="pool"?pool:followCount}</span>}
        </button>
      })}
    </nav>

    {/* WA */}
    <div style={{padding:"12px 14px 18px"}}>
      <a href={waLink("11947933199")} target="_blank" rel="noreferrer" style={{
        display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,
        background:T.greenBg,border:"1px solid rgba(74,184,122,0.2)",textDecoration:"none"}}>
        <span style={{fontSize:16,color:T.green}}>✆</span>
        <div>
          <div style={{fontFamily:SF,fontSize:10,color:T.green,fontWeight:500}}>Bruno · 11 94793-3199</div>
          <div style={{fontFamily:SF,fontSize:9,color:"rgba(74,184,122,0.5)"}}>WhatsApp direto</div>
        </div>
      </a>
    </div>
  </div>
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({view,agent,onNew,onImport}) {
  const titles={dashboard:"Dashboard",pool:"Pool de Leads",meusCli:"Minha Carteira",
    funil:"Funil de Vendas",followup:"Follow-up",integracao:"Integrações",descartados:"Descartados"}
  return <div style={{height:62,background:T.bg2,borderBottom:`1px solid ${T.bd}`,
    display:"flex",alignItems:"center",justifyContent:"space-between",
    padding:"0 32px",flexShrink:0}}>
    <h1 style={{fontFamily:SS,fontSize:26,fontWeight:400,color:T.white,margin:0}}>{titles[view]||"CRM"}</h1>
    <div style={{display:"flex",gap:10,alignItems:"center"}}>
      <button onClick={onImport} style={{padding:"7px 14px",borderRadius:8,
        border:`1px solid ${T.bd}`,background:"transparent",color:T.tx2,
        fontFamily:SF,fontSize:11,cursor:"pointer"}}>⬆ Importar CSV</button>
      <button onClick={onNew} style={{padding:"8px 16px",borderRadius:8,border:"none",
        background:T.goldBg,color:T.goldL,fontFamily:SF,fontSize:12,
        fontWeight:600,cursor:"pointer",border:`1px solid ${T.goldBd}`}}>+ Novo cliente</button>
      {agent&&<div style={{display:"flex",alignItems:"center",gap:8,marginLeft:4}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:agentColor(agent)}}/>
        <span style={{fontFamily:SF,fontSize:12,color:agentColor(agent),fontWeight:500}}>{agent}</span>
      </div>}
    </div>
  </div>
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({leads,agent}) {
  const active=leads.filter(l=>!l.descartado)
  const mine  =agent?active.filter(l=>l.assignedTo===agent):active

  const kpis=[
    {l:"Total na Carteira",v:mine.length,             c:T.gold,    ico:"◉"},
    {l:"Leads Quentes",    v:mine.filter(l=>l.temp==="Quente").length, c:T.red,ico:"🔥"},
    {l:"Em Negociação",    v:mine.filter(l=>["Negociação","Proposta Enviada"].includes(l.etapa)).length, c:T.amber,ico:"⊫"},
    {l:"Fechados no Mês",  v:mine.filter(l=>l.etapa==="Fechado").length, c:T.green,ico:"★"},
  ]

  const monthly=[
    {mes:"Jan",bruno:8, alana:6},
    {mes:"Fev",bruno:12,alana:9},
    {mes:"Mar",bruno:15,alana:12},
    {mes:"Abr",bruno:19,alana:16},
    {mes:"Mai",bruno:14,alana:11},
  ]

  // Dual agent stats
  const agentStats=(name)=>{
    const ag=active.filter(l=>l.assignedTo===name)
    return {
      captacoes: ag.length,
      agendamentos: ag.filter(l=>l.etapa==="Visita Agendada").length,
      visitas:   ag.filter(l=>["Visita Agendada","Negociação","Proposta Enviada","Fechado"].includes(l.etapa)).length,
      vendas:    ag.filter(l=>l.etapa==="Fechado").length,
    }
  }
  const bs=agentStats("Bruno")
  const as_=agentStats("Alana")

  return <div style={{padding:"26px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
    {/* KPIs */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
      {kpis.map((k,i)=>(
        <div key={i} style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,
          padding:"20px 22px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:k.c,opacity:0.7}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{fontFamily:SF,fontSize:10,color:T.tx2,letterSpacing:"0.04em"}}>{k.l}</div>
            <div style={{width:30,height:30,borderRadius:8,background:`${k.c}18`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:k.c}}>{k.ico}</div>
          </div>
          <div style={{fontFamily:SS,fontSize:44,color:T.white,lineHeight:1,marginBottom:5}}>{k.v}</div>
          <div style={{fontFamily:SF,fontSize:10,color:T.tx2}}>
            {agent||"Visão geral"}
          </div>
        </div>
      ))}
    </div>

    {/* Dual funnel */}
    <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,
      padding:"22px 24px",marginBottom:14}}>
      <div style={{fontFamily:SS,fontSize:20,color:T.white,marginBottom:4}}>Funil da Equipe</div>
      <div style={{fontFamily:SF,fontSize:11,color:T.tx2,marginBottom:18}}>captações · agendamentos · visitas · vendas</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
        {[{n:"Bruno",s:bs,c:T.brunoCl},{n:"Alana",s:as_,c:T.alanaCl}].map(({n,s,c})=>(
          <div key={n}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <Av nome={n} size={30}/>
              <div style={{fontFamily:SS,fontSize:18,color:c}}>{n}</div>
            </div>
            {[
              {l:"Captações",   v:s.captacoes,   max:20},
              {l:"Agendamentos",v:s.agendamentos,max:10},
              {l:"Visitas",     v:s.visitas,      max:10},
              {l:"Vendas",      v:s.vendas,       max:5},
            ].map((row,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <div style={{fontFamily:SF,fontSize:11,color:T.tx2,width:90,flexShrink:0}}>{row.l}</div>
                <div style={{flex:1,height:20,background:T.bg3,borderRadius:4,overflow:"hidden"}}>
                  <div style={{width:`${row.max>0?Math.min(100,row.v/row.max*100):0}%`,height:"100%",
                    background:c,opacity:0.7,borderRadius:4,transition:"width 0.5s"}}/>
                </div>
                <div style={{fontFamily:SS,fontSize:20,color:c,width:24,textAlign:"right",flexShrink:0}}>{row.v}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* Chart + Pool */}
    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,padding:"22px 24px"}}>
        <div style={{fontFamily:SS,fontSize:20,color:T.white,marginBottom:16}}>Captações por agente — 2026</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthly} margin={{top:5,right:5,bottom:0,left:-24}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.bd}/>
            <XAxis dataKey="mes" tick={{fill:T.tx2,fontSize:10,fontFamily:SF}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:T.tx2,fontSize:10,fontFamily:SF}} axisLine={false} tickLine={false}/>
            <Tooltip content={<CTip/>}/>
            <Bar dataKey="bruno" fill={T.brunoCl} radius={[4,4,0,0]} name="Bruno" opacity={0.8}/>
            <Bar dataKey="alana" fill={T.alanaCl} radius={[4,4,0,0]} name="Alana" opacity={0.8}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,padding:"22px 24px"}}>
        <div style={{fontFamily:SS,fontSize:20,color:T.white,marginBottom:4}}>Pool geral</div>
        <div style={{fontFamily:SF,fontSize:11,color:T.tx2,marginBottom:16}}>leads sem responsável</div>
        {active.filter(l=>!l.assignedTo).length===0?(
          <div style={{textAlign:"center",padding:"20px 0",fontFamily:SS,fontSize:16,color:T.tx3,fontStyle:"italic"}}>
            Pool vazio — todos alocados ✓
          </div>
        ):active.filter(l=>!l.assignedTo).slice(0,4).map(l=>{
          const tm=tempM(l.temp)
          return <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,
            padding:"9px 0",borderBottom:`1px solid ${T.bd}`}}>
            <Av nome={l.nome} size={28}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:SF,fontSize:12,color:T.white,fontWeight:500,
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{l.nome}</div>
              <div style={{fontFamily:SF,fontSize:10,color:T.tx2}}>{l.regiao} · {l.valor}</div>
            </div>
            <Chip {...tm}/>
          </div>
        })}
      </div>
    </div>
  </div>
}

// ─── LISTA DE LEADS (Pool / Minha Carteira / Descartados) ─────────────────────
function LeadList({leads,agent,isPool,isDescartados,onSelect,onClaim,onUpdate}) {
  const [q,setQ]=useState("")
  const [ftTemp,setFtTemp]=useState("Todos")
  const [ftEtapa,setFtEtapa]=useState("Todas")

  const filtered=leads.filter(l=>{
    const matchQ=!q||l.nome.toLowerCase().includes(q.toLowerCase())||
      (l.regiao||"").toLowerCase().includes(q.toLowerCase())
    const matchT=ftTemp==="Todos"||(l.temp||"")===(ftTemp)
    const matchE=ftEtapa==="Todas"||(l.etapa||"")===(ftEtapa)
    return matchQ&&matchT&&matchE
  })

  return <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
    {/* Filter */}
    <div style={{padding:"12px 32px",background:T.bg2,borderBottom:`1px solid ${T.bd}`,
      flexShrink:0,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar..."
        style={{padding:"7px 12px",background:T.card2,border:`1px solid ${T.bd}`,borderRadius:8,
          fontFamily:SF,fontSize:12,color:T.white,outline:"none",width:200}}/>
      {["Todos","Quente","Morno","Frio","Investidor"].map(t=>(
        <button key={t} onClick={()=>setFtTemp(t)} style={{
          padding:"5px 12px",borderRadius:20,cursor:"pointer",
          border:`1px solid ${ftTemp===t?T.gold:T.bd}`,
          background:ftTemp===t?T.goldBg:"transparent",
          color:ftTemp===t?T.goldL:T.tx2,fontFamily:SF,fontSize:11}}>
          {t}
        </button>
      ))}
      <select value={ftEtapa} onChange={e=>setFtEtapa(e.target.value)}
        style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${T.bd}`,
          background:T.card2,fontFamily:SF,fontSize:11,color:T.tx2,outline:"none"}}>
        <option>Todas</option>
        {ETAPAS.map(e=><option key={e}>{e}</option>)}
      </select>
      <span style={{marginLeft:"auto",fontFamily:SF,fontSize:11,color:T.tx2}}>
        <b style={{color:T.goldL}}>{filtered.length}</b> clientes
      </span>
    </div>
    {/* Table */}
    <div style={{flex:1,overflowY:"auto"}}>
      {filtered.length===0&&<div style={{textAlign:"center",padding:"60px",fontFamily:SS,
        fontSize:22,color:T.tx3,fontStyle:"italic"}}>Nenhum cliente aqui</div>}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        {filtered.length>0&&<thead style={{position:"sticky",top:0,background:T.bg,zIndex:2}}>
          <tr>
            {["Cliente","Região / Valor","Temperatura","Etapa","Responsável","Contato",""].map(h=>(
              <th key={h} style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.12em",
                textTransform:"uppercase",textAlign:"left",padding:"11px 16px 9px",fontWeight:500,
                borderBottom:`1px solid ${T.bd}`,background:T.bg}}>{h}</th>
            ))}
          </tr>
        </thead>}
        <tbody>
          {filtered.map(l=>{
            const tm=tempM(l.temp)
            const em=etapaM(l.etapa)
            return <tr key={l.id} onClick={()=>onSelect(l)}
              style={{borderBottom:`1px solid ${T.bd}`,cursor:"pointer",transition:"background 0.1s"}}
              onMouseEnter={e=>e.currentTarget.style.background=T.card2}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <Av nome={l.nome} size={32}/>
                  <div>
                    <div style={{fontFamily:SF,fontSize:13,color:T.white,fontWeight:500}}>{l.nome}</div>
                    <div style={{fontFamily:SF,fontSize:10,color:T.tx2,marginTop:1}}>{l.origem}</div>
                  </div>
                </div>
              </td>
              <td style={{padding:"12px 16px"}}>
                <div style={{fontFamily:SF,fontSize:12,color:T.white2}}>{l.regiao||"São Paulo"}</div>
                <div style={{fontFamily:SS,fontStyle:"italic",fontSize:13,color:T.gold}}>{l.valor}</div>
              </td>
              <td style={{padding:"12px 16px"}}><Chip {...tm}/></td>
              <td style={{padding:"12px 16px"}}>
                <Badge bg={em.bg} tx={em.tx}>{l.etapa}</Badge>
              </td>
              <td style={{padding:"12px 16px"}}>
                {l.assignedTo
                  ? <span style={{fontFamily:SF,fontSize:12,color:agentColor(l.assignedTo),fontWeight:500}}>{l.assignedTo}</span>
                  : <span style={{fontFamily:SF,fontSize:11,color:T.tx3,fontStyle:"italic"}}>pool</span>}
              </td>
              <td style={{padding:"12px 16px",fontFamily:SF,fontSize:11,color:T.tx2}}>{l.ultimoContato||"—"}</td>
              <td style={{padding:"12px 16px"}}>
                <div style={{display:"flex",gap:6"}}>
                  {l.wa&&<a href={waLink(l.wa)} target="_blank" onClick={e=>e.stopPropagation()}
                    style={{width:28,height:28,borderRadius:7,background:T.greenBg,
                      border:"1px solid rgba(74,184,122,0.2)",display:"flex",alignItems:"center",
                      justifyContent:"center",color:T.green,fontSize:13,textDecoration:"none"}}>✆</a>}
                  {!l.assignedTo&&agent&&(
                    <button onClick={e=>{e.stopPropagation();onClaim(l.id)}}
                      style={{width:28,height:28,borderRadius:7,background:T.goldBg,
                        border:`1px solid ${T.goldBd}`,color:T.goldL,fontSize:11,cursor:"pointer"}}>⚡</button>
                  )}
                </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
}

// ─── FUNIL KANBAN ──────────────────────────────────────────────────────────────
function Funil({leads,onUpdate}) {
  const [drag,setDrag]=useState(null)
  const [over,setOver]=useState(null)
  const active=leads.filter(l=>!l.descartado)

  const COLS=ETAPAS.filter(e=>e!=="Perdido")
  const colColor=e=>{
    const m={"Novo Lead":T.blue,"Primeiro Contato":T.tx2,"Material Enviado":T.tx2,
      "Em Atendimento":T.gold,"Visita Agendada":T.green,"Negociação":T.amber,
      "Proposta Enviada":T.purple,"Fechado":T.green}
    return m[e]||T.tx2
  }

  return <div style={{padding:"20px 20px",overflowX:"auto",height:"100%",boxSizing:"border-box"}}>
    <div style={{fontFamily:SS,fontSize:22,color:T.white,marginBottom:4}}>Funil de Vendas</div>
    <div style={{fontFamily:SF,fontSize:11,color:T.tx2,marginBottom:18}}>arraste os cards entre as colunas</div>
    <div style={{display:"flex",gap:10,height:"calc(100%-80px)",alignItems:"flex-start",minWidth:"max-content"}}>
      {COLS.map(etapa=>{
        const col=active.filter(l=>l.etapa===etapa)
        const cor=colColor(etapa)
        const isOver=over===etapa
        return <div key={etapa}
          onDragOver={e=>{e.preventDefault();setOver(etapa)}}
          onDragLeave={()=>setOver(null)}
          onDrop={e=>{
            e.preventDefault()
            if(drag){onUpdate(drag,{etapa});setDrag(null);setOver(null)}
          }}
          style={{width:172,flexShrink:0,background:isOver?`${cor}10`:T.card,
            border:`1.5px solid ${isOver?cor:T.bd}`,borderRadius:12,padding:"11px",
            transition:"all 0.15s",
            boxShadow:isOver?`0 0 0 2px ${cor}30`:"none",
            maxHeight:"calc(100vh - 160px)",display:"flex",flexDirection:"column"}}>
          <div style={{marginBottom:10,flexShrink:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontFamily:SF,fontSize:10,color:T.white,fontWeight:600,letterSpacing:"0.03em"}}>{etapa}</div>
              <div style={{width:20,height:20,borderRadius:10,background:`${cor}20`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:SF,fontSize:9,color:cor,fontWeight:700}}>{col.length}</div>
            </div>
            <div style={{height:2,background:`${cor}40`,borderRadius:2}}/>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:7}}>
            {col.map(l=>{
              const tm=tempM(l.temp)
              return <div key={l.id} draggable
                onDragStart={()=>setDrag(l.id)}
                onDragEnd={()=>{setDrag(null);setOver(null)}}
                style={{background:T.card2,border:`1px solid ${T.bd}`,borderRadius:8,
                  padding:"9px 10px",cursor:"grab",opacity:drag===l.id?0.4:1,
                  transition:"opacity 0.1s"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                  <Av nome={l.nome} size={24}/>
                  <div style={{fontFamily:SF,fontSize:11,color:T.white,fontWeight:500,
                    flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.nome.split(" ").slice(0,2).join(" ")}</div>
                </div>
                <div style={{fontFamily:SS,fontStyle:"italic",fontSize:12,color:T.gold,marginBottom:5}}>{l.valor||"—"}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Chip {...tm}/>
                  {l.assignedTo&&<span style={{fontFamily:SF,fontSize:9,color:agentColor(l.assignedTo)}}>{l.assignedTo[0]}</span>}
                </div>
              </div>
            })}
          </div>
        </div>
      })}
    </div>
  </div>
}

// ─── FOLLOW-UP ────────────────────────────────────────────────────────────────
function FollowUp({leads,agent,onUpdate}) {
  const active=leads.filter(l=>!l.descartado&&(agent?l.assignedTo===agent:true))
  const vencidos=active.filter(l=>l.proximo==="atrasado")
  const hoje=   active.filter(l=>l.proximo==="hoje"||l.proximo==="agora")
  const amanha= active.filter(l=>(l.proximo||"").includes("amanhã"))
  const frios=  active.filter(l=>l.temp==="Frio"&&!["Fechado","Perdido"].includes(l.etapa))
  const semCtt= active.filter(l=>!l.ultimoContato&&l.etapa!=="Fechado")

  function marcar(id) {
    onUpdate(id,{ultimoContato:"agora",proximo:"",
      historico:[{data:now(),tipo:"whatsapp",txt:"Follow-up realizado."},...(leads.find(l=>l.id===id)?.historico||[])]
    })
  }

  function Sec({title,items,cor}) {
    if(!items.length) return null
    return <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:4,height:20,background:cor,borderRadius:2}}/>
        <div style={{fontFamily:SS,fontSize:20,color:T.white}}>{title}</div>
        <div style={{width:22,height:22,borderRadius:11,background:`${cor}18`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:SF,fontSize:11,color:cor,fontWeight:700}}>{items.length}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map(l=>{
          const tm=tempM(l.temp)
          return <div key={l.id} style={{background:T.card,border:`1px solid ${T.bd}`,
            borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,
            borderLeft:`3px solid ${cor}`}}>
            <Av nome={l.nome} size={38}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                <div style={{fontFamily:SF,fontSize:14,color:T.white,fontWeight:500}}>{l.nome}</div>
                <Chip {...tm}/>
                {l.assignedTo&&<span style={{fontFamily:SF,fontSize:10,color:agentColor(l.assignedTo)}}>{l.assignedTo}</span>}
              </div>
              <div style={{fontFamily:SF,fontSize:11,color:T.tx2}}>{l.regiao} · {l.valor} · {l.tipo}</div>
              {l.obs&&<div style={{fontFamily:SF,fontSize:11,color:T.tx2,marginTop:3,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.obs}</div>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
              {l.wa&&<a href={waLink(l.wa)} target="_blank" style={{
                padding:"7px 12px",borderRadius:8,background:T.greenBg,
                border:"1px solid rgba(74,184,122,0.22)",color:T.green,
                fontFamily:SF,fontSize:11,fontWeight:500,textDecoration:"none"}}>✆ WhatsApp</a>}
              <button onClick={()=>marcar(l.id)} style={{padding:"6px 12px",borderRadius:8,
                border:`1px solid ${T.bd}`,background:"transparent",cursor:"pointer",
                fontFamily:SF,fontSize:11,color:T.tx2}}>✓ Contatado</button>
            </div>
          </div>
        })}
      </div>
    </div>
  }

  return <div style={{padding:"26px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
    <div style={{fontFamily:SF,fontSize:9,color:T.tx2,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:2}}>Central de</div>
    <div style={{fontFamily:SS,fontSize:28,color:T.white,marginBottom:6}}>Follow-up Inteligente</div>
    <div style={{fontFamily:SF,fontSize:12,color:T.tx2,marginBottom:26}}>
      {agent?<span>Mostrando leads de <b style={{color:agentColor(agent)}}>{agent}</b></span>:"Visão geral da equipe"}
    </div>
    {!vencidos.length&&!hoje.length&&!amanha.length&&!semCtt.length&&!frios.length&&(
      <div style={{textAlign:"center",padding:"60px",fontFamily:SS,
        fontSize:24,color:T.tx3,fontStyle:"italic"}}>
        Tudo em dia — nenhum follow-up pendente ✓
      </div>
    )}
    <Sec title="🔴 Atrasados — agir agora" items={vencidos} cor={T.red}/>
    <Sec title="🟡 Para hoje" items={hoje} cor={T.amber}/>
    <Sec title="🔵 Para amanhã" items={amanha} cor={T.blue}/>
    <Sec title="⚪ Sem contato realizado" items={semCtt} cor={T.tx2}/>
    <Sec title="❄️ Leads frios para reativar" items={frios.slice(0,6)} cor={T.blue}/>
  </div>
}

// ─── INTEGRAÇÕES ───────────────────────────────────────────────────────────────
function Integracoes({onImportFB}) {
  const fbQuestions=[
    {q:"1. Qual sua faixa de renda mensal?",opts:["Até R$ 10k","R$ 10k–20k","R$ 20k–50k","Acima de R$ 50k"]},
    {q:"2. Qual tipo de imóvel você busca?",opts:["Apartamento","Cobertura","Garden","Penthouse","Studio"]},
    {q:"3. Qual sua faixa de investimento?",opts:["Até R$ 800k","R$ 800k–1,5M","R$ 1,5M–3M","Acima de R$ 3M"]},
  ]
  return <div style={{padding:"26px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
    <div style={{fontFamily:SS,fontSize:28,color:T.white,marginBottom:24}}>Integrações</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      {/* Facebook */}
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,padding:"24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:44,height:44,borderRadius:12,background:"rgba(66,103,178,0.15)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>𝑓</div>
          <div>
            <div style={{fontFamily:SS,fontSize:20,color:T.white}}>Facebook Lead Ads</div>
            <div style={{fontFamily:SF,fontSize:11,color:T.tx2}}>formulário automático com 3 perguntas</div>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          {fbQuestions.map((fq,i)=>(
            <div key={i} style={{padding:"10px 14px",background:T.card2,borderRadius:9,
              border:`1px solid ${T.bd}`,marginBottom:8}}>
              <div style={{fontFamily:SF,fontSize:12,color:T.goldL,fontWeight:500,marginBottom:6}}>{fq.q}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {fq.opts.map(o=><span key={o} style={{padding:"3px 9px",borderRadius:20,
                  background:T.goldBg,fontFamily:SF,fontSize:10,color:T.tx2}}>{o}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 14px",background:"rgba(66,103,178,0.08)",borderRadius:9,
          border:"1px solid rgba(66,103,178,0.2)",marginBottom:12}}>
          <div style={{fontFamily:SF,fontSize:11,color:"#6090D0",marginBottom:3,fontWeight:500}}>Webhook URL</div>
          <div style={{fontFamily:"monospace",fontSize:11,color:T.white2,wordBreak:"break-all"}}>
            https://seu-crm.vercel.app/api/leads
          </div>
        </div>
        <button onClick={onImportFB} style={{width:"100%",padding:"10px",borderRadius:9,
          border:"none",background:"rgba(66,103,178,0.12)",color:"#7090D0",
          fontFamily:SF,fontSize:12,fontWeight:500,cursor:"pointer",
          border:"1px solid rgba(66,103,178,0.25)"}}>
          Simular entrada de lead Facebook
        </button>
      </div>
      {/* CSV */}
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,padding:"24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.greenBg,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:T.green}}>📊</div>
          <div>
            <div style={{fontFamily:SS,fontSize:20,color:T.white}}>Importar Planilha</div>
            <div style={{fontFamily:SF,fontSize:11,color:T.tx2}}>CSV ou Excel do Google Sheets</div>
          </div>
        </div>
        <div style={{fontFamily:SF,fontSize:12,color:T.white2,lineHeight:1.8,marginBottom:16}}>
          Exporte sua planilha do Google Sheets como <b style={{color:T.goldL}}>CSV</b> e importe aqui.<br/>
          Colunas reconhecidas: <span style={{color:T.goldL}}>nome, whatsapp, email, bairro, valor, tipo, origem, temperatura, etapa, obs</span>
        </div>
        <div style={{padding:"10px 14px",background:T.card2,borderRadius:9,
          border:`1px solid ${T.bd}`,marginBottom:12}}>
          <div style={{fontFamily:SF,fontSize:11,color:T.tx2,marginBottom:2}}>Como exportar</div>
          <div style={{fontFamily:SF,fontSize:11,color:T.white2,lineHeight:1.7}}>
            Google Sheets → Arquivo → Fazer download → CSV<br/>
            Depois use o botão "Importar CSV" no topo
          </div>
        </div>
        {["Meta Ads","Google Ads","WhatsApp API","RD Station"].map(int=>(
          <div key={int} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"8px 12px",background:T.card2,borderRadius:8,marginBottom:6,
            border:`1px solid ${T.bd}`}}>
            <span style={{fontFamily:SF,fontSize:12,color:T.white2}}>{int}</span>
            <span style={{fontFamily:SF,fontSize:10,color:T.goldL,padding:"2px 8px",
              borderRadius:20,background:T.goldBg}}>Preparado</span>
          </div>
        ))}
      </div>
    </div>
    {/* Webhook config */}
    <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:14,padding:"24px"}}>
      <div style={{fontFamily:SS,fontSize:20,color:T.white,marginBottom:16}}>Configuração do Webhook</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[
          {l:"Vercel URL",v:"https://crm-bruno.vercel.app/api/leads",cor:T.green},
          {l:"META_VERIFY_TOKEN",v:"bruno_almirante_2026",cor:T.gold},
          {l:"Z-API Instance",v:"Configurar em z-api.io",cor:T.blue},
        ].map((f,i)=>(
          <div key={i} style={{padding:"12px 14px",background:T.card2,borderRadius:9,border:`1px solid ${T.bd}`}}>
            <div style={{fontFamily:SF,fontSize:9,color:f.cor,letterSpacing:"0.1em",
              textTransform:"uppercase",marginBottom:5}}>{f.l}</div>
            <div style={{fontFamily:"monospace",fontSize:11,color:T.white2,wordBreak:"break-all"}}>{f.v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
}

// ─── DESCARTADOS ───────────────────────────────────────────────────────────────
function Descartados({leads,onRestore}) {
  const desc=leads.filter(l=>l.descartado)
  return <div style={{padding:"26px 32px",overflowY:"auto",height:"100%",boxSizing:"border-box"}}>
    <div style={{fontFamily:SS,fontSize:28,color:T.white,marginBottom:24}}>Descartados</div>
    {!desc.length&&<div style={{textAlign:"center",padding:"60px",fontFamily:SS,
      fontSize:22,color:T.tx3,fontStyle:"italic"}}>Nenhum cliente descartado</div>}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {desc.map(l=>(
        <div key={l.id} style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:11,
          padding:"14px 20px",display:"flex",alignItems:"center",gap:14,opacity:0.7}}>
          <Av nome={l.nome} size={36}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:SF,fontSize:13,color:T.white2,fontWeight:500}}>{l.nome}</div>
            <div style={{fontFamily:SF,fontSize:11,color:T.tx2}}>{l.regiao} · {l.valor} · {l.origem}</div>
          </div>
          <button onClick={()=>onRestore(l.id)} style={{padding:"7px 14px",borderRadius:8,
            border:`1px solid ${T.goldBd}`,background:T.goldBg,color:T.goldL,
            fontFamily:SF,fontSize:11,cursor:"pointer"}}>↩ Restaurar</button>
        </div>
      ))}
    </div>
  </div>
}

// ─── CSV IMPORT MODAL ──────────────────────────────────────────────────────────
function ModalCSV({onImport,onCancel}) {
  const [text,setText]=useState("")
  const [preview,setPreview]=useState([])

  function handleFile(f) {
    const r=new FileReader()
    r.onload=e=>{ setText(e.target.result); setPreview(parseCSV(e.target.result).slice(0,3)) }
    r.readAsText(f,"UTF-8")
  }

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:300,
    display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:T.card,border:`1px solid ${T.bd2}`,borderRadius:16,
      padding:"28px 32px",width:"100%",maxWidth:540}}>
      <div style={{fontFamily:SS,fontSize:24,color:T.white,marginBottom:8}}>Importar planilha CSV</div>
      <div style={{fontFamily:SF,fontSize:12,color:T.tx2,marginBottom:18,lineHeight:1.7}}>
        Exporte sua planilha do Google Sheets como CSV (Arquivo → Download → CSV).
        Colunas: <span style={{color:T.goldL}}>nome, whatsapp, email, bairro, valor, tipo, origem, temperatura, etapa, obs</span>
      </div>
      <div onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleFile(f)}}
        style={{border:`2px dashed ${T.goldBd}`,borderRadius:12,padding:"28px",
          textAlign:"center",marginBottom:14,cursor:"pointer",background:T.card2}}>
        <input type="file" accept=".csv,.txt" onChange={e=>{if(e.target.files[0])handleFile(e.target.files[0])}}
          style={{position:"absolute",opacity:0,pointerEvents:"none"}}
          id="csvf"/>
        <label htmlFor="csvf" style={{cursor:"pointer"}}>
          <div style={{fontFamily:SF,fontSize:28,color:T.tx2,marginBottom:8}}>📎</div>
          <div style={{fontFamily:SF,fontSize:13,color:T.white2}}>Arraste o arquivo CSV aqui ou clique para selecionar</div>
        </label>
      </div>
      {preview.length>0&&<div style={{background:T.bg3,borderRadius:9,padding:"10px 14px",marginBottom:14}}>
        <div style={{fontFamily:SF,fontSize:10,color:T.goldL,marginBottom:6,fontWeight:500}}>Pré-visualização</div>
        {preview.map((l,i)=><div key={i} style={{fontFamily:SF,fontSize:11,color:T.white2,marginBottom:3}}>
          {l.nome} · {l.regiao} · {l.valor}
        </div>)}
      </div>}
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>{if(text)onImport(parseCSV(text))}} style={{flex:1,padding:"10px",borderRadius:9,
          border:"none",background:T.goldBg,color:T.goldL,fontFamily:SF,fontSize:13,
          fontWeight:600,cursor:"pointer",border:`1px solid ${T.goldBd}`}}>
          Importar {preview.length>0?`(${parseCSV(text).length} leads)`:""}
        </button>
        <button onClick={onCancel} style={{flex:1,padding:"10px",borderRadius:9,
          border:`1px solid ${T.bd}`,background:"transparent",
          color:T.white2,fontFamily:SF,fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  </div>
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  useFont()
  const [view,setView]     = useState("dashboard")
  const [leads,setLeads]   = useState(LEADS_INIT)
  const [agent,setAgent]   = useState(null)
  const [selected,setSel]  = useState(null)
  const [modal,setModal]   = useState(null) // "new"|"csv"|"descarte"|"transfer"
  const [modalLead,setML]  = useState(null)

  const active   = leads.filter(l=>!l.descartado)
  const pool     = active.filter(l=>!l.assignedTo).length
  const meusCli  = agent ? active.filter(l=>l.assignedTo===agent) : active
  const followCt = (agent?meusCli:active).filter(l=>l.proximo==="atrasado"||l.proximo==="hoje").length

  function updateLead(id,patch) {
    setLeads(p=>p.map(l=>l.id===id?{...l,...patch}:l))
    setSel(p=>p&&p.id===id?{...p,...patch}:p)
  }

  function claimLead(id) {
    if(!agent){alert("Selecione seu perfil na barra lateral primeiro.");return}
    updateLead(id,{assignedTo:agent,
      historico:[{data:now(),tipo:"entrada",txt:`Lead aceito por ${agent} via pool.`},
        ...(leads.find(l=>l.id===id)?.historico||[])]})
  }

  function discardLead(id) {
    updateLead(id,{descartado:true,assignedTo:null,etapa:"Perdido"})
    setSel(null)
    setModal(null)
  }

  function restoreLead(id) {
    updateLead(id,{descartado:false})
  }

  function transferLead(id,dest) {
    updateLead(id,{assignedTo:dest,
      historico:[{data:now(),tipo:"entrada",txt:`Transferido para ${dest}.`},
        ...(leads.find(l=>l.id===id)?.historico||[])]})
    setModal(null)
  }

  function addLead(l) {
    setLeads(p=>[l,...p])
    setModal(null)
  }

  function importLeads(newLeads) {
    setLeads(p=>[...newLeads,...p])
    setModal(null)
  }

  function simulateFB() {
    const fakeNames=["Carlos Souza","Patrícia Lima","Marcos Ferreira","Beatriz Oliveira","Rodrigo Nunes"]
    const n=fakeNames[Math.floor(Math.random()*fakeNames.length)]
    const l={
      id:nextId(),nome:n,wa:`11 9${Math.floor(Math.random()*9000+1000)}-${Math.floor(Math.random()*9000+1000)}`,
      email:`${n.toLowerCase().split(" ")[0]}@gmail.com`,ig:"",
      regiao:BAIRROS[Math.floor(Math.random()*8)],
      valor:["R$ 800k","R$ 1,2M","R$ 1,8M","R$ 2,5M","R$ 3,5M"][Math.floor(Math.random()*5)],
      tipo:"Apartamento",dorms:"2",
      origem:"Facebook Lead Ads",temp:"Morno",etapa:"Novo Lead",
      assignedTo:null,descartado:false,
      renda:["R$ 10k–20k/mês","R$ 20k–50k/mês","Acima de R$ 50k/mês"][Math.floor(Math.random()*3)],
      obs:`Lead via Facebook Ads. Renda informada: ${["R$ 20k–50k/mês","Acima de R$ 50k/mês"][Math.floor(Math.random()*2)]}. Interesse confirmado no formulário.`,
      historico:[{data:now(),tipo:"entrada",txt:"Lead captado via Facebook Lead Ads."}],
      criadoEm:new Date().toISOString(),ultimoContato:"",proximo:"hoje",investimento:false,
    }
    setLeads(p=>[l,...p])
    alert(`✅ Lead "${n}" adicionado ao pool via Facebook!`)
  }

  const poolLeads = active.filter(l=>!l.assignedTo)
  const viewLeads = view==="pool" ? poolLeads : view==="meusCli" ? (agent?active.filter(l=>l.assignedTo===agent):active) : []

  return (
    <div style={{display:"flex",height:"100vh",background:T.bg,overflow:"hidden",
      fontFamily:SF,color:T.white}}>
      <Sidebar view={view} setView={setView} agent={agent} setAgent={setAgent}
        followCount={followCt} pool={pool}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <TopBar view={view} agent={agent}
          onNew={()=>setModal("new")}
          onImport={()=>setModal("csv")}/>
        <div style={{flex:1,overflow:"hidden"}}>
          {view==="dashboard"  &&<Dashboard leads={leads} agent={agent}/>}
          {(view==="pool"||view==="meusCli")&&(
            <LeadList leads={viewLeads} agent={agent}
              isPool={view==="pool"} onSelect={l=>{setSel(l);setML(l)}}
              onClaim={claimLead} onUpdate={updateLead}/>
          )}
          {view==="funil"&&<Funil leads={leads} onUpdate={(id,p)=>updateLead(id,p)}/>}
          {view==="followup"&&<FollowUp leads={leads} agent={agent} onUpdate={updateLead}/>}
          {view==="integracao"&&<Integracoes onImportFB={simulateFB}/>}
          {view==="descartados"&&<Descartados leads={leads} onRestore={restoreLead}/>}
        </div>
      </div>

      {/* Detail Panel */}
      {selected&&<DetailPanel lead={selected} agent={agent} onClose={()=>setSel(null)}
        onUpdate={updateLead}
        onDiscard={()=>setModal("descarte")}
        onTransfer={()=>setModal("transfer")}
        onClaim={claimLead}/>}

      {/* Modals */}
      {modal==="new"&&<ModalNovoLead agent={agent} onSave={addLead} onCancel={()=>setModal(null)}/>}
      {modal==="csv"&&<ModalCSV onImport={importLeads} onCancel={()=>setModal(null)}/>}
      {modal==="descarte"&&selected&&<ModalDescarte lead={selected}
        onConfirm={()=>discardLead(selected.id)} onCancel={()=>setModal(null)}/>}
      {modal==="transfer"&&selected&&<ModalTransfer lead={selected}
        onConfirm={(dest)=>transferLead(selected.id,dest)} onCancel={()=>setModal(null)}/>}
    </div>
  )
}
