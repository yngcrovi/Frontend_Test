export default async function makeRequest(url, method, body){
    let request
    if (body !== null){
        request = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        }
        );
    }else{
        request = await fetch(url, {
            credentials: 'include',
            method: method,
        }
        );
    }
    return request
}