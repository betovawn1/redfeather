import React, { useEffect } from "react"
import colors from "./colors"
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { FilterNavigatorFlexible } from "vtex.search-result"
import style from "./filter.css"

import { useFilter } from "./context/FilterContext"

function SearchPageColorSelector() {
    const { filters } = useSearchPage()
    const filterState = useFilter()

    useEffect(() => {
        console.log(filterState)
    }, [filterState])

    return (
        <div className={style.filtersContainer}>
            {/* <SelectedFilters /> */}
            <div className={style.filters}>
                {
                    filters.length > 0 ?
                        filters.map(filter => {
                            if (filter.type == "PriceRanges" || filter.title == "Indicações (teste campo )") return null
                            if (filter.title == "Cor") {
                                return (
                                    <div className={style.filterContainer}>
                                        <h3>{filter.title}</h3>
                                        <div className={style.filterContentColor}>
                                            {
                                                filter.facets.map(facet => {
                                                    return (
                                                        Object.keys(colors).map(i => {
                                                            if (i == facet.name.toLowerCase()) {
                                                                if (facet.selected) return <a style={{ backgroundColor: colors[i].value }} title={facet.name} className={style.filterItemColorSelected} href={`/${facet.href}`}></a>
                                                                return (
                                                                    <a style={{ backgroundColor: colors[i].value }} title={facet.name} className={style.filterItemColor} href={`/${facet.href}`}></a>
                                                                )
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            } else if (filter.title == "Tamanho") {
                                return (
                                    <div className={style.filterContainer}>
                                        <h3>{filter.title}</h3>
                                        <div className={style.filterContentTamanho}>
                                            {
                                                filter.facets.map(facet => {
                                                    if (facet.selected) return <a className={style.filterItemTamanhoSelected} href={`/${facet.href}`}>{facet.name}</a>
                                                    return (
                                                        <a className={style.filterItemTamanho} href={`/${facet.href}`}>{facet.name}</a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={style.filterContainer}>
                                        <h3>{filter.title}</h3>
                                        <div className={style.filterContent}>
                                            {
                                                filter.facets.map(facet => {
                                                    if (facet.selected) return (
                                                        <div className={style.filterItemContainer}>
                                                            <span className={style.checked}></span>
                                                            <a className={style.filterItem} href={`/${facet.href}`}>{facet.name}</a>
                                                        </div>
                                                    )
                                                    return (
                                                        <div className={style.filterItemContainer}>
                                                            <span className={style.filterCheckBox}></span>
                                                            <a className={style.filterItem} href={`/${facet.href}`}>{facet.name}</a>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    : null
                }
            </div>
            <div className={style.priceRange}>
                <FilterNavigatorFlexible />
            </div>
        </div>
    )
}

export default SearchPageColorSelector