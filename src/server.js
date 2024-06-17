// const admin = require("firebase-admin");
// const bodyParser = require("body-parser");
// const moment = require("moment");

// const express = require("express");
// const app = express();
// const serviceAccount = require("./services/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const home = (req, res) => {
//   res.send("Bem vindo ao smartclamps backend");
// };

// const listarUsuarios = async (req, res) => {
//   try {
//     const usuariosRef = db.collection("professionals");
//     const snapshot = await usuariosRef.get();
//     const usuarios = [];
//     snapshot.forEach((doc) => {
//       usuarios.push({ id: doc.id, ...doc.data() }); // Incluir o ID do documento
//     });
//     res.send(usuarios);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Erro ao listar usuários");
//   }
// };

// const cadastrarUsuario = (req, res) => {
//   res.sendFile("./pages/Register/cadastro", { root: __dirname });
// };

// const cadastrarUsuarioPost = async (req, res) => {
//     try {
//       const { id, full_name, email, cpf, class_council, sector, specialization, password } = req.body;
//       const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
//       await db.collection("professionals").add({
//         id: id,  // Adicionando id
//         full_name: full_name,
//         email: email,
//         cpf: cpf,
//         class_council: class_council,
//         sector: sector,
//         specialization: specialization,
//         registration_date: timestamp, // Corrigido para ser registration_date
//       });
//       console.log("Usuário cadastrado com sucesso!");
//       res.redirect("/cadastro");
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Erro ao cadastrar usuário");
//     }
//   };

// const buscarUsuario = (req, res) => {
//   res.sendFile("./front-mock-pages/find.html", { root: __dirname });
// };

// const buscarUsuarioPost = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const userRef = db.collection("usuarios").doc(userId);
//     const doc = await userRef.get();

//     if (!doc.exists) {
//       res.status(404).send("Usuário não encontrado");
//       return;
//     }
//     console.log("Usuário: " + doc.id + " encontrado.");
//     res.redirect(`/atualizar/${userId}`);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Não foi possível encontrar o(a) usuário(a) solicitado(a).");
//   }
// };

// const atualizarUsuario = (req, res) => {
//   const userId = req.params.userId;
//   res.sendFile("./front-mock-pages/att.html", { root: __dirname, userId: userId }); // Passar userId como uma variável
// };

// const atualizarUsuarioPost = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const novoNome = req.body.nome;
//     const novaProfissao = req.body.profissao;
//     const userRef = db.collection("usuarios").doc(userId);
//     await userRef.update(
//       {
//         name: novoNome,
//         job: novaProfissao,
        
//       }),
//     console.log("Informações do(a) usuário(a) atualizadas com sucesso!");
//     res.redirect("/usuarios") // Redirecionar após atualização
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Erro ao atualizar as informações do(a) usuário(a)");
//   }
// };

// const deletarUsuario = (req, res) => {
//   res.sendFile("./front-mock-pages/delete.html", { root: __dirname });
// }

// const deletarUsuarioGet = async (req, res) =>  {
//   try {
//     const userId = req.body.userId;
//     const userRef = db.collection("usuarios").doc(userId);
//     await userRef.delete();
//     console.log("Usuário deletado com sucesso!");
//     res.redirect("/usuarios");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Erro ao deletar o usuário");
//   }
// }

// app.get("/", home);
// app.get("/usuarios", listarUsuarios);
// app.get("/cadastrar", cadastrarUsuario);
// app.post("/cadastrar", cadastrarUsuarioPost);
// app.get("/buscar", buscarUsuario);
// app.post("/buscar", buscarUsuarioPost);
// app.get("/atualizar/:userId", atualizarUsuario);
// app.post("/atualizar", atualizarUsuarioPost);
// app.get("/deletar", deletarUsuario);
// app.post("/deletar", deletarUsuarioGet);

// app.listen(8080, () => {
//   console.log("Servidor up");
// });