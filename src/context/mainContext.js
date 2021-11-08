import React, { createContext, useState, useEffect } from "react"
import apiConfig from "../utils/config"

const MainContext = createContext()

function MainContextProvider({ children }) {
    const [ photosArray, setPhotosArray ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const url = apiConfig.url
    
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

    const getData = async ( url ) => {
        try {
            const response = await fetch(url, {method: "GET"})
            const data = await response.json()
            return { success: true, data }
        } catch (error) {
            console.log(error)
            return {success: false}
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await getData(url)
            if (res.success) {
                setLoading(false)
                setPhotosArray(res.data)
                
            }
        })()
        // getData(url)
        //     .then(data => setPhotosArray(data))
        //     .catch((err) => console.log(err))
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