import React from "react"
import { Spinner } from "./styles/Spinner-Style"

export default function Loading({ ...restProps}) {
    return (
        <Spinner {...restProps} />
    )
}