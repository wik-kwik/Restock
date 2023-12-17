// RegistrationForm.js
import React, { useState } from 'react';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import {
  RegistrationFormWrapper,
  RegistrationFormLabel,
  RegistrationFormInput,
  ButtonContainer,
  RegistrationFormButton,
  EyeIconContainer,
  PasswordContainer,
  PasswordInput,
  ConfirmPasswordInput,
  EyeIcon,
  ErrorMessage,
  SuccessMessage
} from './RegistrationFormElements';

export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setRegistrationSuccess(false);
      return;
    }

    // Clear the error when passwords match
    setError('');

    try {
      const response = await fetch('https://localhost:443/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Handle successful registration
      setRegistrationSuccess(true);
      console.log('User registered successfully');
      // ------> Printuje w consoli, że jest false, mimo sukcesu - do ogarnięcia
      console.log('registrationSuccess:', registrationSuccess);
    } catch (error) {
      console.error('Error during registration:', error.message);
      setError('Registration failed. Please try again.');
      setRegistrationSuccess(false);
    }
  };

  const handleToggle = () => {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
  };

  return (
    <RegistrationFormWrapper>
      <form>
        <RegistrationFormLabel>Username:</RegistrationFormLabel>
        <RegistrationFormInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <RegistrationFormLabel>Password:</RegistrationFormLabel>
        <PasswordContainer>
          <PasswordInput
            htmlFor="password"
            type={type}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
          />
          <EyeIconContainer onClick={handleToggle}>
            <EyeIcon icon={icon} size={20} />
          </EyeIconContainer>
        </PasswordContainer>
        <RegistrationFormLabel>Confirm Password:</RegistrationFormLabel>
        <PasswordContainer>
          <ConfirmPasswordInput
            htmlFor="confirmPassword"
            type={type}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showPassword}
          />
          <EyeIconContainer onClick={handleToggle}>
            <EyeIcon icon={icon} size={20} />
          </EyeIconContainer>
        </PasswordContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {registrationSuccess && <SuccessMessage>Successful registration. Welcome!</SuccessMessage>}
        <ButtonContainer>
          <RegistrationFormButton type="button" onClick={handleRegister}>
            Register
          </RegistrationFormButton>
        </ButtonContainer>
      </form>
    </RegistrationFormWrapper>
  );
};

export default RegistrationForm;
