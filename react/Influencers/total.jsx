import React from 'react'
import styles from './styles.css'

function formatReal(int) {
    let tmp = int + ''
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1")
    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")

    return tmp
}

function normalizeValue(float) {
    return parseFloat(float.toString().replace('.', ''))
}

function Total({
    orderItems
}) {
    console.log("TOTAL", orderItems)

    if (!orderItems) return null
    
    const total = orderItems.map(item => {
        return parseFloat(formatReal(item.customTotals.total))
    })
    console.log('total', total)
    
    const commissioning = orderItems.map(item => {
        return item.customTotals.commissioning
    })
    console.log('commissioning', commissioning)

    if (total.length == 0 || commissioning.length == 0) return null

    return (
        <div className={`flex flex-column ${styles.totals}`}>
            <span className={styles.total}>Total: {total.reduce((total, value) => normalizeValue(total) + normalizeValue(value)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            <span className={styles.totalComissioning}>Comissão: {commissioning.reduce((total, value) => total + value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
        </div>
    )
}

export default Total