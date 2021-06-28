export default function getOrder(orderId) {
    const url = '/api/oms/pvt/orders/' + orderId
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