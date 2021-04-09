import React, { useMemo, useCallback } from "react"
import useProduct from "vtex.product-context/useProduct"

function MeasurementChart() {
    const {
        selectedItem: {
            images
        }
    } = useProduct()

    return (
        images.length > 0 ?
            images.map(image => {
                if (image.imageLabel == "tabelademedida") return <img src={image.imageUrl} alt={image.imageLabel} />
            })
        : null
    )
}

export default MeasurementChart