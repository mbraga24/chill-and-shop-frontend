import { SET_PRODUCTS, ADD_PRODUCT, SET_FORM, ADD_FORM, UPDATE_FORM, DELETE_FORM, REMOVE_PRODUCT } from './type';

const defaultState = {
  products: [],
  newProducts: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PRODUCTS:
      return {
        ...state, 
        products: [...action.payload]
      }
    case ADD_PRODUCT: 
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case REMOVE_PRODUCT:
      console.log("action.payload", action.payload)
      const filteredProducts = state.products.filter(p => p.id !== action.payload.id);
      return {
        ...state,
        products: [...filteredProducts]
      }
    case SET_FORM: 
      return {
        ...state,
        newProducts: action.payload
      }
    case ADD_FORM: 
      return {
        ...state,
        newProducts: [...state.newProducts, action.payload]
      }
    case UPDATE_FORM:
      const updatedForms = state.newProducts.map(data => {
        if (data.get("fileName") === action.payload.get("fileName")) {
          return action.payload
        } else {
          return data
        }
      });
      return {
        ...state,
        newProducts: [...updatedForms]
      }
    case DELETE_FORM:
      const filteredForms = state.newProducts.filter(data => data.get("fileName") !== action.payload);
      return {
        ...state,
        newProducts: [...filteredForms]
      }
    default: 
      return state
  }
}

export default reducer; 