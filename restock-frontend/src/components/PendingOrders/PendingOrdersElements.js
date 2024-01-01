import styled, { css } from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background-color: #FAF1E4;
`;

export const PendingOrdersContainer = styled.div`
  background-color: #e0d9cf;
  padding: 20px;
  /* margin-bottom: 20px; */
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 2em;
  width: 30%;
  min-height: 100%;

  /* display: flex;
  flex-direction: column;
  align-items: center; */

  @media screen and (max-width: 815px) {
    width: 90%;
  }
`;

export const RectanglesList = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;


export const PendingOrdersButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const AcceptButton = styled.button`
  background-color: #86a660;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover, &:focus {
        background-color: #a4b888;
    }
`;

export const RejectButton = styled.button`
  background-color: #d48881;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover, &:focus {
        background-color: #b8756f;
    }
`;

export const PendingOrdersItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
  padding: 0 20px;
  background-color: ${(props) => (props.isGrey ? '#afaca7' : '#fcf5ec')};
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 7em;
    /* border: solid pink 2px; */
    

    @media screen and (max-width: 815px) {
    width: 90%;
  }
    
`;
export const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 100%; */
  
`;

export const OrderDateContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderDate = styled.p`
  font-size: 0.8em;
  margin-bottom: 5px;
`;

export const OrderStatus = styled.p`
  font-size: 0.8em;
  color: ${(props) =>
    props.isAccepted ? 'green' : props.isRejected ? 'red' : 'black'};
  /* margin-bottom: 5px; */
`;

export const OrderDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  /* border: solid pink 2px; */
  margin-top: -0.9em;
  /* height: 100%;  */
`;

export const ProductName = styled.p`
  font-size: 1em;
  margin-top: 0.7em;
  /* border: solid pink 2px; */
`;

export const OfferName = styled.p`
  font-size: 0.8em;
  /* border: solid pink 2px; */
  /* margin-bottom: 2px; */
`;

export const OrderText = styled.p`
  font-size: 0.9em;
  /* border: solid pink 2px; */
  /* margin-bottom: 2px; */
`;


export const OrderStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderStatusLabel = styled.p`
  font-size: 1em;
  margin-right: 5px;
`;

export const OrderStatusText = styled.p`
  font-size: 1em;
  color: ${(props) =>
    props.isAccepted ? 'green' : props.isRejected ? 'white' : 'white'};
  /* background-color: ${(props) =>
    props.isAccepted ? '#86a660' : props.isRejected ? '#d48881' : '#8fa9a7'}; */

background-color: ${(props) =>
    props.isAccepted
      ? '#86a660' // Green for 'Accepted'
      : props.isRejected
      ? '#d48881' // Red for 'Rejected'
      : props.isClosed
      ? 'grey' // Your color for 'Closed'
      : '#c4d1b4'}; // Default color for 'In delivery'
  padding: 5px 10px;
  border-radius: 5px;

  ${(props) =>
    props.isAccepted &&
    css`
      color: white;
    `}
`;