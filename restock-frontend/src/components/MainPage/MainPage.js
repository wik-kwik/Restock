import React, { useState, useEffect } from 'react';
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
import logoBig from '../../images/logo_big.png';

const MainPage = () => {
  // State to manage the visibility of the device creation form
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Function to handle the click on the add button
  const handleAddButtonClick = () => {
    setShowDeviceForm(true);
  };

  // Fetch pending orders from API

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        // Retrieve the token from local storage
        const jwt_token = localStorage.getItem('jwt_token');
        // console.log(jwt_token);

        // Fetch pending orders with the token in the headers
        const response = await fetch('http://localhost:8080/api/orders/all', {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        });

        const data = await response.json();
        setPendingOrders(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      }
    };

    // Do usunięcia
    const fetchPurchaseHistory = async () => {
      try {
        // Retrieve the token from local storage
        const jwt_token = localStorage.getItem('jwt_token');

        // Fetch purchase history with the token in the headers
        const response = await fetch('http://localhost:8080/api/purchase/history', {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        });

        const data = await response.json();
        setPurchaseHistory(data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPendingOrders();

  }, []);
  return (
    <AppContainer>
      <NavbarWrapper>
          <LogoContainer>
            <LogoImage src={logoBig} alt="Restock" />
          </LogoContainer>
          <Navbar>
          <NavbarIcons>
            <AddressIcon src="your-address-icon.png" alt="Address Icon" />
            <SettingsIcon src="your-logo-icon.png" alt="Logo Icon" />
            <LogoutIcon src="your-logout-icon.png" alt="Logout Icon" />
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
                  <PendingOrdersText>{`Order ${order.id}: ${order.name}`}</PendingOrdersText>
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
              {pendingOrders.map((order, index) => (
                <PendingOrdersItem key={index} isGrey={index % 2 === 0}>
                  <PendingOrdersText>{`Order ${order.id}: ${order.name}`}</PendingOrdersText>
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
              // Logic to handle the submitted form data
              console.log('Form submitted with data:', formData);
              setShowDeviceForm(false); // Close the form after submission
            }}
          />
        )}
      </MainWrapper>
    </AppContainer>
  );
};

export default MainPage;
