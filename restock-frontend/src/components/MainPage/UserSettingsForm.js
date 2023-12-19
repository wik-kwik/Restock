import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  FormButton,
  CloseButton,
  SectionLabel,
} from './UserSettingsFormElements';

const UserSettingsForm = ({ onClose, onSubmit, userId }) => {
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    street: '',
    house_number: '',
    postal_code: '',
    city: '',
    phone_number: '',
    email: '',
    create_date: '',
    modify_date: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/address/all`);
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

  }, [userId]);

  const handleSubmit = async () => {
    try {
      // Make a POST request to update the user's address
      const response = await fetch('http://localhost:8080/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          last_name: user.last_name,
          first_name: user.first_name,
          street: user.street,
          house_number: user.house_number,
          postal_code: user.postal_code,
          city: user.city,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('User address updated successfully!');
        onClose(); // Close the form after successful update
      } else {
        console.error('Failed to update user address:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user address:', error);
    }
  };

  return (
    <FormWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormTitle>User Settings</FormTitle>

      <SectionLabel>Personal Information</SectionLabel>
      <FormInput
        type="text"
        placeholder="Last Name"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="First Name"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Street"
        value={user.street}
        onChange={(e) => setUser({ ...user, street: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="House Number"
        value={user.house_number}
        onChange={(e) => setUser({ ...user, house_number: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Postal Code"
        value={user.postal_code}
        onChange={(e) => setUser({ ...user, postal_code: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="City"
        value={user.city}
        onChange={(e) => setUser({ ...user, city: e.target.value })}
      />

      <FormButton onClick={handleSubmit}>Save User Settings</FormButton>
    </FormWrapper>
  );
};

export default UserSettingsForm;
