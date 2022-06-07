import { useState, useEffect, useRef } from "react"

export default function useClicker(defaultOnValue = false) {
    const [ clicked, setClicked ] = useState(false)
    const eventRef = useRef(null)

    const clickDown = () => setClicked(true)
    const clickUp = () => setClicked(false)

    useEffect(() => {
        eventRef.current.addEventListener("mouseenter", enter)
        eventRef.current.addEventListener("mouseleave", leave)
    }, [])

    return [ clicked, eventRef ]
}