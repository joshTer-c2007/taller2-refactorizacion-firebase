import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'
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
  return querySnapshot.docs.map((item) => {
    const data = item.data() as Omit<Producto, 'id'>
    return {
      id: item.id,
      nombre: data.nombre,
      precio: data.precio,
      stock: data.stock
    }
  })
}

export const actualizarProducto = async (
  id: string,
  nombre: string,
  precio: number,
  stock: number
): Promise<void> => {
  const productoRef = doc(db, 'productos', id)
  await updateDoc(productoRef, {
    nombre,
    precio,
    stock
  })
}