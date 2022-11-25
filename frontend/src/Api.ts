export const getOriginalUrl = async (shortCode:string, API_URI: string) => {
  let rawRes = await fetch(`${API_URI}/${shortCode}`, {
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    referrerPolicy: 'no-referrer'
  })
  let res = await rawRes.json();

  if(!rawRes.ok) return {ok: false}
  else return res
}

export let generateShortUrl = async (url: string, API_URI) => {
  let data = {'url': url}

  let rawRes = await fetch(`${API_URI}/api/v1/shorten`, {
    headers: {'Content-Type': 'application/json'},
    //referrerPolicy: 'no-referrer',
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data)
  })
  let res = await rawRes.json()

  if(!rawRes.ok) return false
  else return res
}