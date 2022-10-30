
export async function onRequest(context) {
    const { request } = context
    try {
        const data = await request.json()
        return new Response(JSON.stringify(data), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Content-Type':'application/json'})
        })
    } catch(e) {
        return new Response(JSON.stringify({"error":e.toString()}), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Content-Type':'application/json'})
        })
    }
}
