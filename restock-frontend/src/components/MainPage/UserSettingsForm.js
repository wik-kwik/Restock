import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  CloseButton,
  SectionLabel,
  Row
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

      const response = await fetch('http://localhost:8080/api/address?id=1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('User address updated successfully!');
        onClose();
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

      {/* <SectionLabel>Personal Information</SectionLabel> */}

      {/* First Row: First Name and Last Name */}
      <Row>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <FormInput
            id="firstName"
            type="text"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <FormInput
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </FormGroup>
      </Row>

      {/* Second Row: Street */}
      <FormGroup>
        <FormLabel htmlFor="street">Street</FormLabel>
        <FormInput
          id="street"
          type="text"
          placeholder="Street"
          value={user.street}
          onChange={(e) => setUser({ ...user, street: e.target.value })}
        />
      </FormGroup>

      {/* Third Row: House Number, Postal Code, and City */}
      <Row>
        <FormGroup>
          <FormLabel htmlFor="houseNumber">House Number</FormLabel>
          <FormInput
            id="houseNumber"
            type="text"
            placeholder="House Number"
            value={user.houseNumber}
            onChange={(e) => setUser({ ...user, houseNumber: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
          <FormInput
            id="postalCode"
            type="text"
            placeholder="Postal Code"
            value={user.postalCode}
            onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="city">City</FormLabel>
          <FormInput
            id="city"
            type="text"
            placeholder="City"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </FormGroup>
      </Row>

      {/* Last Row: Email and Phone Number */}
      <Row>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <FormInput
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </FormGroup>
      </Row>

      <FormButton onClick={handleSubmit}>Save User Settings</FormButton>
    </FormWrapper>
  );
};

export default UserSettingsForm;
