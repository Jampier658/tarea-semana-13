const { pool } = require("../config/database")

const listarClientes = async (req, res) => {
  try {
    const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY id')
    res.status(200).json({ ok: true, total: clientes.length, data: clientes })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const obtenerCliente = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const [registro] = await pool.execute(`SELECT * FROM clientes WHERE id = ?`, [id])
    if (registro.length === 0) return res.status(404).json({ ok: false, message: 'Cliente no encontrado' })
    res.status(200).json({ ok: true, data: registro[0] })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const crearCliente = async (req, res) => {
  try {
    const { apellidos, nombres, telefono, direccion, email } = req.body
    const [registro] = await pool.execute(
      `INSERT INTO clientes(apellidos, nombres, telefono, direccion, email) VALUES(?,?,?,?,?)`,
      [apellidos, nombres, telefono, direccion, email]
    )
    res.status(201).json({ ok: true, id: registro.insertId })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const actualizarCliente = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { apellidos, nombres, telefono, direccion, email } = req.body
    const [resultado] = await pool.execute(
      'UPDATE clientes SET apellidos=?, nombres=?, telefono=?, direccion=?, email=? WHERE id=?',
      [apellidos, nombres, telefono, direccion, email, id]
    )
    res.status(200).json({ ok: true, filasAfectadas: resultado.affectedRows })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const eliminarCliente = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const [resultado] = await pool.execute('DELETE FROM clientes WHERE id = ?', [id])
    res.status(200).json({ ok: true, message: 'Cliente eliminado' })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

module.exports = { listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente }