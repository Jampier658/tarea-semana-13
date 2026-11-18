const { Router } = require('express')
const router = Router()

// Importar las rutas de cada entidad
const productoRoutes = require('./producto.routes')
const clienteRoutes = require('./cliente.routes')
const proveedorRoutes = require('./proveedor.routes')

// Asignar las rutas al enrutador principal
router.use('/productos', productoRoutes)
router.use('/clientes', clienteRoutes)
router.use('/proveedores', proveedorRoutes)

module.exports = router