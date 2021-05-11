import React, {
    useState,
    useEffect,
    useCallback,
    useLayoutEffect
} from 'react'
import { 
    Query,
    useLazyQuery, 
} from 'react-apollo'
import styles from './styles.css'
import defaults from './defaults'
import getOrder from './queries/getOrder.js'
import getOrders from './queries/getOrders.js'
import getSession from './queries/getSession.gql'
import getAffiliate from './queries/getAffiliate'

import Total from './total'

function formatReal(int) {
    let tmp = int + ''
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1")
    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")

    return "R$ " + tmp
}

function getDays(minusMonth) {
    let dt = new Date()
    let month = dt.getMonth() - minusMonth,
        year = dt.getFullYear()

    let FirstDay = new Date(year, month, 1)
    let LastDay = new Date(year, month + 1, 0)

    return formatDateApi(FirstDay) + "T00:00:00.000Z TO " + formatDateApi(LastDay) + "T23:59:59.999Z"
}

function formatDateApi(date) {
    let day  = date.getDate().toString(),
    dayF = (day.length == 1) ? '0' + day : day,
    month  = (date.getMonth() + 1).toString(),
    monthF = (month.length == 1) ? '0' + month : month,
    yearF = date.getFullYear()
    return yearF + "-" + monthF + "-" + dayF
}

function formatDate(unformattedDate) {
    unformattedDate = new Date(unformattedDate)
    let day  = unformattedDate.getDate().toString(),
    dayF = (day.length == 1) ? '0' + day : day,
    month  = (unformattedDate.getMonth() + 1).toString(),
    monthF = (month.length == 1) ? '0' + month : month,
    yearF = unformattedDate.getFullYear()
    return dayF + "/" + monthF + "/" + yearF
}

function formatFloat(price) {
    return parseFloat(price.toString().replace(/([0-9]{2})$/g, ".$1"))
}

function Paytable() {
    const [ date ] = useState(new Date())
    const [ orders, setOrders ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ affiliate, setAffiliate ] = useState(null)
    const [ affiliates, setAffiliates ] = useState(null)
    const [ orderItems, setOrderItems ] = useState(null)
    const [ selectedMonth, setSelectedMonth ] = useState(0)
    const [ fetchSession, { data: session, loading: sessionLoading } ] = useLazyQuery(getSession)

    useLayoutEffect(() => {
        fetchSession()
    }, [])
    
    const fetchOrders = async (month) => {
        setLoading(true)
        
        let end = false
        let page = 1
        let allOrders = []

        while (!end) {
            let data = await (await getOrders(page, getDays(month))).json()
            allOrders = allOrders.concat(data.list)

            console.log(allOrders)
            
            if (allOrders.length == data.paging.total) {
                end = true
            } else {
                page = ++page
            }
        }
        setOrders(allOrders)
    }
    
    useEffect(() => {
        if (session && session.profile != null) {
            getAffiliate(session.profile.email).then(res => {
                res.json().then(res => {
                    const filtered = res.filter(item => {
                        if (item.email == session.profile.email) return true
                    })

                    setAffiliates(res)

                    if (filtered.length > 0) {
                        setAffiliate({
                            utm: filtered[0].utm,
                            name: filtered[0].name,
                            person: filtered[0].person,
                            status: filtered[0].status,
                            percent: filtered[0].percent,
                        })
                        fetchOrders(0)
                    } else {
                        setAffiliate(0)
                    }
                })
            })
        }
    }, [sessionLoading, session])

    useEffect(() => {
        if (orders != null) {
            const fetchData = async () => {
                let end = false
                let index = 0
                let items = {}
                while (!end) {
                    let data = null
                    if (orders[index] != undefined) {
                        data = await (await getOrder(orders[index].orderId)).json()
                    }

                    console.log('data', data.marketingData)
                    
                    if (data != null && data.marketingData != null) {
                        if (data.marketingData.utmSource != null && affiliate.person == "admin") {
                            if (items[data.marketingData.utmSource] == undefined) {
                                items[data.marketingData.utmSource] = []
                            }
                            items[data.marketingData.utmSource].push(data)
                        } else if (data.marketingData.utmCampaign != null && affiliate.person == "admin") {
                            if (items[data.marketingData.utmCampaign] == undefined) {
                                items[data.marketingData.utmCampaign] = []
                            }
                            items[data.marketingData.utmCampaign].push(data)
                        } else if (data.marketingData.utmMedium != null && affiliate.person == "admin") {
                            if (items[data.marketingData.utmMedium] == undefined) {
                                items[data.marketingData.utmMedium] = []
                            }
                            items[data.marketingData.utmMedium].push(data)
                        } else if (data.marketingData.utmPartner != null && affiliate.person == "admin") {
                            if (items[data.marketingData.utmPartner] == undefined) {
                                items[data.marketingData.utmPartner] = []
                            }
                            items[data.marketingData.utmPartner].push(data)
                        } else if (data.marketingData.utmSource != null && data.marketingData.utmSource == affiliate.utm) {
                            if (items[data.marketingData.utmSource] == undefined) {
                                items[data.marketingData.utmSource] = []
                            }
                            items[data.marketingData.utmSource].push(data)
                        } else if (data.marketingData.utmCampaign != null && data.marketingData.utmCampaign == affiliate.utm) {
                            if (items[data.marketingData.utmCampaign] == undefined) {
                                items[data.marketingData.utmCampaign] = []
                            }
                            items[data.marketingData.utmCampaign].push(data)
                        } else if (data.marketingData.utmMedium != null && data.marketingData.utmMedium == affiliate.utm) {
                            if (items[data.marketingData.utmMedium] == undefined) {
                                items[data.marketingData.utmMedium] = []
                            }
                            items[data.marketingData.utmMedium].push(data)
                        } else if (data.marketingData.utmPartner != null && data.marketingData.utmPartner == affiliate.utm) {
                            if (items[data.marketingData.utmPartner] == undefined) {
                                items[data.marketingData.utmPartner] = []
                            }
                            items[data.marketingData.utmPartner].push(data)
                        }
                    }

                    if (index == (orders.length - 1)) {
                        end = true
                    } else {
                        index = ++index
                    }
                }
                
                Object.keys(items).map(key => {
                    let utm = items[key][0].marketingData.utmSource

                    let total = 0
                    let subTotal = 0
                    let shipping = 0
                    let totalDiscount = 0
                    let subTotalDiscount = 0

                    let mappedItems = items[key].map(item => {
                        item.totals.forEach(each => {
                            if (each.id == "Items") {
                                total = total + each.value
                                subTotal += each.value
                            }
                            
                            if (each.id == "Discounts") {
                                if (each.value < 0) {
                                    totalDiscount = totalDiscount + each.value
                                    subTotalDiscount = each.value
                                } 
                            }
                            
                            if (each.id == "Shipping") {
                                if (each.value < 0) {
                                    shipping = each.value
                                    subTotalDiscount = each.value
                                } 
                            }
                        })
                        
                        console.log("AFFILIATES", affiliates)

                        const filtered = affiliates.filter(item => {
                            console.log("ITEM", item)
                            if (item.utm == utm) return true
                        })

                        console.log("FILTERED", filtered)

                        if (filtered.length > 0) {
                            console.log("bbb", filtered[0].email)
                            console.log("bbb", filtered[0].percent)

                            item.customTotals = {
                                total,
                                shipping,
                                subTotal: (subTotal - subTotalDiscount),
                                commissioning: (formatFloat(subTotal) * (parseInt(filtered[0].percent) / 100)),
                                totalDiscount
                            }
                        } else {
    
                            item.customTotals = {
                                total,
                                shipping,
                                subTotal: (subTotal - subTotalDiscount),
                                commissioning: 0,
                                totalDiscount
                            }
                        }

                        return item
                    })
                    items[key] = mappedItems
                })
                setOrderItems(items)
                setLoading(false)
            }
            fetchData()
        }
    }, [orders])

    if (affiliate == null) return null

    if (affiliate == 0) {
        return (
            <p className={styles.notAuth}>Você não está cadastrado como influenciador</p>
        )
    }

    if (session && session.profile == null) {
        return (
            <p className={styles.notAuth}>Você precisa estar autenticado</p>
        )
    }

    console.log('orderItems', orderItems)

    if (affiliate != null) {
        return ( 
            <div className={`flex flex-column ${styles.payTableContainer}`}>
                <div className={styles.payTableHeader}>
                    {
                        session ?
                            <span className={styles.profile}>Olá, {affiliate.name}</span>
                        :
                            null
                    }
                </div>
                <>
                    {
                        loading ?
                            <div className={`flex align-center justify-center h-100 w-100 pt10 pb10 mt7 ${styles.loading}`}>
                                <div className={styles.wrapper}>
                                    <div className={styles.typing}>
                                        Buscando dados...
                                    </div>
                                </div>
                            </div>
                        :
                            <>
                                <ul className={styles.monthSelector}>
                                    {
                                        defaults.months.map((month, index) => {
                                            if (index > 4) return null
                                            return <li className={`${selectedMonth == index ? styles.selected : ''}`} onClick={() => {
                                                setSelectedMonth(index)
                                                fetchOrders(index)
                                            }}>{defaults.months[date.getMonth() - index]}</li>
                                        })
                                    }
                                </ul>
                                {
                                    orderItems != null ?
                                    <>
                                        {
                                            Object.keys(orderItems).length == 0 ?
                                                <p>Não há pedidos para o mês selecionado</p>
                                            :
                                                <>
                                                    {
                                                        Object.keys(orderItems).map(key => {
                                                            return (
                                                                <>
                                                                    <h3>UTM: {key}</h3>
                                                                    <div className={styles.ordersWrapper}>
                                                                        <table className={styles.orders}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Data de Criação</th>
                                                                                    <th>Id do Pedido</th>
                                                                                    <th>Quantidade</th>
                                                                                    <th>utmCampaign</th>
                                                                                    <th>utmMedium</th>
                                                                                    <th>utmPartner</th>
                                                                                    <th>utmSource</th>
                                                                                    <th>Cidade</th>
                                                                                    <th>UF</th>
                                                                                    <th>Total</th>
                                                                                    <th>Desconto</th>
                                                                                    <th>Frete</th>
                                                                                    <th className={styles.commissioning}>Comissão</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    orderItems[key].map(order => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td>{formatDate(order.creationDate)}</td>
                                                                                                <td>{order.orderId}</td>
                                                                                                <td>{order.items.length}</td>
                                                                                                <td>{order.marketingData.utmCampaing}</td>
                                                                                                <td>{order.marketingData.utmMedium}</td>
                                                                                                <td>{order.marketingData.utmPartner}</td>
                                                                                                <td>{order.marketingData.utmSource}</td>
                                                                                                <td>{order.shippingData.address.city}</td>
                                                                                                <td>{order.shippingData.address.state}</td>
                                                                                                <td>{formatReal(order.customTotals.total)}</td>
                                                                                                <td>{formatReal(order.customTotals.totalDiscount)}</td>
                                                                                                <td>{formatReal(order.customTotals.shipping)}</td>
                                                                                                <td className={styles.commissioning}>{`${order.customTotals.commissioning == 0 ? 0 : formatReal(order.customTotals.commissioning.toFixed(2).toString().replace('.', ''))}`}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <Total orderItems={orderItems[key]} />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </>
                                    : null
                                }
                            </>
                    }
                </>
            </div>
        )
    } else {
        <span className={styles.notAuth}>Não encontramos nenhum pedido para o período selecionado.</span>
    }
}

export default Paytable