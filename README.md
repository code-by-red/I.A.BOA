# I A BOA?

Site de listagem de eventos com estética Cyberpunk/Brutalista voltada para o público jovem.

## 🚀 Tecnologias

- HTML5
- CSS3 (Tailwind CSS via CDN)
- JavaScript puro
- Google Apps Script (integração com Google Sheets)

## 📦 Instalação

1. Clone o repositório
2. Copie o arquivo `config.example.js` e renomeie para `config.js`
3. Substitua `SUA_URL_DO_APP_SCRIPT_AQUI` pela URL do seu Google Apps Script
4. Abra o `index.html` no navegador

## 🔧 Configuração do Google Apps Script

Para configurar a integração com Google Sheets:

1. Crie uma planilha no Google Sheets
2. Crie um Google Apps Script vinculado à planilha
3. Configure o script para receber requisições POST e GET
4. Publique o script como Web App
5. Copie a URL gerada e cole no `config.js`

## 📁 Estrutura do Projeto

```
IABOA/
├── index.html          # Estrutura HTML
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
├── config.js           # Configurações (NÃO commitar)
├── config.example.js   # Template para config.js
├── .env                # Variáveis de ambiente (NÃO commitar)
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Documentação
```

## 🌐 Deploy no Vercel

1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático

## ⚠️ Importante

- **NÃO** faça commit do arquivo `config.js`
- **NÃO** faça commit do arquivo `.env`
- Use `config.example.js` como template
- Mantenha suas credenciais e URLs sensíveis privadas
