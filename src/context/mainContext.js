import React, { createContext, useState, useEffect } from "react"
import apiConfig from "../utils/config"

const MainContext = createContext()

function MainContextProvider({ children }) {
    const [ photosArray, setPhotosArray ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const toggleFavorite = ( id ) => {
        const updatedArr = photosArray.map(photo => {
            if (photo.id === id) {
                return { ...photo, isFavorite: !photo.isFavorite }
            }
            return photo
        })
        setPhotosArray(updatedArr)
    }

    const addToCart = ( newItem ) => {
        setCartItems(prevItems => [...prevItems, newItem])
    }

    const removeFromCart = ( id ) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const emptyCart = () => setCartItems([])

    useEffect(() => {
        const url = apiConfig.url
        const getData = async () => {
                try {
                    const response = await fetch(url, {method: "GET"})
                    const data = await response.json()
                    return { success: true, data }
                } catch (error) {
                    console.log(error)
                    return {success: false}
                }
            }

        (async () => {
            setLoading(true)
            const res = await getData(url)
            if (res.success) {
                setLoading(false)
                setPhotosArray(res.data) 
            }
        })()
    }, [])

    return (
        <MainContext.Provider 
            value={{ 
                photosArray, 
                loading, 
                cartItems, 
                toggleFavorite, 
                addToCart, 
                removeFromCart, 
                emptyCart
            }}>
            { children }
        </MainContext.Provider>
    )
}

export { MainContextProvider, MainContext }