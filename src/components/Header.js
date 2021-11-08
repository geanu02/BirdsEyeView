import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { MainContext } from "../context/mainContext"

function Header() {
    const { cartItems } = useContext(MainContext)

    return (
        <header>
            <Link to="/"><h2>Bird's Eye View</h2></Link>
            <Link to="/cart">
                <i 
                    className={
                        cartItems.length > 0 ?
                        "ri-shopping-cart-fill ri-fw ri-2x" :
                        "ri-shopping-cart-line ri-fw ri-2x"
                    }
                ></i>
                </Link>
        </header>
    )
}

export default Header