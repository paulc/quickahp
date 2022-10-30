
export async function onRequest(context) {
    const { request, env } = context
    try {
        const { uuid } = await request.json()
        if (uuid === undefined) {
            throw new Error("Invalid request {uuid}")
        }
        const data = await env.AHP.get(uuid)
        if (data === undefined) {
            throw new Error("UUID not found: " + uuid)
        }
        return new Response(JSON.stringify({result: await data}), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Content-Type':'application/json'})
        })
    } catch(e) {
        return new Response(JSON.stringify({"error": e.toString()}), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Content-Type':'application/json'})
        })
    }
}
