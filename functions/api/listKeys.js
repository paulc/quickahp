
export async function onRequest(context) {
    const { request, env } = context
    try {
        return new Response(JSON.stringify({keys: await env.AHP.list()}), 
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
