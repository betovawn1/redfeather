export default function getOrders(page, period) {
    const url = `/api/oms/pvt/orders?per_page=30&orderBy=creationDate,desc&page=${page}&f_creationDate=creationDate:[${period}]&f_status=invoiced`
    const settings = {
        method: 'GET'
    }
    return fetch(url, settings)
}