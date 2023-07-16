const express = require('express');
const app = express();

// Rota de health check
app.get('/health', (req, res) => {
  res.send('OK');
});

// ... outras configurações e rotas do seu aplicativo

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
