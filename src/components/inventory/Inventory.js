import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Divider, Form, Icon } from 'semantic-ui-react';
import { ADD_PRODUCT, DELETE_FORM, SET_BANNER, SET_FORM } from '../../store/type';
import CardProduct from '../cardProduct/CardProduct';
import ProductCreateForm from '../productCreateForm/ProductCreateForm';
import { superId } from '../../helpers';
import { newProduct } from '../../api';
import './Styles.scss';

const Inventory = ({ handleBanner }) => {

  const currentUser = useSelector(state => state.app.currentUser);
  const products = useSelector(state => state.product.products);
  const newProducts = useSelector(state => state.product.newProducts);
  const [ imageLoader, setImageLoader ] = useState(false);
  const [ createReady, setCreateReady ] = useState(true);
  const [ componentForms, setComponentForms ] = useState({});
  const [ sellerProducts, setSellerProducts] = useState([]);
  const dispatch = useDispatch();

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])

  const createIds = (e) => {
    const files = e.target.files  
    for (let index = 0; index < files.length; index++) {
      const newForm = { file: files[index], id: superId() }
      setComponentForms(prevForms => ({[newForm.id]: newForm, ...prevForms}))
    }
  };

    const removeForm = (formId, fileName) => {
      let updatedForms = { ...componentForms };
      delete updatedForms[formId];
      setComponentForms(updatedForms);
      dispatch({ type: DELETE_FORM, payload: fileName });
    }

    const renderForms = () => Object.keys(componentForms).map((key) => {
      const formId = componentForms[key].id;
      const file = componentForms[key].file;
      const fileName = componentForms[key].file.name;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName)
      formData.append("title", "")

      return <ProductCreateForm 
        key={formId} 
        removeForm={removeForm}
        formId={formId}
        file={file}
        formData={formData} />

    });

  useEffect(() => {
    setSellerProducts(findSellerProducts());
    setCreateReady(Object.keys(componentForms).length === 0);
  }, [findSellerProducts, componentForms])

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
        dispatch({ type: SET_FORM, payload: [] });
        setComponentForms({})
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
            name="files" 
            multiple
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => createIds(e)}
          />
        </div>
        <Form onSubmit={onFormSubmit}>
          {!createReady && renderForms()}
          <div className={`inventory__createBtn ${createReady && "inventory--hideCreateBtn"}`}>
            <Button 
              type="submit" 
              color="blue" 
              size="big"
              loading={imageLoader}>
              Add to Inventory
            </Button>   
          </div>
            {!createReady && <Divider/>}
        </Form>
        <div className="inventory__gridGallery">
          {displayInventory()}
        </div>
      </Container>
  )
}

export default Inventory;