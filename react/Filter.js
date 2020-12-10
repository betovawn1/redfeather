import Filter from './Filter/Filter'

import FilterProvider from "./Filter/context/FilterContext"

export default function CustomFilter() {
    return (
        <FilterProvider>
            <Filter />
        </FilterProvider>
    )
}