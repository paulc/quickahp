
export async function onRequest(context) {
  const data = JSON.stringify(context)
  return new Response(data, { headers: new Headers({
        'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json'})
  })
}
