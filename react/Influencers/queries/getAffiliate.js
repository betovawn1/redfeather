export default function getAffiliate(email) {
    const url = `/api/dataentities/IF/search?_fields=_all`
    const settings = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': 'vtexappkey-redfeather-EZALQZ',
            'X-VTEX-API-AppToken': 'QXYWTVHLOAHUKIEYLOVEMQOPKGHUPGZBLJDXENEAVNSVEGHLDURGVDUAIIMMOMVHAGIBFHUXJVIYYTLEYVQVPSFIODOVBRLIRKUXXGGWZUWZVWBPWIOSVASIAANCSYVS'
        }
    }
    return fetch(url, settings)
}