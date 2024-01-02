import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  FormButton,
  CloseButton,
  CheckboxLabel,
  CheckboxInput,
  DropdownLabel,
  DropdownSelect,
} from './SettingsFormElements';
import { useAuth } from '../../AuthContext';

const SettingsForm = ({ onClose, onSubmit }) => {
  const [allegroSmart, setAllegroSmart] = useState(false);
  const [superSprzedawca, setSuperSprzedawca] = useState(false);
  const [strefaMarek, setStrefaMarek] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(''); 
  const [existingParameters, setExistingParameters] = useState([]);
  const { token } = useAuth();

  const ParameterType = {
    SMART: 'S',
    SUPER_SELLER: 'B',
    BRAND_ZONE: 'Z',
    SHIPPING_FORM: 'F',
  };

  const BooleanValue = {
    TRUE: 'T',
    FALSE: 'F',
  };

  useEffect(() => {
    // Fetch existing parameters on component mount
    fetchExistingParameters();
  }, []);

  const fetchExistingParameters = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/parameters/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      // Update state based on fetched data
      setExistingParameters(data);
      setAllegroSmart(data.find(param => param.type === ParameterType.SMART)?.value === BooleanValue.TRUE);
      setSuperSprzedawca(data.find(param => param.type === ParameterType.SUPER_SELLER)?.value === BooleanValue.TRUE);
      setStrefaMarek(data.find(param => param.type === ParameterType.BRAND_ZONE)?.value === BooleanValue.TRUE);
      setDeliveryMethod(data.find(param => param.type === ParameterType.SHIPPING_FORM)?.value || '');
  
      console.log(data);
    } catch (error) {
      console.error('Error fetching existing parameters:', error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      const updatedParameters = existingParameters.map(parameter => {
        switch (parameter.type) {
          case ParameterType.SMART:
            return { ...parameter, value: allegroSmart ? BooleanValue.TRUE : BooleanValue.FALSE };
          case ParameterType.SUPER_SELLER:
            return { ...parameter, value: superSprzedawca ? BooleanValue.TRUE : BooleanValue.FALSE };
          case ParameterType.BRAND_ZONE:
            return { ...parameter, value: strefaMarek ? BooleanValue.TRUE : BooleanValue.FALSE };
          case ParameterType.SHIPPING_FORM:
            return { ...parameter, value: deliveryMethod };
          default:
            return parameter;
        }
      });

      // Make a POST request to save the updated parameters
      const postResponse = await fetch('http://localhost:8080/api/parameters/all', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedParameters),
      });

      // Handle the response or propagate to parent component
      const postData = await postResponse.json();
      console.log('Updated parameters:', postData);

      // Trigger the onSubmit callback with the updated parameters
      onSubmit(updatedParameters);
      
      onClose();
    } catch (error) {
      console.error('Error updating parameters:', error);
    }
  };


  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormTitle>Allegro Parameters</FormTitle>

      {/* Checkbox for Allegro Smart */}
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={allegroSmart}
          onChange={() => setAllegroSmart(!allegroSmart)}
        />
        Allegro Smart!
      </CheckboxLabel>

      {/* Checkbox for Super Sprzedawca */}
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={superSprzedawca}
          onChange={() => setSuperSprzedawca(!superSprzedawca)}
        />
        Super Sprzedawca
      </CheckboxLabel>

      {/* Checkbox for Strefa Marek */}
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={strefaMarek}
          onChange={() => setStrefaMarek(!strefaMarek)}
        />
        Strefa marek
      </CheckboxLabel>

      {/* Dropdown for Delivery Method */}
      <DropdownLabel>
        Delivery method:
        <DropdownSelect
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          <option value="A">Any</option>
          <option value="P">Paczkomat</option>
          <option value="K">Kurier</option>
        </DropdownSelect>
      </DropdownLabel>

      <FormButton onClick={handleSubmit}>Save Settings</FormButton>
    </FormWrapper>
  );
};

export default SettingsForm;
