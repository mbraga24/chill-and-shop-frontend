import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Button, Divider } from 'semantic-ui-react'
import CardItem from '../cardItem/CardItem';
import ProductForm from '../productForm/ProductForm'

import './Styles.scss';

const Inventory = () => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const [ sellerProducts, setSellerProducts] = useState([])
  const [ productFormList, setProductFormList ] = useState([]);

  const handleDeleteComponent = index => {
    const productForms = [...productFormList]
    productForms.splice(index, 1);
    setProductFormList([...productForms])
  }

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.user.email === currentUser.email)
  }, [products, currentUser])

  useEffect(() => {
    setSellerProducts(findSellerProducts())
  }, [findSellerProducts])

  const addFormOnClick = e => {
    let formNumber = productFormList.length
    setProductFormList(productFormList.concat(<ProductForm 
            key={formNumber} 
            formNumber={formNumber} 
            click={() => handleDeleteComponent(formNumber)}
            showAction={true}
            />));
  };

  const displayInventory = () => {
    return sellerProducts.map(item => (
      <CardItem key={`${item.name}-${item.id}`} item={item} currentUser={currentUser}/>
    ))
  }

    return (
      <Container className="inventory">
        <h1  className="inventory__title">Inventory</h1>
        <Divider/>
        <div className="inventory__buttonWrapper">
          <Button icon='add' color="blue" onClick={addFormOnClick}>
            Sell a new product
          </Button>
        </div>
        {productFormList}
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;