import { SET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT } from './type';

const defaultState = {
  products: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PRODUCTS:
      return {
        ...state, 
        products: [...action.payload]
      }
    case ADD_PRODUCT: 
    console.log("ADD_PRODUCT:", action.payload)
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case REMOVE_PRODUCT:
      const filteredProducts = state.products.filter(p => p.id !== action.payload.id)
      return {
        ...state,
        products: [...filteredProducts]
      }
    default: 
      return state
  }
}

export default reducer; 