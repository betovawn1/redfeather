import React, { useMemo, useCallback } from "react"
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { Button, Link } from 'vtex.styleguide'

export const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16"><g><g><path fill="#616160" d="M21.034 2.78H1.517a.741.741 0 0 1 0-1.482h19.517a.742.742 0 1 1 0 1.483z" /></g><g><path fill="#616160" d="M21.034 8.838H1.517a.741.741 0 0 1 0-1.483h19.517a.742.742 0 1 1 0 1.482z" /></g><g><path fill="#616160" d="M21.034 14.895H1.517a.742.742 0 0 1 0-1.483h19.517a.742.742 0 1 1 0 1.483z" /></g><g><path fill="#616160" d="M6.215 2.04a1.73 1.73 0 1 1-3.461-.001 1.73 1.73 0 0 1 3.46 0z" /></g><g><path fill="#616160" d="M13.137 7.972a1.73 1.73 0 1 1-3.46 0 1.73 1.73 0 0 1 3.46 0z" /></g><g><path fill="#616160" d="M20.06 14.4a1.73 1.73 0 1 1-3.462 0 1.73 1.73 0 0 1 3.461 0z" /></g></g></svg>
)

function Filter() {
    console.log(useSearchPage())
    const { filters, params: { term, category } } = useSearchPage();

    const selecteds = useMemo(() => {

        return filters.map((item) => item.facets.filter((facet) => facet.selected)).flat();

    }, [filters]);

    const handleClear = useMemo(() => {
        return `/${term || category}?map=ft`
    }, [term, category])

    return (
        <div className="noen">
            <div className="flex items-center w-100">
                <FilterIcon />
                <span className="noen">Filtrar</span>
                <span className="noen">
                    (<b>
                        {selecteds.length}
                    </b>)
                </span>
            </div>
            {
                selecteds.length ? (
                    <div className="noen">
                        <Button>
                            <Link href={handleClear}>
                                Limpar
                            </Link>
                        </Button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Filter