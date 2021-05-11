export default function getOrder(orderId) {
    const url = '/api/oms/pvt/orders/' + orderId
    const settings = {
        method: 'GET'
    }
    return fetch(url, settings)
}