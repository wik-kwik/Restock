import styled, { css } from 'styled-components';
import { CiUser, CiSettings, CiLogout } from "react-icons/ci";
import { RiMoreLine } from "react-icons/ri";


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9ea98f;
  padding: 0.2em;
`;


export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  max-width: 26%;
  height: auto;
  /* max-height: 20%; */
  margin-right: 1em;
  margin-left: 1em;

  @media screen and (max-width: 600px) {
    max-width: 50%; /* Set max-width to 100% for smaller screens */
  }
`;


export const Navbar = styled.div`
  display: flex;
  align-items: center;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  background-color: #9ea98f;
  padding: 1em;
`;

export const NavbarIcons = styled.div`
  display: flex;
  align-items: center;
`;

export const AddressIcon = styled(CiUser)`
  width: 2em;
  height: 2em;
  margin-right: 10px;
  cursor: pointer;
`;

export const LogoutIcon = styled(CiLogout)`
  width: 2em;
  height: 2em;
  cursor: pointer;
`;

export const SettingsIcon = styled(CiSettings)`
  width: 2em;
  height: 2em;
  cursor: pointer;
  margin-right: 10px;
`;

export const ViewAllIconWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

export const ViewAllIcon = styled(RiMoreLine)`
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
  /* margin-top: 1em; */
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #FAF1E4;
  overflow: hidden;
  padding: 1em;
  gap: 0.5em;

  /* @media screen and (max-width: 971px) {
    flex-direction: column;
  } */

  @media screen and (max-width: 815px) {
    flex-direction: column;
  }
`;



export const Label = styled.h2`
  font-size: 1.5em;
  color: #333;
  /* padding-top: 0.3em; */

  @media screen and (max-width: 971px) {
    font-size: clamp(1em, 1vw, 1.2em);
  }
`;

export const LeftSide = styled.div`
  flex: 1;
  padding: 20px;
`;

export const RightSide = styled.div`
  flex: 1;
  padding: 20px;
`;


export const MyDevicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  background-color: #f0f0f0;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #e0d9cf;
  margin-top: 2em;
  width: 50%;
  min-height: 100%;

  @media screen and (max-width: 971px) {
    width: 30%;
  }

  @media screen and (max-width: 815px) {
    width: 90%;
  }
`;

export const MyDevicesTitleContainer = styled.div`
  min-width: 100%;
  /* margin-left: 8em; */

  /* @media screen and (max-width: 815px) {
    margin-left: 0em;
  } */

  @media screen and (max-width: 971px) {
    font-size: clamp(1em, 1vw, 1.2em);
  }
`;


export const DeviceBox = styled.div`
  position: relative;
  background-color: #fcf5ec;
  padding: 15px;
  width: 20em;
  height: 7em; 
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1735px) {
    width: 19em;
    height: 8em; 
  }

  @media screen and (max-width: 1664px) {
    width: 18em;
    height: 7em; 
  }

  @media screen and (max-width: 1594px) {
    width: 17em;
    height: 7em; 
  }

  @media screen and (max-width: 1383px) {
    width: 13.5em;
    height: 6em; 
  }

  @media screen and (max-width: 971px) {
    width: 6em;
    height: 3em; 
  }

  @media screen and (max-width: 963px) {
    width: 10em;
    height: 3em; 
  }

  @media screen and (max-width: 815px) {
  width: 7em;
  height: 4em; 
  }
`;

export const AddButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
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

export const PurchaseHistoryContainer = styled.div`
  background-color: #e0d9cf;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 2em;
  width: 30%;
  mix-blend-mode: 100%;

  /* display: flex;
  flex-direction: column;
  align-items: center;
  flex:1; */

  @media screen and (max-width: 815px) {
    width: 90%;
  }
`;

export const RectanglesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Rectangle = styled.li`
  width: 100%;
  height: 3.5em;
  
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

export const PendingOrdersText = styled.p`
  flex: 1;
`;

export const PendingOrdersButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const AcceptButton = styled.button`
  background-color: #86a660;
  color: white;
  display: flex;
  padding: 10px;
  border: none;
  border-radius: 4px;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;

  &:hover, &:focus {
        background-color: #a4b888;
    }

    @media screen and (max-width: 971px) {
    width: 4.5em;
    height: 3em; 
    font-size: clamp(0.5em, 1vw, 0.7em);
  }

  @media screen and (max-width: 815px) {
    width: 100%;
    height: 100%;
    font-size: clamp(0.6em, 1vw, 0.8em);
  }
`;

export const RejectButton = styled.button`
  background-color: #d48881;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  &:hover, &:focus {
        background-color: #b8756f;
    }

    @media screen and (max-width: 971px) {
    width: 4.5em;
    height: 3em; 
    font-size: clamp(0.5em, 1vw, 0.7em);
  }

  @media screen and (max-width: 815px) {
    width: 100%;
    height: 100%;
    font-size: clamp(0.6em, 1vw, 0.8em);
  }
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderDateContainer = styled.div`
  display: flex;
  align-items: center;

`;

export const OrderDate = styled.p`
  font-size: 0.8em;
  margin-bottom: 0.1em;
  font-size: clamp(0.7em, 1vw, 0.8rem);
  min-width: 200%;
  padding: 0.1em;

  @media screen and (max-width: 847px) {
    min-width: 200%; 
    margin-bottom: 0.3em;
    padding-bottom: 1.5em;
    }

    @media screen and (max-width: 815px) {
    min-width: 200%; 
    margin-bottom: 0.3em;
    padding-bottom: 0em;
    }
`;

export const OrderStatus = styled.p`
  font-size: 0.8em;
  color: ${(props) =>
    props.isAccepted ? 'green' : props.isRejected ? 'red' : 'black'};
  /* margin-bottom: 5px; */

  @media screen and (max-width: 815px) {
  font-size: clamp(0.8em, 1vw, 1em);
  }
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
  align-items: center;
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

    @media screen and (max-width: 1074px) {
      font-size: clamp(0.8em, 1vw, 1em);
  }

    @media screen and (max-width: 815px) {
      font-size: clamp(1.2em, 1vw, 1.5em);
      width: 5em;
  }
`;