
export async function onRequest(context) {
    const { request, env } = context
    try {
        const { uuid, data } = await request.json()
        if (uuid === undefined || data === undefined) {
            throw new Error("Invalid input - uuid/data not found")
        }
        const result = await env.AHP.put(uuid,data)
        return new Response(JSON.stringify({result:result}), 
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
