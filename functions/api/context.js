
export async function onRequest(context) {
  const data = JSON.stringify(context)
  return new Response(data, { headers: new Headers({
        'Access-Control-Allow-Origin':'*', 
        'Access-Control-Allow-Headers':'*', 
        'Access-Control-Allow-Methods':'*', 
        'Content-Type':'application/json'})
  })
}
