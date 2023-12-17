import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { RegistrationForm } from '../RegisterPage/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import {
  LoginFormContainer,
  InputContainer,
  LoginInput,
  PasswordInput,
  LoginButton,
  ButtonContainer,
  LogoContainer,
  LogoImage,
  FormContent,
  FormLabel,
  FormWrapper,
  Form,
  CreateAccountText,
  RememberMeCheckbox,
  RememberMeContainer,
  RememberMeLabel,
  ForgotPasswordLink,
  RememberOrForgotPasswordContainer,
  EyeIconContainer,
  EyeIcon,
  PasswordContainer,
  ErrorMessage
} from './LoginFormElements';
import logoBig from '../../images/logo_big.png';

export const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleToggle = () => {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      console.log('Attempting login...');
      const response = await fetch('https://localhost:443/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json(); // Assuming the API returns an error message in JSON format
        console.error('Login failed:', errorData.message);
        setError('Login failed. Please try again.');
        return;
      }
  
      // Clear the error message on successful login
      setError('');
  
      // Successful login
      const data = await response.json();
      const jwt_token = data.jwt; // Assuming the token is returned in the response

      // console.log('Token before storing:', jwt_token);
      localStorage.setItem('jwt_token', jwt_token);

  
      // TO DO: Handle the token, e.g., store it in local storage or context
      console.log('Login successful. Token:', jwt_token);
      navigate('/home'); 
      // Display a popup for successful login
      // window.alert('Login successful. Welcome!');
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Login failed. Please try again.');
    }
  };
  
  const handleCreateAccountClick = () => {
    setShowRegisterForm(true);
  };

  const handleAlreadyHaveAccountClick = () => {
    setShowRegisterForm(false);
  };

  return (
    <LoginFormContainer>
      <LogoContainer>
        <LogoImage src={logoBig} alt="Restock" />
      </LogoContainer>
      <InputContainer>
        <FormWrapper>
          <FormContent>
            <Form>
              {showRegisterForm ? (
                <>
                  <RegistrationForm />
                  <CreateAccountText onClick={handleAlreadyHaveAccountClick}>Already have an account?</CreateAccountText>
                </>
              ) : (
                <>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  <FormLabel>Username</FormLabel>
                  <LoginInput htmlFor="login" id="login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <FormLabel>Password</FormLabel>
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
                  <RememberMeContainer>
                    <RememberOrForgotPasswordContainer>
                      <RememberMeCheckbox
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <RememberMeLabel htmlFor="rememberMe">Remember me</RememberMeLabel>
                    </RememberOrForgotPasswordContainer>
                    <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
                  </RememberMeContainer>
                  <ButtonContainer>
                    <LoginButton onClick={handleLogin}>Login</LoginButton>
                    <CreateAccountText onClick={handleCreateAccountClick}>Create an account</CreateAccountText>
                  </ButtonContainer>
                </>
              )}
            </Form>
          </FormContent>
        </FormWrapper>
      </InputContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
