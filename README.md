# CRM Bruno Almirante

Projeto React + Vite pronto para deploy na Vercel.

## Deploy na Vercel

1. Suba todos estes arquivos no GitHub.
2. Na Vercel, clique em Import no repositório.
3. Framework Preset: Vite.
4. Build Command: npm run build.
5. Output Directory: dist.
6. Em Settings > Environment Variables, configure as variáveis do .env.example.

## API webhook

O arquivo `api/leads.js` cria a rota:

`https://seu-projeto.vercel.app/api/leads`

Use essa URL no Meta/Make/Zapier para receber leads.
