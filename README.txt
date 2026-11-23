IA RR — pacote inicial

O que está pronto:
- Interface futurista responsiva para celular.
- Chat interativo.
- Backend Node.js que consulta a API oficial da OpenAI.
- Chave da API lida somente no servidor (nunca no HTML).

Para executar/publicar:
1. Publique esta pasta em um serviço de hospedagem que execute Node.js.
2. Configure a variável secreta OPENAI_API_KEY no painel da hospedagem.
3. Opcional: configure OPENAI_MODEL (padrão: gpt-4.1-mini).
4. Comando de inicialização: npm start

Importante:
- Não coloque a chave no index.html, nem a envie em mensagens.
- A API pode gerar cobranças separadas da assinatura do ChatGPT.
- Abrir apenas o index.html localmente mostra a interface, mas não ativa a IA.
- O projeto ainda não está hospedado; é necessário concluir a publicação para ter um link público.
