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

  const handleSubmit = () => {
    // Validate and submit the form data
    // You can add your validation logic here
    const formData = { productName, maxPrice, preferredBrand, amountOrKilograms };
    onSubmit(formData);
    // Close the form
    onClose();
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormTitle>Create a New Device</FormTitle>
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
      <FormInput
        type="text"
        placeholder="Amount/Kilograms"
        value={amountOrKilograms}
        onChange={(e) => setAmountOrKilograms(e.target.value)}
      />
      <FormButton onClick={handleSubmit}>Submit</FormButton>
    </FormWrapper>
  );
};

export default AddDeviceForm;
