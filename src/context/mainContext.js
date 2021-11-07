import React, { createContext, useState, useEffect } from "react"

const MainContext = createContext()

function MainContextProvider({ children }) {
    const [ photosArray, setPhotosArray ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ origin, setOrigin ] = useState("API")

    const url = "https://my-hikes-api.herokuapp.com/hikes"
    
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

    const getData = async (url) => {
        let response = await fetch(url, {method: "GET"})
        setOrigin(`API: ${response.status}`)
        if (response.status !== 200) {
            response = await fetch("https://github.com/geanu02/hikes_api/blob/master/db.json", {method: "GET"})
            setOrigin(`JSON: ${response.status}`)
        }
        const data = await response.json()
        return data
    }

    useEffect(() => {
        getData(url)
            .then(data => setPhotosArray(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <MainContext.Provider value={{ photosArray, cartItems, toggleFavorite, addToCart, removeFromCart, emptyCart, origin }}>
            { children }
        </MainContext.Provider>
    )
}

export { MainContextProvider, MainContext }