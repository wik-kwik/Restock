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
  RectanglesList,
  PendingOrdersItem,
  OrderInfoContainer,
  PendingOrdersText,
  OrderDate,
  OrderDetailsContainer,
  OfferName,
  OrderText,
  OrderStatusLabel,
  OrderStatusText,
  OrderStatusContainer,
  PendingOrdersButtons,
  AcceptButton,
  RejectButton,
  Navbar,
  NavbarIcons,
  AddressIcon,
  SettingsIcon,
  LogoutIcon,
  LogoContainer,
  LogoImage,
  OrderDateContainer,
  ProductName
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

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/accept?id=${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Order accepted successfully');

        // Update the order status in the pendingOrders state
        setPendingOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: order.status.ACCEPTED } : order
          )
        );

      } else {
        console.error('Error accepting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      // Send a PUT request to reject the order
      const response = await fetch(`http://localhost:8080/api/orders/reject?id=${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update the state or perform any other necessary actions
        console.log('Order rejected successfully');
  
        // Find the rejected order in pendingOrders
        const rejectedOrder = pendingOrders.find((order) => order.id === orderId);
  
        // Update the state to remove the rejected order from pendingOrders
        setPendingOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  
        // Optionally, add the rejected order to the ordersHistory state
        setOrdersHistory((prevHistory) => [...prevHistory, { ...rejectedOrder, status: 'R' }]);
      } else {
        console.error('Error rejecting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };


  // console.log('JWT Token:', token);

  // Fetch pending orders from API

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
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


    fetchPendingOrders()
    fetchOrdersHistory();

  }, []);
  return (
    <AppContainer>
      <NavbarWrapper>
        <LogoContainer>
          <LogoImage src={logoBig} alt="Restock" />
        </LogoContainer>
        <Navbar>
          <NavbarIcons>
            <AddressIcon src="your-address-icon.png" alt="Address Icon" onClick={handleAddressIconClick} />
            <SettingsIcon src="your-logo-icon.png" alt="Logo Icon" onClick={handleSettingsIconClick} />
            <LogoutIcon src="your-logout-icon.png" alt="Logout Icon" onClick={handleLogoutIconClick} />
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
                  <OrderInfoContainer>
                    <OrderDateContainer>
                      <OrderDate>{`Date: ${order.create_date}`}</OrderDate>
                    </OrderDateContainer>
                    <ProductName>{`Product: ${order.name}`}</ProductName>
                    <OrderDetailsContainer>
                      <OrderText>{`Price: ${order.productPrice}`}</OrderText>
                      <OrderText>{`SMART: ${order.smart ? 'Yes' : 'No'}`}</OrderText>
                    </OrderDetailsContainer>
                  </OrderInfoContainer>
                  {order.status === 'P' ? (
                    <PendingOrdersButtons>
                      <AcceptButton onClick={() => handleAcceptOrder(order.id)}>Accept</AcceptButton>
                      <RejectButton onClick={() => handleRejectOrder(order.id)}>Reject</RejectButton>
                    </PendingOrdersButtons>
                  ) : (
                    <OrderStatusContainer>
                      <OrderStatusLabel>Status:</OrderStatusLabel>
                      <OrderStatusText isAccepted={order.status === 'A'} isRejected={order.status === 'R'}>
                        {order.status === 'A' ? 'Accepted' : order.status === 'R' ? 'Rejected' : order.status === 'D' ? 'In Delivery' : 'Pending'}
                      </OrderStatusText>
                    </OrderStatusContainer>
                  )}
                </PendingOrdersItem>
              ))}
            </RectanglesList>
          </PendingOrdersContainer>

          <PurchaseHistoryContainer>
            <Label>Orders History</Label>
            <RectanglesList>
              {ordersHistory.map((order, index) => (
                <PendingOrdersItem key={index} isGrey={index % 2 === 0}>
                  <OrderInfoContainer>
                    <OrderDateContainer>
                      <OrderDate>{`Date: ${order.create_date}`}</OrderDate>
                    </OrderDateContainer>
                    <ProductName>{`Product: ${order.name}`}</ProductName>
                  </OrderInfoContainer>

                  <OrderStatusText isAccepted={order.status === 'A'} isRejected={order.status === 'R'}>
                    {order.status === 'A' ? 'Accepted' : order.status === 'R' ? 'Rejected' : 'In Delivery'}
                  </OrderStatusText>
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
