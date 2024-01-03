import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  FormButton,
  CloseButton,
  FormGroup,  // Import FormGroup from the original file
  FormLabel,  // Import FormLabel from the original file
} from './AddDeviceFormElements';
import { useAuth } from '../../AuthContext';

const AddDeviceForm = ({ onClose, onSubmit, sensorId }) => {

  const [sensorData, setSensorData] = useState({
    location: '',
    thresholdForUpdate: '',
    thresholdForOrder: '',
    productName: '',
    maxPrice: '',
    preferredBrand: '',
  });

  const { token } = useAuth();

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
        console.log(sensorData);
        // console.log(sensorData.sensor.location);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, [token, sensorId]);

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:8080/api/sensors?id=${sensorData.sensorId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update sensor. Status: ${response.status}`);
      }

      const updatedSensorData = await response.json();
      console.log('Updated Sensor Data:', updatedSensorData);

      onClose();
    } catch (error) {
      console.error('Error updating sensor:', error.message);
      // Handle the error accordingly (e.g., show an error message)
    }
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>

      <FormTitle>
        <strong>{sensorData.sensor && sensorData.sensor.name}</strong> sensor settings
      </FormTitle>

      {/* Location Input */}
      <FormGroup>
        <FormLabel htmlFor="location">Location</FormLabel>
        <FormInput
          type="text"
          id="location"
          placeholder="Location"
          value={sensorData.sensor ? sensorData.sensor.location : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), location: e.target.value },
            })
          }
        />
      </FormGroup>

      {/* Threshold for Update Input */}
      <FormGroup>
        <FormLabel htmlFor="thresholdForUpdate">Threshold for Update</FormLabel>
        <FormInput
          type="text"
          id="thresholdForUpdate"
          placeholder="Threshold for Update"
          value={sensorData.sensor ? sensorData.sensor.thresholdForUpdate : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), thresholdForUpdate: e.target.value },
            })
          }
        />
      </FormGroup>

      {/* Threshold for Order Input */}
      <FormGroup>
        <FormLabel htmlFor="thresholdForOrder">Threshold for Order</FormLabel>
        <FormInput
          type="text"
          id="thresholdForOrder"
          placeholder="Threshold for Order"
          value={sensorData.sensor ? sensorData.sensor.thresholdForOrder : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), thresholdForOrder: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormTitle>Product configuration</FormTitle>

      {/* Product Name Input */}
      <FormGroup>
        <FormLabel htmlFor="productName">Product Name</FormLabel>
        <FormInput
          type="text"
          id="productName"
          placeholder="Product Name"
          value={sensorData.sensor ? sensorData.sensor.productName : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), productName: e.target.value },
            })
          }
        />
      </FormGroup>

      {/* Maximum Price Input */}
      <FormGroup>
        <FormLabel htmlFor="maxPrice">Maximum Price</FormLabel>
        <FormInput
          type="text"
          id="maxPrice"
          placeholder="Maximum Price"
          value={sensorData.sensor ? sensorData.sensor.maxPrice : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), maxPrice: e.target.value },
            })
          }
        />
      </FormGroup>

      {/* Preferred Brand Input */}
      <FormGroup>
        <FormLabel htmlFor="preferredBrand">Preferred Brand</FormLabel>
        <FormInput
          type="text"
          id="preferredBrand"
          placeholder="Preferred Brand"
          value={sensorData.sensor ? sensorData.sensor.preferredBrand : ''}
          onChange={(e) =>
            setSensorData({
              ...sensorData,
              sensor: { ...(sensorData.sensor || {}), preferredBrand: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormButton onClick={handleSubmit}>Submit</FormButton>
    </FormWrapper>
  );
};

export default AddDeviceForm;