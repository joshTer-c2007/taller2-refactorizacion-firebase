import { useState } from 'react'
import { ProductoForm } from './components/ProductoForm'
import { ProductoLista } from './components/ProductosLista'
import type { Producto } from './services/productoService'
import './App.css'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleProductoGuardado = () => {
    setProductoSeleccionado(null)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Registro y Lista de Productos</h1>
        <p>Gestiona tu inventario conectado a Cloud Firestore</p>
      </header>

      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onProductoGuardado={handleProductoGuardado}
        onCancelarEdicion={() => setProductoSeleccionado(null)}
      />

      <ProductoLista
        onEdit={setProductoSeleccionado}
        refreshKey={refreshKey}
      />
    </main>
  )
}

export default App