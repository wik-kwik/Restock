import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #afaca7; */
  background-color: #9ea98f;
  padding: 3em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 815px) {
    width: 60%;
  }
`;

export const FormTitle = styled.h2`
  text-align: center;
`;

export const FormInput = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #FAF1E4;
`;

export const FormButton = styled.button`
  color: black;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #c7aca7;
  margin-top: 1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &:hover,
  &:focus {
    background-color: #d8c1c6;
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  
`;


export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const CheckboxInput = styled.input`
  margin-right: 5px;
`;

export const DropdownLabel = styled.label`
  display: block;
  margin: 10px 0;

`;

export const DropdownSelect = styled.select`
  color: black;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e9dbde;
`;
