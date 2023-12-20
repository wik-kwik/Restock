import React, { useState } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  FormButton,
  CloseButton,
} from './AddDeviceFormElements';

const AddDeviceForm = ({ onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [preferredBrand, setPreferredBrand] = useState('');
  const [amountOrKilograms, setAmountOrKilograms] = useState('');

  // New state variables for Sensors settings MODEL-1
  const [location, setLocation] = useState('');
  const [thresholdForUpdate, setThresholdForUpdate] = useState('');
  const [thresholdForOrder, setThresholdForOrder] = useState('');

  const handleSubmit = () => {
    // Validate and submit the form data
    // You can add your validation logic here
    const formData = {
      productName,
      maxPrice,
      preferredBrand,
      amountOrKilograms,
      location,
      thresholdForUpdate,
      thresholdForOrder,
    };
    onSubmit(formData);
    // Close the form
    onClose();
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {/* <FormTitle>Add a new product</FormTitle> */}

      <FormTitle>Sensor settings MODEL-1</FormTitle>
      <FormInput
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Threshold for Update"
        value={thresholdForUpdate}
        onChange={(e) => setThresholdForUpdate(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Threshold for Order"
        value={thresholdForOrder}
        onChange={(e) => setThresholdForOrder(e.target.value)}
      />
      <FormTitle>Product configuration</FormTitle>
      <FormInput
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Maximum Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Preferred Brand"
        value={preferredBrand}
        onChange={(e) => setPreferredBrand(e.target.value)}
      />
      {/* <FormInput
        type="text"
        placeholder="Amount/Kilograms"
        value={amountOrKilograms}
        onChange={(e) => setAmountOrKilograms(e.target.value)}
      /> */}
      <FormButton onClick={handleSubmit}>Submit</FormButton>
    </FormWrapper>
  );
};

export default AddDeviceForm;
