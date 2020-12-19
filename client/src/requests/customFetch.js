export async function getAPI(path) {
    const response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if(response.ok) {
      return response.json();
    } else throw new Error('GET request failed. ');
}
  
export async function postAPI(path, data) {
    const response = await fetch(path, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    console.log(response, ' ----+-+-+-+-+')
    if(response.ok) {
      return response.json();
    } else throw new Error('POST request failed. ');
}
  
export async function putAPI(path, data) {
    const response = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    if(response.ok) {
      return response.json();
    } else throw new Error('PUT request failed. ');
}
  
export async function patchAPI(path, data) {
    const response = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    if(response.ok) {
      return response.json();
    } else throw new Error('PUT request failed. ');
}
  
export async function deleteAPI(path) {
    const response = await fetch(path, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    if(response.ok) {
      return response.json();
    } else throw new Error('DELETE request failed. ');
}