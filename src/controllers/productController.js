import connection from "../database.js";

export async function getProducts(req, res) {
  try {
    const { rows: products } = await connection.query(
      "SELECT * FROM produtos "
    );

    res.send(products);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function postProduct(req, res) {
  const product = req.body;
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
    const userId = session.rows[0].idUsuario;

    await db.connection(
      'INSERT INTO produtos (nome, preco, "idUsuario") VALUES ($1, $2, $3)',
      [product.nome, product.preco, userId]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const price = req.body.preco;
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

    await connection.query("UPDATE produtos SET preco=$1 WHERE id =$2", [
      price,
      id,
    ]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteProduct(req, res) {
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

    await connection.query("DELETE FROM produtos where id = $1", [id]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
