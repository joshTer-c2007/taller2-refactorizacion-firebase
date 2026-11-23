import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export interface Producto {
  id: string
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

export async function obtenerProductos(): Promise<Producto[]> {
  const querySnapshot = await getDocs(collection(db, 'productos'))
  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Producto, 'id'>
    return {
      id: doc.id,
      nombre: data.nombre,
      precio: data.precio,
      stock: data.stock
    }
  })
}