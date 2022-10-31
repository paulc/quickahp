
export async function onRequest(context) {
    const { request, env } = context
    try {
        const { uuid, data } = await request.json()
        if (uuid === undefined) {
            throw new Error("Invalid request {uuid}")
        }
        if (data === undefined) {
            throw new Error("Invalid request {data}")
        }
        return new Response(JSON.stringify({result: await env.AHP.put(uuid, data)}), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Access-Control-Allow-Headers':'*', 
                'Access-Control-Allow-Methods':'*', 
                'Content-Type':'application/json'})
        })
    } catch(e) {
        return new Response(JSON.stringify({"error": e.toString()}), 
            { headers: new Headers({
                'Access-Control-Allow-Origin':'*', 
                'Access-Control-Allow-Headers':'*', 
                'Access-Control-Allow-Methods':'*', 
                'Content-Type':'application/json'})
        })
    }
}
