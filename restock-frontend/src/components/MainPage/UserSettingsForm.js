// UserSettingsForm.js
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
  SectionLabel,
} from './UserSettingsFormElements';

const UserSettingsForm = ({ onClose, onSubmit, username }) => {
  const [userSetting1, setUserSetting1] = useState(false);
  const [userSetting2, setUserSetting2] = useState(false);
  const [userSetting3, setUserSetting3] = useState('');
  const [userSetting4, setUserSetting4] = useState('');

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');

  const handleSubmit = () => {
    const formData = {
      userSetting1,
      userSetting2,
      userSetting3,
      userSetting4,
      personalInfo: {
        lastName,
        firstName,
        country,
        postalCode,
        city,
        address,
        apartment,
      },
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormTitle>User Settings</FormTitle>

      {/* Display the username label */}
      <SectionLabel>User: {username}</SectionLabel>

      {/* Checkboxes and dropdowns */}
      {/* ... existing code ... */}

      {/* Personal Information Section */}
      <SectionLabel>Personal Information</SectionLabel>
      <FormInput
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Apartment"
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
      />

      <FormButton onClick={handleSubmit}>Save User Settings</FormButton>
    </FormWrapper>
  );
};

export default UserSettingsForm;
