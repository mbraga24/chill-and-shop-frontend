// const herokuApp = `https://hmshop.herokuapp.com/api/v1/`;
const localhost = `http://localhost:3000/api/v1/`;

export const signup = data => {
  return fetch(`${localhost}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(r => r.json())
}

export const loginUser = data => {
  return fetch(`${localhost}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(r => r.json())
}

export const autologin = userToken => {
  return fetch(`${localhost}autologin`, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  })
  .then(r => r.json())
}

export const getProducts = () => {
  return fetch(`${localhost}products`)
  .then(r => r.json())
}

export const newProduct = (formData, userToken) => {
return fetch(`${localhost}products`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${userToken}`
    },
    body: formData
  }).then(r => r.json())
}

export const updateProduct = (productId, formData, userToken) => {
  return fetch(`${localhost}products/${productId}`,{
    method: "PATCH",
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: formData
  }).then(r => r.json())
}

export const deleteProduct = (productId, userToken) => {
  return fetch(`${localhost}products/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${userToken}`
    }
  }).then(r => r.json())
}

export const queryProducts = (type, searchTerm) => {
  return fetch(`${localhost}products_by?type=${type}&query=${searchTerm}`)
  .then(r => r.json())
}

export const createOrder = (productId, userToken) => {
  return fetch(`${localhost}orders`,{
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${userToken}`
    },
    body: JSON.stringify({product_id: productId, quantity: 1})
  }).then(r => r.json())
}

export const getOrders = userToken => {
  return fetch(`${localhost}user-orders`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${userToken}`
    }
  })
  .then(r => r.json())
}

export const placeOrder = (orders, userToken) => {
  console.log("orders", orders)
  return fetch(`${localhost}place-order`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${userToken}`
    },
    body: JSON.stringify({orders: orders})
  })
  .then(r => r.json())
}

export const deleteOrder = (orderId, userToken) => {
  return fetch(`${localhost}orders/${orderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${userToken}`
    }
  }).then(r => r.json())
}