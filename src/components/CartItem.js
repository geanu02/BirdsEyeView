import React, { useContext } from "react"
import PropTypes from "prop-types"

import { MainContext } from "../context/mainContext"
import useHover from "../hooks/useHover"


function CartItem({item}) {
    const { removeFromCart } = useContext(MainContext)
    const [ hovered, eventRef ] = useHover()

    const hoverClass = hovered ? "fill" : "line"

    return (
        <div className="cart-item">
            <i 
                className={`ri-delete-bin-${hoverClass}`}
                onClick={() => removeFromCart(item.id)}
                ref={eventRef}
            ></i>
            <img src={item.url} width="150px" alt={item.title} />
            <h2>{item.title}</h2>
            <p>$5.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem