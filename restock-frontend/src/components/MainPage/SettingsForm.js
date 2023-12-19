import React, { useState } from 'react';
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

const SettingsForm = ({ onClose, onSubmit }) => {
  const [allegroSmart, setAllegroSmart] = useState(false);
  const [superSprzedawca, setSuperSprzedawca] = useState(false);
  const [strefaMarek, setStrefaMarek] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(''); // Default empty value

  const handleSubmit = () => {
    // Validate and submit the form data
    // You can add your validation logic here
    const formData = { allegroSmart, superSprzedawca, strefaMarek, deliveryMethod };
    onSubmit(formData);
    // Close the form
    onClose();
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
        Allegro Smart
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
        Strefa Marek
      </CheckboxLabel>

      {/* Dropdown for Delivery Method */}
      <DropdownLabel>
        Delivery Method:
        <DropdownSelect
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Paczkomat">Paczkomat</option>
          <option value="Kurier">Kurier</option>
        </DropdownSelect>
      </DropdownLabel>

      <FormButton onClick={handleSubmit}>Save Settings</FormButton>
    </FormWrapper>
  );
};

export default SettingsForm;
