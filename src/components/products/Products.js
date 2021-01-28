import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Form, Divider } from 'semantic-ui-react';
import CardProduct from '../cardProduct/CardProduct';
import { queryProducts } from '../../api';

import './Styles.scss';

const Product = ({ handleBanner }) => {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchProducts, setSearchProducts ] = useState([])
  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const orders = useSelector(state => state.order.orders);

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

  const displayInventory = () => {
    return searchProducts.map(product => (
      <CardProduct 
        key={`${product.title}-${product.id}`} 
        thisProduct={product} 
        selected={isInShoppingCart(product)}
        soldOut={isSoldOut(product)}
        quantityOptions={checkProductQuantity(product.quantity)}
        currentUser={currentUser}
        handleBanner={handleBanner}
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
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Product;