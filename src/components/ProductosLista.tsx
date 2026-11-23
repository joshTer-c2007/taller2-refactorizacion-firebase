import { useEffect, useState } from 'react'
import { obtenerProductos, type Producto } from '../services/productoService'

interface ProductosListaProps {
  refreshKey?: number
}

export function ProductosLista({ refreshKey = 0 }: ProductosListaProps) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true)
      setError('')
      try {
        const data = await obtenerProductos()
        setProductos(data)
      } catch (err) {
        console.error('Error al obtener productos: ', err)
        setError('No se pudieron cargar los productos.')
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [refreshKey])

  if (cargando) {
    return (
      <div className="lista-seccion">
        <p>Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lista-seccion">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="lista-seccion">
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}