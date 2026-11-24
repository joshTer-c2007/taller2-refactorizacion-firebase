import { useState, useEffect } from 'react'
import { crearProducto, actualizarProducto, type Producto } from '../services/productoService'

interface Props {
  productoSeleccionado: Producto | null
  onProductoGuardado: () => void
  onCancelarEdicion: () => void
}

export function ProductoForm({
  productoSeleccionado,
  onProductoGuardado,
  onCancelarEdicion,
}: Props) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    if (productoSeleccionado) {
      setNombre(productoSeleccionado.nombre)
      setPrecio(String(productoSeleccionado.precio))
      setStock(String(productoSeleccionado.stock))
    } else {
      setNombre('')
      setPrecio('')
      setStock('')
    }
  }, [productoSeleccionado])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGuardando(true)

    try {
      const nombreLimpio = nombre.trim()
      const precioNum = Number(precio)
      const stockNum = Number(stock)

      if (productoSeleccionado) {
        await actualizarProducto(
          productoSeleccionado.id,
          nombreLimpio,
          precioNum,
          stockNum
        )
      } else {
        await crearProducto(nombreLimpio, precioNum, stockNum)
      }

      setNombre('')
      setPrecio('')
      setStock('')
      onProductoGuardado()
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      <h2>{productoSeleccionado ? 'Editar Producto (UPDATE)' : 'Nuevo Producto (CREATE)'}</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        min="0"
        step="any"
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        min="0"
        required
      />

      <button type="submit" disabled={guardando}>
        {guardando
          ? 'Guardando...'
          : productoSeleccionado
          ? 'Actualizar'
          : 'Crear'}
      </button>

      {productoSeleccionado && (
        <button type="button" onClick={onCancelarEdicion} disabled={guardando}>
          Cancelar
        </button>
      )}
    </form>
  )
}