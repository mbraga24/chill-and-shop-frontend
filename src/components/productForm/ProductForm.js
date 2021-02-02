import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Icon } from 'semantic-ui-react';
import { ADD_FORM, UPDATE_FORM } from '../../store/type';
import useFormFields from '../../hooks/useFormFields';
import './Styles.scss';

const ProductForm = ({ removeForm, formId, file, formData }) => {

  const dispatch = useDispatch();
  const newProducts = useSelector(state => state.product.newProducts);
  const [ placeholder, setPlaceholder ] = useState(null);
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    price: "",
    quantity: ""
  });

  const handleRemove = () => {
    removeForm(formId, file.name);
  }

  useEffect(() => {
    setPlaceholder("./images/placeholder-product.png");
    setPlaceholder(URL.createObjectURL(file));
  }, [file])

  const handleData = useCallback(() => {
    if (!newProducts.find(data => data.get("fileName") === formData.get("fileName"))) {
      dispatch({ type: ADD_FORM, payload: formData })
    } else {
      formData.set("title", fields.title)
      formData.set("price", fields.price)
      formData.set("quantity", fields.quantity)
      dispatch({ type: UPDATE_FORM, payload: formData })
    }
  }, [newProducts, formData, dispatch, fields])

  useEffect(() => {
    handleData();
  }, [fields])
  
    return (
    <div className="productForm">
        <Card className="productForm__card">
          <Card.Content>
            <img src={`${placeholder}`} alt={file.fileName} className="productForm__picture" />
          </Card.Content>
        </Card>
        <div className="productForm__form">
          <Form.Field>
            <Form.Input
            name="title"
            fluid
            label="Product title"
            placeholder="Leather Shoes"
            onChange={handleFieldChange}
            />
           <Form.Group widths='equal'>             
            <Form.Input 
            name="price"
            fluid 
            label='Price' 
            placeholder="$39.99" 
            onChange={handleFieldChange}
            />
            <Form.Input 
            name="quantity"
            fluid 
            label="Quantity" 
            placeholder='2' 
            onChange={handleFieldChange}
            />
          </Form.Group>
            <Button type="button" color="red" size="small" onClick={handleRemove}>
              <Icon name='cancel' /> Remove Product
            </Button>    
          </Form.Field>
        </div>
    </div>
  )
}

export default ProductForm;
