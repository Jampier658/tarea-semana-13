const { pool } = require("../config/database")

const listarProveedores = async (req, res) => {
  try {
    const [proveedores] = await pool.query('SELECT * FROM proveedores ORDER BY id')
    res.status(200).json({ ok: true, total: proveedores.length, data: proveedores })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const obtenerProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const [registro] = await pool.execute(`SELECT * FROM proveedores WHERE id = ?`, [id])
    if (registro.length === 0) return res.status(404).json({ ok: false, message: 'Proveedor no encontrado' })
    res.status(200).json({ ok: true, data: registro[0] })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const crearProveedor = async (req, res) => {
  try {
    const { razonsocial, contacto, ruc, direccion } = req.body
    const [registro] = await pool.execute(
      `INSERT INTO proveedores(razonsocial, contacto, ruc, direccion) VALUES(?,?,?,?)`,
      [razonsocial, contacto, ruc, direccion]
    )
    res.status(201).json({ ok: true, id: registro.insertId })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const actualizarProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { razonsocial, contacto, ruc, direccion } = req.body
    const [resultado] = await pool.execute(
      'UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, direccion=? WHERE id=?',
      [razonsocial, contacto, ruc, direccion, id]
    )
    res.status(200).json({ ok: true, filasAfectadas: resultado.affectedRows })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

const eliminarProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const [resultado] = await pool.execute('DELETE FROM proveedores WHERE id = ?', [id])
    res.status(200).json({ ok: true, message: 'Proveedor eliminado' })
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "Error en el servidor" })
  }
}

module.exports = { listarProveedores, obtenerProveedor, crearProveedor, actualizarProveedor, eliminarProveedor }