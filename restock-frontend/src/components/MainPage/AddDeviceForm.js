import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  ButtonWrapper,
  FormButton,
  CloseButton,
  FormGroup,
  FormLabel,
  RemoveButton
} from './AddDeviceFormElements';
import { useAuth } from '../../AuthContext';

const AddDeviceForm = ({ onClose, onSubmit, onRemove, sensorId }) => {
  const [sensorData, setSensorData] = useState({
    id: '',
    type: '',
    name: '',
    product: '',
    preferredAmount: '',
    preferredBrand: '',
    thresholdForUpdate: '',
    thresholdForOrder: '',
  });

  const [displayName, setDisplayName] = useState('');
  const { token } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/sensors?id=${sensorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sensorData = await response.json();
        setSensorData(sensorData);
        setDisplayName(sensorData.name);
        console.log(sensorData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, [token, sensorId]);

  const validateForm = () => {
    if (
      (!sensorData.name || !sensorData.name.trim()) ||
      (!sensorData.product || !sensorData.product.trim()) ||
      (!sensorData.thresholdForUpdate || !String(sensorData.thresholdForUpdate).trim()) ||
      (!sensorData.thresholdForOrder || !String(sensorData.thresholdForOrder).trim())
    ) {
      setError('Please fill in the required fields.');
      return false;
    }
    setError('');
    return true;
  };
  

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/sensors?id=${sensorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Sensor removed");

      if (!response.ok) {
        throw new Error(`Failed to remove sensor. Status: ${response.status}`);
      }

      onRemove();

      onClose();
    } catch (error) {
      console.error('Error removing sensor:', error.message);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const apiUrl = `http://localhost:8080/api/sensors?id=${sensorData.id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sensorData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update sensor. Status: ${response.status}`);
      }

      const updatedSensorData = await response.json();
      console.log('Updated Sensor Data:', updatedSensorData);

      onSubmit(updatedSensorData);

      onClose();
    } catch (error) {
      console.error('Error updating sensor:', error.message);
    }
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>

      <FormTitle>
        <strong>Sensor settings</strong>
      </FormTitle>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <FormGroup>
        <FormLabel htmlFor="name">Sensor Name</FormLabel>
        <FormInput
          type="text"
          id="name"
          placeholder="Sensor Name"
          value={sensorData.name}
          onChange={(e) => setSensorData({ ...sensorData, name: e.target.value })}
        />
      </FormGroup>
 {/* Threshold for Update Input */}
 <FormGroup>
        <FormLabel htmlFor="thresholdForUpdate">Threshold for Update</FormLabel>
        <FormInput
          type="text"
          id="thresholdForUpdate"
          placeholder="Threshold for Update"
          value={sensorData.thresholdForUpdate}
          onChange={(e) => setSensorData({ ...sensorData, thresholdForUpdate: e.target.value })}
          style={{ opacity: sensorData.type === 'B' ? 0.5 : 1, cursor: sensorData.type === 'B' ? 'not-allowed' : 'auto' }}
          disabled={sensorData.type === 'B'}
        />
      </FormGroup>

      {/* Threshold for Order Input */}
      <FormGroup>
        <FormLabel htmlFor="thresholdForOrder">Threshold for Order</FormLabel>
        <FormInput
          type="text"
          id="thresholdForOrder"
          placeholder="Threshold for Order"
          value={sensorData.thresholdForOrder}
          onChange={(e) => setSensorData({ ...sensorData, thresholdForOrder: e.target.value })}
          style={{ opacity: sensorData.type === 'B' ? 0.5 : 1, cursor: sensorData.type === 'B' ? 'not-allowed' : 'auto' }}
          disabled={sensorData.type === 'B'}
        />
      </FormGroup>

      <FormTitle>Product configuration</FormTitle>

           {/* Product Name Input */}
           <FormGroup>
  <FormLabel htmlFor="product">Product Name</FormLabel>
  <FormInput
    type="text"
    id="product"
    placeholder="Product Name"
    value={sensorData.product}
    onChange={(e) => setSensorData({ ...sensorData, product: e.target.value })}
  />
</FormGroup>
     {/* Preferred Brand Input */}
     <FormGroup>
        <FormLabel htmlFor="preferredBrand">Preferred Brand</FormLabel>
        <FormInput
          type="text"
          id="preferredBrand"
          placeholder="Preferred Brand"
          value={sensorData.preferredBrand}
          onChange={(e) => setSensorData({ ...sensorData, preferredBrand: e.target.value })}
        />
      </FormGroup>

       {/* Preferred Amount Input */}
       <FormGroup>
        <FormLabel htmlFor="preferredAmount">Preferred Amount</FormLabel>
        <FormInput
          type="text"
          id="preferredAmount"
          placeholder="Preferred Amount"
          value={sensorData.preferredAmount}
          onChange={(e) => setSensorData({ ...sensorData, preferredAmount: e.target.value })}
        />
      </FormGroup>

      <ButtonWrapper>
        <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
        <FormButton onClick={handleSubmit}>Submit</FormButton>
      </ButtonWrapper>

    </FormWrapper>
  );
};

export default AddDeviceForm;