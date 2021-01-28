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

export const autologin = () => {
  return fetch(`${localhost}autologin`, {
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
  .then(r => r.json())
}

export const getProducts = () => {
  return fetch(`${localhost}products`)
  .then(r => r.json())
}

export const newProduct = (formData) => {
return fetch(`${localhost}products`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: formData
  }).then(r => r.json())
}

export const updateProduct = (productId, formData) => {
  return fetch(`${localhost}products/${productId}`,{
    method: "PATCH",
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: formData
  }).then(r => r.json())
}

export const deleteProduct = (productId) => {
  return fetch(`${localhost}products/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.token}`
    }
  }).then(r => r.json())
}

export const queryProducts = (type, searchTerm) => {
  return fetch(`${localhost}products_by?type=${type}&query=${searchTerm}`)
  .then(r => r.json())
}

export const createOrder = (product, quantity) => {
  return fetch(`${localhost}create-order`,{
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({product_id: product.id, quantity: quantity})
  }).then(r => r.json())
}

export const getOrders = () => {
  return fetch(`${localhost}order_items`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.token}`
    }
  })
  .then(r => r.json())
}

export const placeOrder = (orders) => {
  console.log("orders", orders)
  return fetch(`${localhost}place-order`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({orders: orders})
  })
  .then(r => r.json())
}

export const deleteOrder = (orderId) => {
  return fetch(`${localhost}orders/${orderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${localStorage.token}`
    }
  }).then(r => r.json())
}