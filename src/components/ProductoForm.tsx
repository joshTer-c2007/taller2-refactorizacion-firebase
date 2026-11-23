import { useState } from 'react'
import { crearProducto } from '../services/productoService'

export function ProductoForm() {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje('')
    setGuardando(true)

    try {
      const id = await crearProducto(
        nombre.trim(),
        parseFloat(precio),
        parseInt(stock, 10)
      )
      console.log('Producto agregado con ID: ', id)
      setNombre('')
      setPrecio('')
      setStock('')
      setMensaje('Producto guardado correctamente.')
    } catch (error) {
      console.error('Error al agregar producto: ', error)
      setMensaje('Error al guardar el producto.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          step="any"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={guardando}>
        {guardando ? 'Guardando...' : 'Guardar'}
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  )
}