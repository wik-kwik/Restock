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
  width: 18%;

  @media screen and (max-width: 815px) {
    width: 70%;
  }
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.3em;
`;

export const FormInput = styled.input`
  width: 100%;
  margin: 0.1em;
  padding: 0.1em;
  /* border: 1px solid #ccc;
  border-radius: 4px; */
    height: 2em;
    background: #FAF1E4;
    border: 0.11em solid;
    border-radius: 0.5em;
    border-color: grey;
    color: black;
    text-align: center;
    font-size: clamp(1rem, 0.9vw, 1.3rem);
    
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.3em;
  gap: 0.3em;
`;

export const FormButton = styled.button`
  color: black;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #86a660;
  margin-top: 1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &:hover, &:focus {
        background-color: #a4b888;
    }
`;

export const RemoveButton = styled.button`
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #d48881;
  margin-top: 1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &:hover, &:focus {
        background-color: #b8756f;
    }
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.2em;
  /* margin-bottom: 15px; */
`;

export const FormLabel = styled.label`
  font-size: 0.9em;
  margin-bottom: 5px;
  
`;