import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export interface NuevoProductoInput {
  nombre: string
  precio: number
  stock: number
}

export async function crearProducto(
  nombre: string,
  precio: number,
  stock: number
): Promise<string> {
  const docRef = await addDoc(collection(db, 'productos'), {
    nombre,
    precio,
    stock
  })
  return docRef.id
}