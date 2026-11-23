import { useState } from 'react'
import { ProductoForm } from './components/ProductoForm'
import { ProductosLista } from './components/ProductosLista'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleProductoCreado = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Registro y Lista de Productos</h1>
        <p>Gestiona tu inventario conectado a Cloud Firestore</p>
      </header>
      <ProductoForm onProductoCreado={handleProductoCreado} />
      <ProductosLista refreshKey={refreshKey} />
    </main>
  )
}

export default App