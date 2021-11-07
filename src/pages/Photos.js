import React, { useContext } from "react"
import { MainContext } from "../context/mainContext"
import Image from "../components/Image"
import { getClass } from "../utils"

function Photos() {
    const {photosArray, loading} = useContext(MainContext) 

    const imageElements = photosArray.map((img, i) => (
        <Image 
            key={img.id}
            img={img}
            className={getClass(i)}
        />
    ))

    return (
        <main className="photos">
            <span>{loading}</span>
            {imageElements}
        </main>
    )
}

export default Photos