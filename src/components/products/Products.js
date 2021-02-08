import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Divider } from 'semantic-ui-react';
import CardProduct from '../cardProduct/CardProduct';
import { queryProducts } from '../../api';
import { deleteProduct, createOrder } from '../../api';
import { REMOVE_PRODUCT, SET_BANNER, ADD_ORDER, UPDATE_TOTAL_ORDER } from '../../store/type';

import './Styles.scss';

const Product = ({ handleBanner }) => {
  
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchProducts, setSearchProducts ] = useState([])
  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const orders = useSelector(state => state.order.orders);
  const [ loader, setLoader ] = useState(false); 
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const isSoldOut = product => {
    return product.quantity === 0
  }

  const isInShoppingCart = product => {
    return !!orders.find(order => order.product.title === product.title)
  }

  const checkProductQuantity = quantity => {
    let options = [];
    for (let qty = 1; qty <= quantity; qty++) {
      options.push({ key: qty, text: qty.toString(), value: qty });
    }
    return options;
  }

  useEffect(() => {
    setSearchProducts(products)
  }, [products])

  useEffect(() => {
    let type = 'title'
    queryProducts(type, searchTerm)
    .then(data => setSearchProducts(data))
  }, [searchTerm])

  const addToShoppingCart = (productId, quantity) => {
    createOrder(productId, quantity)
    .then(newOrder => {
      const { orderItem, orderTotal, confirmation } = newOrder;
      handleBanner();
      dispatch({ type: ADD_ORDER, payload: orderItem });
      dispatch({ type: UPDATE_TOTAL_ORDER, payload: orderTotal });
      dispatch({ type: SET_BANNER, payload: confirmation });
    })
  }

  const removeProduct = (productId) => {
    setLoader(true)
    deleteProduct(productId, localStorage.token)
    .then(data => {
      if (data.error) {
        console.log("error", data.error)
      } else {
        const { product, confirmation } = data;
        handleBanner()
        dispatch({ type: REMOVE_PRODUCT, payload: product });
        dispatch({ type: SET_BANNER, payload: confirmation });
        setLoader(false)
      }
    })
  }

  const updateProduct = () => {
    console.log("UPDATE PRODUCT FROM PRODUCT COMPONENT!!!")
  }

  const renderProducts = () => {
    return searchProducts.map(product => (
      <CardProduct 
        key={`${product.title}-${product.id}`} 
        thisProduct={product} 
        currentUser={currentUser}
        loader={loader}
        removeProduct={removeProduct}
        updateProduct={updateProduct}

        selected={isInShoppingCart(product)}
        soldOut={isSoldOut(product)}
        quantityOptions={checkProductQuantity(product.quantity)}
        addToShoppingCart={addToShoppingCart}
        />
    ))
  }

    return (
      <Container className="products">
        <h1 className="products__title">Products</h1>
        <Divider/>
        <Form className="products__searchInput">
          <Form.Input  
            placeholder="Search for a product"
            onChange={handleChange}
            />
        </Form>
        <div className="products__gridGallery">
          {renderProducts()}
        </div>
      </Container>
  )
}

export default Product;