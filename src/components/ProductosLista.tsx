import { useEffect, useState } from 'react'
import {
  escucharProductos,
  eliminarProducto,
  type Producto
} from '../services/productoService'

interface Props {
  onEdit?: (producto: Producto) => void
  refreshKey?: number
}

export function ProductoLista({ onEdit }: Props) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)

  useEffect(() => {
    setCargando(true)
    setError('')

    const unsubscribe = escucharProductos(
      (data) => {
        setProductos(data)
        setCargando(false)
      },
      () => {
        setError('No se pudieron sincronizar los productos.')
        setCargando(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const handleEliminar = async (id: string) => {
    try {
      setEliminandoId(id)
      await eliminarProducto(id)
    } catch (err) {
      console.error('Error al eliminar producto:', err)
      setError('No se pudo eliminar el producto.')
    } finally {
      setEliminandoId(null)
    }
  }

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => onEdit && onEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEliminar(producto.id)}
                    disabled={eliminandoId === producto.id}
                  >
                    {eliminandoId === producto.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}