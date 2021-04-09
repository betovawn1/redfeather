import React, { useContext, useCallback, useState } from "react"
import style from "./Filter/filter.css"

import Button from "./Filter/FilterTrigger"
import FilterProvider from "./Filter/context/FilterContext"

function FilterTrigger() {
    return (
        <FilterProvider>
            <Button />
        </FilterProvider>
    )
}

export default FilterTrigger