import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppContainer,
  NavbarWrapper,
  MainWrapper,
  Label,
  LeftSide,
  MyDevicesContainer,
  MyDevicesTitleContainer,
  MyDevicesTitle,
  DeviceBox,
  AddButton,
  RightSide,
  PendingOrdersContainer,
  PurchaseHistoryContainer,
  Rectangle,
  RectanglesList,
  PendingOrdersItem,
  PendingOrdersText,
  PendingOrdersButtons,
  AcceptButton,
  RejectButton,
  Navbar,
  NavbarIcons,
  AddressIcon,
  SettingsIcon,
  LogoutIcon,
  LogoContainer,
  LogoImage
} from './MainPageElements';
import AddDeviceForm from './AddDeviceForm';
import SettingsForm from './SettingsForm';
import UserSettingsForm from './UserSettingsForm';
import logoBig from '../../images/logo_big.png';
import { useAuth } from '../../AuthContext';

const MainPage = () => {
  // State to manage the visibility of the device creation form
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [showUserSettingsForm, setShowUserSettingsForm] = useState(false);
  const [username, setUsername] = useState('');
  const { token } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  // Function to handle the click on the add button
  const handleAddButtonClick = () => {
    setShowDeviceForm(true);
  };

  const handleSettingsIconClick = () => {
    setShowSettingsForm(true);
  };

  const handleAddressIconClick = () => {
    setUsername('username'); 
    setShowUserSettingsForm(true);
  };

  const handleLogoutIconClick = () => {
    logout();
    navigate('/');
  };

  console.log('JWT Token:', token);
  // Fetch pending orders from API

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        
        // console.log(token);
        // console.log(token);

        // Fetch pending orders with the token in the headers
        const response = await fetch('http://localhost:8080/api/orders/pending', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setPendingOrders(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      }
    };

    const fetchOrdersHistory = async () => {
      try {
        // Retrieve the token from local storage
        // const token = localStorage.getItem('token');
        // console.log(token);

        // Fetch pending orders with the token in the headers
        const response = await fetch('http://localhost:8080/api/orders/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrdersHistory(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      }
    };

    // console.log(token);
    // console.log(token);

    // fetchPendingOrders()
    // fetchOrdersHistory();

  }, []);
  return (
    <AppContainer>
      <NavbarWrapper>
        <LogoContainer>
          <LogoImage src={logoBig} alt="Restock" />
        </LogoContainer>
        <Navbar>
          <NavbarIcons>
            <AddressIcon src="your-address-icon.png" alt="Address Icon" onClick={handleAddressIconClick}/>
            <SettingsIcon src="your-logo-icon.png" alt="Logo Icon" onClick={handleSettingsIconClick}/>
            <LogoutIcon src="your-logout-icon.png" alt="Logout Icon"  onClick={handleLogoutIconClick} />
          </NavbarIcons>
        </Navbar>
      </NavbarWrapper>
      <MainWrapper>
        <LeftSide>
          <MyDevicesContainer>
            <MyDevicesTitleContainer>
              <Label>My Products</Label>
            </MyDevicesTitleContainer>
            {/* Sample Device Boxes with Add Button */}
            <DeviceBox>
              Product 1
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 2
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 3
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 4
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 5
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 6
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 7
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
            <DeviceBox>
              Product 8
              <AddButton onClick={handleAddButtonClick}>+</AddButton>
            </DeviceBox>
          </MyDevicesContainer>
        </LeftSide>
        <RightSide>
          <PendingOrdersContainer>
            <Label>Pending Orders</Label>
            <RectanglesList>
              {pendingOrders.map((order, index) => (
                <PendingOrdersItem key={index} isGrey={index % 2 === 0}>
                  <PendingOrdersText>{`Order : ${order.name}`}</PendingOrdersText>
                  <PendingOrdersButtons>
                    <AcceptButton>Accept</AcceptButton>
                    <RejectButton>Reject</RejectButton>
                  </PendingOrdersButtons>
                </PendingOrdersItem>
              ))}
            </RectanglesList>
          </PendingOrdersContainer>

          <PurchaseHistoryContainer>
            <Label>Orders History</Label>
            <RectanglesList>
              {ordersHistory.map((order, index) => (
                <PendingOrdersItem key={index} isGrey={index % 2 === 0}>
                  <PendingOrdersText>{`Order : ${order.name}`}</PendingOrdersText>
                </PendingOrdersItem>
              ))}
            </RectanglesList>
          </PurchaseHistoryContainer>
        </RightSide>
        
        {/* Pop-up form for creating a device */}
        {showDeviceForm && (
          <AddDeviceForm
            onClose={() => setShowDeviceForm(false)} // Function to close the form
            onSubmit={(formData) => {
              console.log('Form submitted with data:', formData);
              setShowDeviceForm(false); // Close the form after submission
            }}
          />
        )}
        {/* Pop-up form for settings */}
        {showSettingsForm && (
          <SettingsForm
            onClose={() => setShowSettingsForm(false)}
            onSubmit={(formData) => {
              console.log('Settings form submitted with data:', formData);
              setShowSettingsForm(false);
            }}
          />
        )}

         {/* Pop-up form for user settings */}
         {showUserSettingsForm && (
          <UserSettingsForm
            onClose={() => setShowUserSettingsForm(false)}
            onSubmit={(formData) => {
              // Handle user settings form submission logic
              console.log('User settings form submitted with data:', formData);
              setShowUserSettingsForm(false);
            }}
            username={username}
          />
        )}
      </MainWrapper>
    </AppContainer>
  );
};

export default MainPage;
