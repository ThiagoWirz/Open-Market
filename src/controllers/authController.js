import bcrypt from "bcrypt";
import connection from "../database.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const user = req.body;

  const sameEmail = await connection.query(
    "SELECT id FROM usuarios WHERE email=$1",
    [user.email]
  );
  if (sameEmail.rowCount > 0) {
    return res.sendStatus(401);
  }

  const hashPassword = bcrypt.hashSync(user.senha, 10);
  try {
    await connection.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [user.nome, user.email, hashPassword]
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, senha } = req.body;

  try {
    const user = await connection.query(
      "SELECT id FROM usuarios WHERE email=$1",
      [email]
    );
    if (user.rowCount === 0) {
      return res.sendStatus(404);
    }
    const name = user.rows[0].nome;
    if (bcrypt.compareSync(senha, user.senha)) {
      const token = uuid();
      await connection.query(
        'INSERT INTO sessoes ("idUsuario", token) VALUES ($1, $2)',
        [user.rows[0].id, token]
      );
      res.send({ name, email, token });
      return;
    }
    res.sendStatus(401);
  } catch {
    res.sendStatus(500);
  }
}
