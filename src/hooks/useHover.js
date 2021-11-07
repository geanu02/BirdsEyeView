import { useState, useEffect, useRef } from "react"

function useHover(defaultOnValue = false) {

    const [ hovered, setHovered ] = useState(false)
    const eventRef = useRef(null)

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    useEffect(() => {
        eventRef.current.addEventListener("mouseenter", enter)
        eventRef.current.addEventListener("mouseleave", leave)

        // return () => {
        //     eventRef.current.removeEventListener("mouseenter", enter)
        //     eventRef.current.removeEventListener("mouseleave", leave)
        // }

    }, [])

    return [ hovered, eventRef ]
}

export default useHover