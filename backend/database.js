// database.js (modo ES Module)
import mysql from "mysql2/promise";

export default class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    console.log("Conectando ao MySQL...");
    try {
      this.connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "2207",
        database: "test",
      });
      console.log("Conectado ao MySQL. ID: " + this.connection.threadId);

      await this._createTables();
      await this._insertInitialFixedData();

      console.log("Estrutura do banco de dados e dados iniciais verificados/inseridos.");
    } catch (err) {
      console.error("Erro ao conectar ou inicializar o banco de dados:", err);
      throw err;
    }
  }

  async _createTables() {
    const createDialogosTable = `
      CREATE TABLE IF NOT EXISTS dialogos (
        id_dialogo INT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        fala TEXT NOT NULL
      );
    `;
    await this.connection.query(createDialogosTable);
    console.log("Tabela 'dialogos' verificada/criada.");

    const createPersonagemTable = `
      CREATE TABLE IF NOT EXISTS personagem (
        id_personagem INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        vida INT NOT NULL,
        dinheiro INT NOT NULL,
        ocupacao VARCHAR(255) NOT NULL,
        armadura INT NOT NULL,
        velocidade INT NOT NULL,
        reputacao INT NOT NULL,
        personagem_tipo VARCHAR(255) NOT NULL,
        fk_id_item INT,
        fk_id_habilidade1 INT,
        fk_id_habilidade2 INT
      );
    `;
    await this.connection.query(createPersonagemTable);
    console.log("Tabela 'personagem' verificada/criada.");
  }

  async _insertInitialFixedData() {
    const dialogosData = [
      {
        id_dialogo: 1,
        nome: "Narrador",
        fala: "Bem-vindo ao sertão. Uma terra de desafios e lendas.",
      },
      {
        id_dialogo: 2,
        nome: "Narrador",
        fala: "Sua jornada começa agora. Prepare-se para o inesperado.",
      },
      {
        id_dialogo: 3,
        nome: "Mentor",
        fala: "Para sobreviver aqui, você precisará de coragem e astúcia.",
      },
      {
        id_dialogo: 4,
        nome: "Coronel",
        fala: "A joia da família foi roubada! Traga-a de volta!",
      },
      {
        id_dialogo: 5,
        nome: "Narrador",
        fala: "Você parte em busca da joia, seguindo rastros na Caatinga.",
      },
      {
        id_dialogo: 6,
        nome: "Bandido",
        fala: "Essa joia é nossa agora, forasteiro!",
      },
      {
        id_dialogo: 7,
        nome: "Narrador",
        fala: "Você derrota o bandido e recupera a joia.",
      },
      {
        id_dialogo: 8,
        nome: "Coronel",
        fala: "Excelente trabalho! O sertão precisa de mais como você.",
      },
      {
        id_dialogo: 9,
        nome: "Narrador",
        fala: "Rumores de problemas na vila chegam aos seus ouvidos.",
      },
      {
        id_dialogo: 10,
        nome: "Morador",
        fala: "Minha filha foi levada! Por favor, ajude-nos!",
      },
      {
        id_dialogo: 11,
        nome: "Narrador",
        fala: "Você segue para a vila, determinado a resgatar a jovem.",
      },
      {
        id_dialogo: 12,
        nome: "Volante",
        fala: "Ninguém interfere nos negócios do Volante!",
      },
      {
        id_dialogo: 13,
        nome: "Narrador",
        fala: "Após uma intensa batalha, você resgata a jovem.",
      },
      {
        id_dialogo: 14,
        nome: "Jovem Resgatada",
        fala: "Muito obrigada! Você salvou minha vida!",
      },
      {
        id_dialogo: 15,
        nome: "Narrador",
        fala: "A cidade grande se mostra um lugar perigoso.",
      },
      {
        id_dialogo: 16,
        nome: "Narrador",
        fala: "Você descobre que um grupo de bandidos aterroriza a cidade.",
      },
      {
        id_dialogo: 17,
        nome: "Bandido",
        fala: "Este é o nosso território, forasteiro!",
      },
      {
        id_dialogo: 18,
        nome: "Narrador",
        fala: "Você enfrenta os bandidos em um confronto épico.",
      },
      {
        id_dialogo: 19,
        nome: "Narrador",
        fala: "A luta continua pelas ruas da cidade.",
      },
      {
        id_dialogo: 20,
        nome: "Narrador",
        fala: "A luta se intensifica nas ruas da cidade.",
      },
      {
        id_dialogo: 21,
        nome: "Bandido",
        fala: "Esse é o fim da linha pra você!",
      },
      {
        id_dialogo: 22,
        nome: "Narrador",
        fala: "Você vence mais uma batalha e continua sua jornada.",
      },
      {
        id_dialogo: 23,
        nome: "Narrador",
        fala: "A cidade agora conhece seu nome. Um herói ou um fora da lei?",
      },
      {
        id_dialogo: 24,
        nome: "Morador",
        fala: "Obrigado por nos livrar daqueles bandidos!",
      },
      {
        id_dialogo: 25,
        nome: "Narrador",
        fala: "Você se aproxima da fazenda do último inimigo.",
      },
      {
        id_dialogo: 26,
        nome: "Zerufino",
        fala: "Não pense que vai sair vivo dessa!",
      },
      {
        id_dialogo: 27,
        nome: "Narrador",
        fala: "O duelo final está prestes a começar.",
      },
      {
        id_dialogo: 28,
        nome: "Narrador",
        fala: "Zerufino cai ao chão. A paz retorna ao sertão.",
      },
      {
        id_dialogo: 29,
        nome: "Narrador",
        fala: "Lampião aparece de repente! Ele te oferece ajuda.",
      },
      {
        id_dialogo: 30,
        nome: "Lampião",
        fala: "Preciso de um cabra valente para uma missão. Topa?",
      },
      {
        id_dialogo: 31,
        nome: "Narrador",
        fala: "Você escolhe se juntar a Lampião.",
      },
      {
        id_dialogo: 32,
        nome: "Lampião",
        fala: "Vamos mostrar a eles quem manda no sertão!",
      },
      {
        id_dialogo: 33,
        nome: "Narrador",
        fala: "Você escolhe não se juntar a Lampião.",
      },
      {
        id_dialogo: 34,
        nome: "Lampião",
        fala: "Pense bem, essa é uma oportunidade única. A gente se vê por aí.",
      },
      {
        id_dialogo: 35,
        nome: "Narrador",
        fala: "Você encontra Francisco Teixeira, um velho inimigo.",
      },
      {
        id_dialogo: 36,
        nome: "Francisco Teixeira",
        fala: "Finalmente nos encontramos, forasteiro. Prepare-se para morrer!",
      },
      {
        id_dialogo: 37,
        nome: "Narrador",
        fala: "O duelo contra Francisco Teixeira é brutal e intenso.",
      },
      {
        id_dialogo: 38,
        nome: "Narrador",
        fala: "Você sai vitorioso da batalha, deixando Francisco Teixeira para trás.",
      },
      {
        id_dialogo: 39,
        nome: "Narrador",
        fala: "O Volante e seus capangas estão causando problemas na vila.",
      },
      {
        id_dialogo: 40,
        nome: "Volante",
        fala: "Esta vila é nossa agora! Ninguém vai nos impedir!",
      },
      {
        id_dialogo: 41,
        nome: "Narrador",
        fala: "Você enfrenta o Volante e seus homens em um confronto sangrento.",
      },
      {
        id_dialogo: 42,
        nome: "Narrador",
        fala: "A vila é libertada do domínio do Volante.",
      },
      {
        id_dialogo: 43,
        nome: "Narrador",
        fala: "Bandidos aterrorizam a cidade grande.",
      },
      {
        id_dialogo: 44,
        nome: "Narrador",
        fala: "Você decide intervir e ajudar os moradores.",
      },
      {
        id_dialogo: 45,
        nome: "Bandido",
        fala: "Quem é você para se meter em nossos assuntos?",
      },
      {
        id_dialogo: 46,
        nome: "Narrador",
        fala: "Uma série de combates se inicia pelas ruas e vielas.",
      },
      {
        id_dialogo: 47,
        nome: "Narrador",
        fala: "Você enfrenta os últimos bandidos, encerrando a ameaça.",
      },
      {
        id_dialogo: 48,
        nome: "Narrador",
        fala: "Zerufino, o inimigo final, espera por você em sua fazenda.",
      },
      {
        id_dialogo: 49,
        nome: "Zerufino",
        fala: "Vejo que chegou até aqui. Mas este é o seu fim!",
      },
      {
        id_dialogo: 50,
        nome: "Narrador",
        fala: "O confronto final entre você e Zerufino começa agora.",
      },
      {
        id_dialogo: 51,
        nome: "Narrador",
        fala: "Com um último golpe, Zerufino é derrotado. A paz é restaurada.",
      },
      {
        id_dialogo: 52,
        nome: "Narrador",
        fala: "Você entra na venda, o lugar perfeito para se reabastecer.",
      },
      {
        id_dialogo: 53,
        nome: "Narrador",
        fala: "O mercador te recebe com um sorriso. O que deseja comprar?",
      },
      {
        id_dialogo: 54,
        nome: "Narrador",
        fala: "Você decide não comprar nada e sai da venda.",
      },
      {
        id_dialogo: 55,
        nome: "Narrador",
        fala: "Você se sente revigorado e pronto para a próxima aventura.",
      },
    ];

    for (const d of dialogosData) {
      await this.connection.query(
        `INSERT IGNORE INTO dialogos (id_dialogo, nome, fala) VALUES (?, ?, ?)`,
        [d.id_dialogo, d.nome, d.fala]
      );
    }
  }

  async getDialogosFromDb() {
    const [rows] = await this.connection.query("SELECT * FROM dialogos");
    return rows;
  }

  async criarPersonagem(
    nome,
    ocupacao,
    vida,
    armadura,
    velocidade,
    dinheiro,
    reputacao
  ) {
    const sql = `
      INSERT INTO personagem (nome, vida, dinheiro, ocupacao, armadura, velocidade, reputacao, personagem_tipo)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'jogador')
    `;
    const [result] = await this.connection.query(sql, [
      nome,
      vida,
      dinheiro,
      ocupacao,
      armadura,
      velocidade,
      reputacao,
    ]);
    return result.insertId;
  }
}

export{Database}
