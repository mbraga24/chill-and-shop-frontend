import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Form, Divider } from 'semantic-ui-react';
import CardItem from '../cardItem/CardItem';
import { queryProducts } from '../../api';

import './Styles.scss';

const Product = ({ handleBanner }) => {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchProducts, setSearchProducts ] = useState([])
  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
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
    return searchProducts.map(item => (
      <CardItem 
        key={`${item.title}-${item.id}`} 
        item={item} 
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
            placeholder="Search for an item"
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