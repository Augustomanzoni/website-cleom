# Conectar formulários ao Formspree

## Objetivo
Fazer os formulários do site enviarem os dados de verdade para o e-mail da CLEOM usando o Formspree, sem precisar de servidor próprio.

## O que você precisa fazer antes (5 minutos)
1. Criar uma conta gratuita em https://formspree.io com o e-mail comercial@cleom.ind.br
2. Criar **dois formulários** no painel do Formspree:
   - **Contato** — para a página de Contato
   - **Catálogo** — para a solicitação de catálogos
3. Copiar o ID de cada formulário (formato `xabcdwyz`, que aparece na URL do endpoint)
4. Me enviar os dois IDs aqui no chat (eles não são secretos, é como um endereço público de recebimento)

## O que será implementado
1. **Formulário de Contato** (`src/routes/contato.tsx`)
   - Envio via POST para `https://formspree.io/f/{ID}`
   - Estados de envio: enviando → sucesso / erro
   - Campos enviados: nome, e-mail, telefone, empresa, mensagem

2. **Formulário de Catálogo** (`src/components/site/CatalogDownloadSection.tsx`)
   - Mesmo fluxo de envio
   - Campos: nome, e-mail, telefone + qual catálogo foi solicitado
   - Remove a mensagem atual de "envio desativado"

3. **Textos nos 3 idiomas** (PT/EN/ES) para:
   - Botão "Enviando..."
   - Mensagem de sucesso
   - Mensagem de erro

## Detalhes técnicos
- Envio via `fetch` com `FormData` e cabeçalho `Accept: application/json`
- IDs dos formulários ficam em um arquivo de configuração (`src/lib/formspree.ts`) — são públicos por natureza
- Sem dependências novas; nada é salvo em banco de dados
- Plano gratuito do Formspree permite 50 envios/mês por formulário

## Validação
- Envio de teste nos dois formulários no preview
- Verificação dos textos nos 3 idiomas
