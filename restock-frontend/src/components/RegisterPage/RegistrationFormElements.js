import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { eyeSlash } from 'react-icons-kit/fa/eyeSlash';

export const RegistrationFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  padding: 3em;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #FAF1E4;
`;

export const RegistrationFormContent = styled.div`
  min-width: 100%;
`;

export const RegistrationFormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 1em;
`;

export const RegistrationFormInput = styled.input`
  width: 95%;
  padding: 8px;
  margin-bottom: 16px;
  border: 0.11em solid grey;
  border-radius: 0.5em;
  background-color: #BAC7A7;
  color: black;
  text-align: center;
  font-size: 1em;
`;


export const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 1em;
  width: 100%; 
  margin-right: 0.2em;
`;

export const PasswordInput = styled.input`
  /* min-width: 150%; */
  width: 100%;
  /* height: 28%; */
  position: relative;
  height: 2em;
  background: #BAC7A7;
  border: 0.11em solid;
  border-radius: 0.5em;
  border-color: grey;
  color: black;
  text-align: center;
  font-size: clamp(1rem, 0.9vw, 1.3rem);
`;

export const ConfirmPasswordInput = styled.input`
  /* min-width: 150%; */
  width: 100%;
  /* height: 28%; */
  position: relative;
  height: 2em;
  background: #BAC7A7;
  border: 0.11em solid;
  border-radius: 0.5em;
  border-color: grey;
  color: black;
  text-align: center;
  font-size: clamp(1rem, 0.9vw, 1.3rem);
`;

export const EyeIconContainer = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const EyeIcon = styled(Icon)`
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RegistrationFormButton = styled.button`
  text-align: center;
  padding: 0.4em 0.9em;
  border-radius: 0.5em;
  border: 0;
  background-color: #CEDEBD;
  color: black;
  cursor: pointer;
  margin-top: 1em;
  font-family: "Roboto";
  font-size: clamp(1rem, 0.9vw, 1.3rem);

  &:hover, &:focus {
    background-color: #9EB384;
  }
`;

export const BackToLoginText = styled.span`
  color: blue;
  cursor: pointer;
  margin-top: 1em;
  font-size: 1em;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5em;
  text-align: center;
`;