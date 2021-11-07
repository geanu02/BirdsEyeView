import React, { useContext } from "react"
import { MainContext } from "../context/mainContext"
import Image from "../components/Image"
import { getClass } from "../utils"

function Photos() {
    const {photosArray, origin} = useContext(MainContext) 

    const imageElements = photosArray.map((img, i) => (
        <Image 
            key={img.id}
            img={img}
            className={getClass(i)}
        />
    ))

    return (
        <main className="photos">
            <span>{origin}</span>
            {imageElements}
        </main>
    )
}

export default Photos