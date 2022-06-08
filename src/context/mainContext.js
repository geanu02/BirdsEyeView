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

    // const getData = async ( surl ) => {
    //     try {
    //         const response = await fetch(surl, {method: "GET"})
    //         const data = await response.json()
    //         return { success: true, data }
    //     } catch (error) {
    //         console.log(error)
    //         return { success: false }
    //     }
    // }

    useEffect(() => {
        // (async () => {
        //     setLoading(true)
        //     const jurl = apiConfig.url
        //     const res = await getData(jurl)
        //     if (res.success) {
        //         setLoading(false)
        //         setPhotosArray(res.data) 
        //     }
        // })()
        setLoading(true)
        const fetchData = async () => {
            const apiAddress = apiConfig.url
            const res = await fetch(apiAddress)
            const json = await res.json()
            console.log(json)
            setPhotosArray(json)
        }
        fetchData()
            .catch(console.error)
            .finally(() => setLoading(false))
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