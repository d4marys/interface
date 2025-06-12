// backend/server.js
import express from "express";
import path from "path";
import Database from "./database.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// Rotas da API
app.get("/api/dialogos", async (req, res) => {
  try {
    const dialogos = await db.getDialogosFromDb();
    res.json(dialogos);
  } catch (error) {
    console.error("Erro na rota /api/dialogos:", error);
    res.status(500).json({ error: "Erro ao buscar diálogos." });
  }
});

app.post("/api/personagem/criar", async (req, res) => {
  try {
    const { nome, ocupacao, vida, armadura, velocidade, dinheiro, reputacao } = req.body;
    const personagemId = await db.criarPersonagem(
      nome,
      ocupacao,
      vida,
      armadura,
      velocidade,
      dinheiro,
      reputacao
    );
    res.status(201).json({ message: "Personagem criado com sucesso!", id: personagemId });
  } catch (error) {
    console.error("Erro na rota /api/personagem/criar:", error);
    res.status(500).json({ error: "Erro ao criar personagem." });
  }
});

// Iniciar o servidor
async function startServer() {
  try {
    await db.connect();
    console.log("Banco de dados pronto para uso.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

startServer();
