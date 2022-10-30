
export async function onRequest(context) {
    const { request } = context
    const data = await request.json()
    return new Response(JSON.stringify(data), 
        { headers: new Headers({
            'Access-Control-Allow-Origin':'*', 
            'Content-Type':'application/json'})
    })
}
