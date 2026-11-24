import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  type Unsubscribe
} from 'firebase/firestore'
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

export const eliminarProducto = async (id: string): Promise<void> => {
  const productoRef = doc(db, 'productos', id)
  await deleteDoc(productoRef)
}

export function escucharProductos(
  onProductos: (productos: Producto[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const productosRef = collection(db, 'productos')

  return onSnapshot(
    productosRef,
    (querySnapshot) => {
      const productos: Producto[] = querySnapshot.docs.map((item) => {
        const data = item.data() as Omit<Producto, 'id'>
        return {
          id: item.id,
          nombre: data.nombre,
          precio: data.precio,
          stock: data.stock
        }
      })
      onProductos(productos)
    },
    (error) => {
      console.error('Error en suscripción de productos:', error)
      if (onError) {
        onError(error)
      }
    }
  )
}