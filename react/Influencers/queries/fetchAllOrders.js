export default async function getAllOrders() {
    const url = `/api/oms/pvt/orders?per_page=30&orderBy=creationDate,desc&f_status=invoiced`
    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': 'vtexappkey-redfeather-EZALQZ',
            'X-VTEX-API-AppToken': 'QXYWTVHLOAHUKIEYLOVEMQOPKGHUPGZBLJDXENEAVNSVEGHLDURGVDUAIIMMOMVHAGIBFHUXJVIYYTLEYVQVPSFIODOVBRLIRKUXXGGWZUWZVWBPWIOSVASIAANCSYVS'
        }
    }

    let end = false
    let page = 1
    let allOrders = []
    
    while (!end) {
        let data = await (await fetch(url + `&page=${page}`, settings)).json()
        allOrders = allOrders.concat(data.list)
        
        if (allOrders.length == data.paging.total) {
            end = true
        } else {
            page = ++page
        }
    }

    localStorage.setItem('orders', JSON.stringify(allOrders))
    
    end = false
    let index = 0
    let items = []

    while (!end) {
        let data = null
        if (allOrders[index] != undefined) {
            data = await (await getOrder(allOrders[index].orderId)).json()
        }

        console.log(index)
        
        if (data != null && data.marketingData != null) {
            if (data.marketingData.utmSource != null && data.marketingData.utmSource == affiliate.utm) {
                items = items.concat(data)
            }
        }

        if (index == allOrders.length) {
            end = true
        } else {
            index = ++index
        }
    }

    localStorage.setItem('orderItems', JSON.stringify(items))
}