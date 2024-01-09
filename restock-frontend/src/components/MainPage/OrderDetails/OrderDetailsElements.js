// OrderDetailsFormElements.js
import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #9ea98f;
  padding: 1.5em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  max-width: 20%;
  /* Add more styles as needed */
`;

export const FormTitle = styled.h2`
  text-align: center;
`;

export const OrderDetailText = styled.p`
  text-align: center;
`;


export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const OrderImage = styled.img`
 max-width: 40%;
  /* margin-top: 10px; */
  margin: 0.5em;
  object-fit: contain;
`;