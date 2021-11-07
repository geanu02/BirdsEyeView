import React, { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { MainContext } from "../context/mainContext"
import CartItem from "../components/CartItem"

function Cart() {
    const { cartItems, emptyCart } = useContext(MainContext)
    const [ ordering, setOrdering ] = useState(false)
    const totalCost = cartItems.length * 5.99
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})

    const cartItemElements = cartItems.map(item => (
        <CartItem 
            key={item.id} 
            item={item} 
        />
    ))

    const placeOrder = () => {
        setOrdering(prevState => !prevState)
        setTimeout(() => {
            alert("Order placed!")
            emptyCart()
            setOrdering(prevState => !prevState)
        }, 3000)
    }

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItems.length === 0 && <>
                <p style={{textAlign: 'center'}}>Your cart is empty.<br />
                <Link to="/" style={{color: 'black'}}>Shop here</Link>.
                </p></>
            }
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            <div className="order-button">
                <button
                    disabled={cartItems.length === 0}
                    onClick={() => placeOrder()}
                >
                    {ordering ?
                    "Ordering..." :
                    "Place Order"}
                </button>
            </div>
        </main>
    )
}

export default Cart