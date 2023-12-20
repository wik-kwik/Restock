import styled from 'styled-components';
import { CiUser, CiSettings, CiLogout } from "react-icons/ci";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

export const NavbarWrapper = styled.div`
  /* display: flex;
  justify-content: right;
  align-items: right;
  background-color: #9ea98f;
  padding: 0.2em; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9ea98f;
  padding: 0.2em;
`;


export const LogoContainer = styled.div`
  /* max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: left;
  justify-content: left; */
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
    max-width: 100%; /* Set max-width to 100% for smaller screens */
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


export const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  //   min-height: 100vh;
  background-color: #FAF1E4;
  overflow: hidden; /* You may need to add overflow: hidden here as well */

  @media screen and (max-width: 815px) {
    flex-direction: column;
  }
`;

export const Label = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

export const LeftSide = styled.div`
  flex: 1;
  padding: 20px;
`;

export const MyDevicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  background-color: #f0f0f0;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #e0d9cf;
  margin-top: 2em;
`;

export const MyDevicesTitleContainer = styled.div`
  min-width: 100%;
  margin-left: 8em;

  @media screen and (max-width: 815px) {
    margin-left: 0em;
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

export const RightSide = styled.div`
  flex: 1;
  padding: 20px;
`;

export const PendingOrdersContainer = styled.div`
  background-color: #e0d9cf;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 2em;
`;

export const PurchaseHistoryContainer = styled.div`
  background-color: #e0d9cf;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 2em;
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
    /* border: solid pink 2px; */
`;

export const PendingOrdersText = styled.p`
  flex: 1;
`;

export const PendingOrdersButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const AcceptButton = styled.button`
  background-color: #bdd49d;
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

// export const PendingOrdersItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 3em;  // Set the height to 3em
//   padding: 0 20px;
//   background-color: ${(props) => (props.isGrey ? '#afaca7' : '#fcf5ec')};
//   border-radius: 8px;
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
// `;

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
    props.isAccepted ? 'green' : props.isRejected ? 'red' : 'black'};
`;