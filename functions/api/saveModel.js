
export async function onRequest(context) {
    const { request } = context
    const data = await request.json()
    const response = JSON.stringify({ "xxx":111 })
    return new Response(data, { headers: new Headers({
        'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json'})
    })
}
