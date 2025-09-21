import { db } from "./firebase"
import { collection, doc, addDoc, getDoc, getDocs, query, where, orderBy, setDoc } from "firebase/firestore"

// Artisan operations
export const createArtisanProfile = async (userId: string, artisanData: any) => {
  try {
    await setDoc(doc(db, "artisans", userId), {
      ...artisanData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const createArtisan = async (artisanData: any) => {
  try {
    const docRef = await addDoc(collection(db, "artisans"), {
      ...artisanData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

export const getArtisan = async (artisanId: string) => {
  try {
    const docRef = doc(db, "artisans", artisanId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { artisan: { id: docSnap.id, ...docSnap.data() }, error: null }
    } else {
      return { artisan: null, error: "Artisan not found" }
    }
  } catch (error: any) {
    return { artisan: null, error: error.message }
  }
}

// Product operations
export const createProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

export const getArtisanProducts = async (artisanId: string) => {
  try {
    const q = query(collection(db, "products"), where("artisanId", "==", artisanId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { products, error: null }
  } catch (error: any) {
    return { products: [], error: error.message }
  }
}
