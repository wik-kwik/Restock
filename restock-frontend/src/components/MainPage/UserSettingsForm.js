import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormInput,
  FormButton,
  CloseButton,
  SectionLabel,
} from './UserSettingsFormElements';
import { useAuth } from '../../AuthContext';


const UserSettingsForm = ({ onClose, onSubmit, userId }) => {
  const { token } = useAuth();
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    email: '',
    createDate: '',
    modifyDate: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/address?id=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setUser(userData);
        // console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [token]);
  

  const handleSubmit = async () => {
    try {
      const requestBody = {
        id: 1,
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        houseNumber: user.houseNumber,
        postalCode: user.postalCode,
        city: user.city,
        phoneNumber: user.phoneNumber,
        email: user.email,
      };
  
      // Make a POST request to update the user's address
      const response = await fetch('http://localhost:8080/api/address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assuming 'token' is defined somewhere
        },
        body: JSON.stringify(requestBody),
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
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
        value={user.houseNumber}
        onChange={(e) => setUser({ ...user, houseNumber: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Postal Code"
        value={user.postalCode}
        onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="City"
        value={user.city}
        onChange={(e) => setUser({ ...user, city: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
      />

      <FormButton onClick={handleSubmit}>Save User Settings</FormButton>
    </FormWrapper>
  );
};

export default UserSettingsForm;
