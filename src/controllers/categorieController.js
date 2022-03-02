import connection from "../database.js";

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(
      "SELECT * FROM categorias "
    );

    res.send(categories);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function postCategorie(req, res) {
  const categorie = req.body;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await connection.query(
      "SELECT * FROM sessoes WHERE token=$1",
      [token]
    );
    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }
    await db.connection("INSERT INTO categorias (nome) VALUES ($1)", [
      categorie.nome,
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateCategorie(req, res) {
  const { id } = req.params;
  const name = req.body.nome;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await connection.query(
      "SELECT * FROM sessoes WHERE token=$1",
      [token]
    );
    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }

    await connection.query("UPDATE categorias SET nome=$1 WHERE id =$2", [
      name,
      id,
    ]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteCategorie(req, res) {
  const { id } = req.params;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await connection.query(
      "SELECT * FROM sessoes WHERE token=$1",
      [token]
    );
    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }

    await connection.query("DELETE FROM categorias where id = $1", [id]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
