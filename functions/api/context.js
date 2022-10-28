
export async function onRequest(context) {
    const data = JSON.stringify(context)
    return new Response(data)
}
