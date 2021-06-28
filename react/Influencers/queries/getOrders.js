export default function getOrders(page, period) {
    //&f_status=invoiced
    const url = `/api/oms/pvt/orders?per_page=30&orderBy=creationDate,desc&page=${page}&f_creationDate=creationDate:[${period}]`
    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': 'vtexappkey-redfeather-EZALQZ',
            'X-VTEX-API-AppToken': 'QXYWTVHLOAHUKIEYLOVEMQOPKGHUPGZBLJDXENEAVNSVEGHLDURGVDUAIIMMOMVHAGIBFHUXJVIYYTLEYVQVPSFIODOVBRLIRKUXXGGWZUWZVWBPWIOSVASIAANCSYVS'
        }
    }
    return fetch(url, settings)
}