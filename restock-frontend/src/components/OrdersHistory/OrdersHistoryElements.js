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

export const OrdersHistoryContainer = styled.div`
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


export const OrdersHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => (props.isGrey ? '#afaca7' : '#fcf5ec')};
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 7em;

  @media screen and (max-width: 815px) {
    width: 90%;
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
  padding: 0.1em;
  /* border: solid pink 2px; */
  font-size: clamp(0.8em, 1vw, 1em);

  @media screen and (max-width: 1212px) {
    font-size: clamp(0.5em, 1vw, 0.7em);
  }

  @media screen and (max-width: 815px) {
    font-size: clamp(0.8em, 1vw, 1em);
  }
`;

export const OfferName = styled.p`
  font-size: 0.8em;
  /* border: solid pink 2px; */
  /* margin-bottom: 2px; */
`;

export const OrderText = styled.p`
  font-size: 0.9em;
  min-width: 200%;
  /* border: solid pink 2px; */
  /* margin-bottom: 2px; */
  font-size: clamp(0.7em, 1vw, 0.8rem);

  @media screen and (max-width: 1188px) {
    font-size: clamp(0.6em, 1vw, 0.6em);
    min-width: 200%;
  }

  @media screen and (max-width: 815px) {
    font-size: clamp(0.6em, 1vw, 0.8em);
    min-width: 200%;
  }
`;


export const OrderStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* border: solid pink 1px; */

  @media screen and (max-width: 971px) {
    width: 6em;
    height: 3em; 
    font-size: clamp(0.5em, 1vw, 0.7em);
  }

  @media screen and (max-width: 815px) {
    width: 10em;
  }


`;

export const OrderStatusLabel = styled.p`
  font-size: 1em;
  margin-right: 5px;

  @media screen and (max-width: 815px) {
      font-size: clamp(1.2em, 1vw, 1.5em);
      width: 200%;
  }
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
      ? 'grey' // Grey for 'Closed'
      : '#c4d1b4'}; // Default color for 'In delivery'
  padding: 5px 10px;
  border-radius: 5px;

  ${(props) =>
    props.isAccepted &&
    css`
      color: white;
    `}

    @media screen and (max-width: 815px) {
      font-size: clamp(1.2em, 1vw, 1.5em);
      width: 5em;
  }
`;