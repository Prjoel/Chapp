async function getAPI(path) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      console.error(e);
      return true
    }
  } else throw new Error('GET request failed. ');
}

async function postAPI(path, data) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      console.error(e.message);
      return true
    }
  } else throw new Error('POST request failed.');
}

async function putAPI(path, data) {
  const response = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      console.error(e);
      return true
    }
  } else throw new Error('PUT request failed. ');
}

async function patchAPI(path, data) {
  const response = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      console.error(e);
      return true
    }
  } else throw new Error('PUT request failed. ');
}

async function deleteAPI(path) {
  const response = await fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      console.error(e);
      return true
    }
  } else throw new Error('DELETE request failed. ');
}

export { getAPI, postAPI, putAPI, patchAPI, deleteAPI }