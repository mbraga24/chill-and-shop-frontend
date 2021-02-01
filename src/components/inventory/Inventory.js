import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Divider, Form, Icon } from 'semantic-ui-react';
import { ADD_PRODUCT, SET_BANNER, SET_FORM } from '../../store/type';
import CardProduct from '../cardProduct/CardProduct';
import ProductForm from '../productForm/ProductForm';
import { newProduct } from '../../api';
import './Styles.scss';

const Inventory = ({ handleBanner }) => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const newProducts = useSelector(state => state.product.newProducts);
  const [ imageLoader, setImageLoader ] = useState(false);
  const [ createReady, setCreateReady ] = useState(true);
  const [ sellerProducts, setSellerProducts] = useState([]);
  const [ productFormList, setProductFormList ] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = useCallback(( index, fileValue) => {
    console.log("DELETE index", index);
    console.log("DELETE fileValue", fileValue);
    console.log("DELETE productFormList", productFormList);
  }, [productFormList])

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])

  const handleImages = useCallback((e) => {
    const files = e.target.files ;
    const currentFormIndex = productFormList.length;
    console.log("currentFormIndex", currentFormIndex)

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("fileName", files[i].name)
      formData.append("title", "")
      
      setProductFormList(prevForm => ([<ProductForm 
        key={files[i].name} 
        deleteForm={() => handleDelete(i + currentFormIndex, formData.get("fileName"))}
        showAction={true}
        file={files[i]}
        formData={formData}
      />, ...prevForm]))
    }
  }, [productFormList, handleDelete])

  useEffect(() => {
    setSellerProducts(findSellerProducts())
    setCreateReady(productFormList.length === 0)
  }, [findSellerProducts, setCreateReady, productFormList])

  const displayInventory = () => {
    return sellerProducts.map(thisProduct => (
      <CardProduct 
        key={`${thisProduct.title}-${thisProduct.id}`} 
        thisProduct={thisProduct} 
        currentUser={currentUser} 
        handleBanner={handleBanner}
      />
    ))
  }

  const onFormSubmit = e => {
    e.preventDefault()
    setImageLoader(true);
    for (let i = 0; i < newProducts.length; i++) {
      newProduct(newProducts[i])
      .then(data => {
        const { product, confirmation } = data
        handleBanner();
        dispatch({ type: ADD_PRODUCT, payload: product });
        dispatch({ type: SET_BANNER, payload: confirmation });
        setProductFormList([])
        dispatch({ type: SET_FORM, payload: [] });
        setImageLoader(false);
      })
    }
  }

    return (
      <Container className="inventory">
        <h1  className="inventory__title">Inventory</h1>
        <Divider/>
        <div className="inventory__buttonWrapper">
          <Button type="button" htmlFor="files" as="label" color="blue">
          <Icon name='add' />
            Sell a new product
          </Button>
          <input 
            type="file" 
            id="files" 
            // name="files[]" 
            name="files" 
            multiple
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleImages(e, productFormList)}
          />
        </div>
        <Form onSubmit={onFormSubmit}>
          {productFormList}
          <div className={`inventory__createBtn ${createReady && "inventory--hideCreateBtn"}`}>
            <Button 
              type="submit" 
              color="blue" 
              loading={imageLoader}>
              Create Products
            </Button>   
          </div>
            {!createReady && <Divider/>}
        </Form>
        <Grid>
          <Grid.Row columns={4}>
            {displayInventory()}
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default Inventory;