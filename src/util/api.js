
const request = async (url, options = {}) => {
  try {
    const result = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'kiko',
        'Content-Type': 'application/json'
      }
    });
    if (result.ok) {
      return await result.json();
    }
    throw new Error('API ERROR');
  } catch (e) {
    console.log(e.message);
  }
}


export const getDocument = async (id) => {
  const result = await request(`/documents/${id}`, {
    method: 'GET'
  })
  return result;
}


export const getDocumentsAll = async () => {
  const result = await request(`/documents`, {
    method: 'GET'
  })
  return result;
}

export const creatDocument = async (title, parent = null) => {
  const result = await request('/documents', {
    method: 'POST',
    body: JSON.stringify({
      title: `${title}`,
      parent: `${parent}`
    })
  })
  return result;
}

export const updateDocument = async (id, document) => {
  const result = await request(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(document)
  });
  return result;
}

export const deleteDocument = async (id) => {
  const result = await request(`/documents/${id}`, {
    method: 'DELETE'
  });
  return result;
}
