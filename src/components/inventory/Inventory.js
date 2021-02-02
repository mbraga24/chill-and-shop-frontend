import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Divider, Form, Icon } from 'semantic-ui-react';
import { ADD_PRODUCT, DELETE_FORM, SET_BANNER, SET_FORM } from '../../store/type';
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
  const [ files, setFiles ] = useState([]);
  const [ componentForms, setComponentForms ] = useState({});
  const [ sellerProducts, setSellerProducts] = useState([]);
  const [ productFormList, setProductFormList ] = useState({});
  const dispatch = useDispatch();

  const findSellerProducts = useCallback(() => {
    return products.filter(pro => pro.seller.email === currentUser.email)
  }, [products, currentUser])

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // const displayProductForms = () => {
  //   // const currentFormIndex = productFormList.length;

  //   return files.map((file, index) => {

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("fileName", file.name)
  //     formData.append("title", "")

  //     // setProductFormList(prevForm => ([<ProductForm 
  //     //   key={file.name} 
  //     //   // removeForm={(e) => removeForm(e, (index + currentFormIndex, formData.get("fileName")))}
  //     //   removeForm={() => removeForm(index, formData.get("fileName"))}
  //     //   showAction={true}
  //     //   file={file}
  //     //   formData={formData}
  //     // />, ...prevForm]))

  //     return <ProductForm 
  //       key={file.name} 
  //       removeForm={(e) => removeForm(e, formData.get("fileName"))}
  //       showAction={true}
  //       file={file}
  //       formData={formData}
  //     />
  //   });
  // }


  // const handleImages = (e) => {
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     setFiles(prevFile => [...prevFile, e.target.files[i]]);
  //   }
  // }

  // this.setState(prevState => ({
  //   forms: { ...prevState.forms, [newForm.id]: newForm },
  // }));

  // const handleImages = (e) => {
  //   const files = e.target.files

    // console.log(Object.keys(e.target.files))

    // for (let index = 0; index < files.length; index++) {
      // const newForm = { id: guid() }
      // const formData = new FormData();
      // formData.append("file", files[index]);
      // formData.append("fileName", files[index].name)
      // formData.append("title", "")
      
      // const renderForms = () => Object.keys(this.state.forms).map(key => (
        
        // setProductFormList(prevForm => ({
        //   productFormList: {...prevForm.productFormList, 
        //   [newForm.id]: <ProductForm 
        //               key={files[index].name} 
        //               id={.id}
        //               removeForm={(e) => removeForm(e, formData.get("fileName"))}
        //               showAction={true}
        //               file={files[index]}
        //               formData={formData} />}
        //   }));

      // ));
    // }
  // }

  const createIds = (e) => {
    const files = e.target.files
    let myFormHash = {}
    console.log("files.length", files.length)
    
    for (let index = 0; index < files.length; index++) {
      const superId = guid()
      const newForm = { file: files[index], id: superId }
      // console.log(newForm.file)
      // console.log(newForm.id)
      // myFormHash= { ...myFormHash, [superId]: newForm } // => IT WORKS BUT IT DOES NOT ADD NEW ONE
      // myFormHash= { ...myFormHash, [superId]: newForm } // => IT WORKS BUT IT DOES NOT ADD NEW ONE

      // this.setState(prevState => ({
      //   forms: { ...prevState.forms, [newForm.id]: newForm },
      // }));
      setComponentForms(myFormHash);
    }
  };

    const removeForm = formId => {
      console.log("REMOVE FORM", formId)
      let updatedForms = { ...componentForms };
      console.log("componentForms", updatedForms)
      
      delete updatedForms[formId];
      setComponentForms(updatedForms)
    }


      
    const renderForms = () => Object.keys(componentForms).map((key, index) => {

        console.log("index", index)
        console.log("forms[key].file", componentForms[key].file)
        console.log("forms[key].fileName", componentForms[key].file.name)
        console.log("forms[key].id", componentForms[key].id)

      const formData = new FormData();
      formData.append("file", componentForms[key].file);
      formData.append("fileName", componentForms[key].file.name)
      formData.append("title", "")

      return <ProductForm 
        key={componentForms[key].id} 
        removeForm={removeForm}
        formId={componentForms[key].id}
        showAction={true}
        file={componentForms[key].file}
        formData={formData} />

    });


  useEffect(() => {
    setSellerProducts(findSellerProducts())
    // if (files.length !== 0) {
    //   console.log("FILES LENGTH")
      // setProductFormList([...displayProductForms()])
    // }
    // setCreateReady(productFormList.length === 0)
  }, [findSellerProducts])

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

  console.log("componentForms", componentForms)

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
            onChange={(e) => createIds(e)}
          />
        </div>
        <Form onSubmit={onFormSubmit}>
          {true && renderForms()}
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