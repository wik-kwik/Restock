import styled from 'styled-components';

export const FormWrapper = styled.div`
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #afaca7;
  padding: 3em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

export const FormButton = styled.button`
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #bdd49d;

  &:hover, &:focus {
    background-color: #a4b888;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SectionLabel = styled.h3`
  font-size: 1.2em;
  margin-top: 1em;
  margin-bottom: 0.5em;
`;
