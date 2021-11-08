import React, { useContext } from "react"
import PropTypes from "prop-types"

import { MainContext } from "../context/mainContext"
import useHover from "../hooks/useHover"

function Image({ className, img }) {
    const [ hovered, eventRef ] = useHover()
    const { cartItems, toggleFavorite, addToCart, removeFromCart } = useContext(MainContext)

    const heartIcon = () => {
        if (img.isFavorite) {
            return <i 
                className="ri-heart-fill favorite"
                onClick={() => toggleFavorite(img.id)} 
            ></i>
        } else if (hovered) {
            return <i 
                className="ri-heart-line favorite"
                onClick={() => toggleFavorite(img.id)}
            ></i> 
        }
    }

    const cartIcon = () => {
        if (cartItems.find(({ id }) => id === img.id)) {
            return <i 
                className="ri-shopping-cart-fill cart"
                onClick={() => removeFromCart(img.id)}
            ></i>
        } else if (hovered) {
            return <i 
                className="ri-add-circle-line cart"
                onClick={() => addToCart(img)}     
            ></i>
        }
    }

    return (
        <div 
            className={`${className} image-container`}
            ref={eventRef}
        >
            <img 
                src={img.url} 
                className="image-grid"
            />
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image