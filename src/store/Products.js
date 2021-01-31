import { SET_PRODUCTS, ADD_PRODUCT, ADD_PRODUCT_FORM, UPDATE_PRODUCT_FORM, REMOVE_PRODUCT } from './type';

const defaultState = {
  products: [],
  newProducts: []
  // newProducts: [{title: "", price: "", fileName: "0-Goku.jpg"}]
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
      case ADD_PRODUCT_FORM: 
      return {
        ...state,
        newProducts: [...state.newProducts, action.payload]
      }
    case UPDATE_PRODUCT_FORM:
      const updatedData = state.newProducts.map(data => {
        if (data.fileName === action.payload.fileName) {
          return action.payload
        }
      })
      const filteredData = state.newProducts.filter(data => data.fileName !== action.payload.fileName)
      const newData = [...filteredData, updatedData]
      return {
        ...state,
        newProducts: newData
      }
    default: 
      return state
  }
}

export default reducer; 