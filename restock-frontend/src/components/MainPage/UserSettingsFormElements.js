import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #9ea98f;
  padding: 3em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 18%; 
  width: 100%; 

  @media screen and (max-width: 815px) {
    max-width: 70%;
  }
`;

export const FormTitle = styled.h2`
  text-align: center;
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

export const FormInput = styled.input`
  /* width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 2em; */
    width: 100%;
    height: 2em;
    background-color: #FAF1E4;
    border: 0.11em solid;
    border-radius: 0.5em;
    border-color: grey;
    color: black;
    text-align: center;
    font-size: clamp(1rem, 0.9vw, 1.3rem);
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

export const SectionLabel = styled.h3`
  font-size: 1.2em;
  margin-top: 1em;
  margin-bottom: 0.5em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.3em;
`;