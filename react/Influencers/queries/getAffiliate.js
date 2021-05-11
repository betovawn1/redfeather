export default function getAffiliate(email) {
    const url = `/api/dataentities/IF/search?_fields=_all`
    const settings = {
        method: "GET"
    }
    return fetch(url, settings)
}