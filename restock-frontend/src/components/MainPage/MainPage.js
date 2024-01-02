import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetails from './OrderDetails/OrderDetails';
import {
  AppContainer,
  NavbarWrapper,
  MainWrapper,
  Label,
  MyDevicesContainer,
  MyDevicesTitleContainer,
  MyDevicesTitle,
  DeviceBox,
  AddButton,
  PendingOrdersContainer,
  PurchaseHistoryContainer,
  RectanglesList,
  PendingOrdersItem,
  OrderInfoContainer,
  PendingOrdersText,
  OrderDate,
  OrderDetailsContainer,
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
  ViewAllIcon,
  ViewAllIconWrapper,
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
import { formatCreateDate } from '../FormatCreateDate';

const MAX_DISPLAY_RECORDS = 6;

const MainPage = () => {
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [showUserSettingsForm, setShowUserSettingsForm] = useState(false);
  const [username, setUsername] = useState('');
  const [createDate, setCreateDate] = useState('');
  const { token } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  const handleAddButtonClick = () => {
    setShowDeviceForm(true);
    setActivePopup('addDeviceForm');
  };

  const handleSettingsIconClick = () => {
    setShowSettingsForm(true);
    setActivePopup('settingsForm');
  };

  const handleAddressIconClick = () => {
    setUsername('username');
    setShowUserSettingsForm(true);
    setActivePopup('userSettingsForm');
  };

  const handleLogoutIconClick = () => {
    logout();
    navigate('/');
  };

  // const handleClose = () => {
  //   setActivePopup(null);
  //   onClose();
  // };


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
            order.id === orderId ? { ...order, status: 'A' } : order
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

  // Fetch pending orders from API

  useEffect(() => {
    console.log('Token changed:', token);
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
        setCreateDate(data.createDate);
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
        // console.log(data);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      }
    };

    // Fetch data when the component mounts and when the token changes
    fetchPendingOrders();
    fetchOrdersHistory();
  }, [token]);

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
        {/* <LeftSide> */}
        <MyDevicesContainer>
          <MyDevicesTitleContainer>
            <Label>My Sensors</Label>
          </MyDevicesTitleContainer>
          {/* Sample Device Boxes with Add Button */}
          <DeviceBox>
            Sensor 1
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 2
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 3
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 4
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 5
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 6
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 7
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Sensor 8
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
        </MyDevicesContainer>
        {/* </LeftSide>
        <RightSide> */}
        <PendingOrdersContainer>
          <Label>Pending Orders</Label>
          <RectanglesList>
            {/* {pendingOrders.sort((a, b) => a.status.localeCompare(b.status)).slice(0, MAX_DISPLAY_RECORDS).map((order, index) => ( */}
            {pendingOrders
              .sort((a, b) => {
                // Sort by status first ('P' comes first), then by other criteria if needed
                if (a.status === 'P' && b.status !== 'P') {
                  return -1; // 'P' comes before any other status
                } else if (a.status !== 'P' && b.status === 'P') {
                  return 1; // 'P' comes before any other status
                } else {
                  // If both have the same status or neither is 'P', sort by another criteria if needed
                  // For example, sorting by createDate in descending order
                  return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
                }
              })
              .slice(0, MAX_DISPLAY_RECORDS)
              .map((order, index) => (
                <PendingOrdersItem
                  key={index}
                  isGrey={index % 2 === 0}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderDetails(true);
                    setActivePopup('orderDetails');
                  }}
                >
                  <OrderInfoContainer>
                    <OrderDateContainer>
                      <OrderDate>{`Date: ${formatCreateDate(order.createDate)}`}</OrderDate>
                    </OrderDateContainer>
                    {/* <ProductName>{<strong>{order.name}</strong>}</ProductName> */}
                    <ProductName><strong>{order.name.split(' ').slice(0, 4).join(' ')}</strong></ProductName>
                    <OrderDetailsContainer>
                      {/* <OrderText>{`Price: ${order.smart ? order.productPrice : order.productPrice + order.deliveryPrice} PLN`}</OrderText>
                      <OrderText>{`${order.smart ? ', delivery free with SMART!' : ', including delivery cost: ' + order.deliveryPrice + ' PLN'}`}</OrderText> */}
                      <OrderText>{`${order.smart ? order.productPrice : order.productPrice + order.deliveryPrice} PLN${order.smart ? ', delivery free with SMART!' : ', including delivery cost: ' + order.deliveryPrice + ' PLN'}`}</OrderText>
                    </OrderDetailsContainer>
                  </OrderInfoContainer>
                  {order.status === 'P' ? (
                    <PendingOrdersButtons>
                      <AcceptButton onClick={() => handleAcceptOrder(order.id)}>Accept</AcceptButton>
                      <RejectButton onClick={() => handleRejectOrder(order.id)}>Reject</RejectButton>
                    </PendingOrdersButtons>
                  ) : (
                    <OrderStatusContainer>
                      <OrderStatusText isAccepted={order.status === 'A'} isRejected={order.status === 'R'}>
                        {order.status === 'A' ? 'Accepted' : order.status === 'R' ? 'Rejected' : 'In delivery'}
                      </OrderStatusText>
                    </OrderStatusContainer>
                  )}
                </PendingOrdersItem>
              ))}
          </RectanglesList>
          {pendingOrders.length > MAX_DISPLAY_RECORDS && (
            <ViewAllIconWrapper>
              <ViewAllIcon onClick={() => navigate('/pending_orders', { state: { pendingOrdersData: pendingOrders } })} />
            </ViewAllIconWrapper>
          )}
        </PendingOrdersContainer>
        {/* Render OrderDetails pop-up when selectedOrder is not null */}
        {showOrderDetails && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => {
              setShowOrderDetails(false);
              setSelectedOrder(null);
            }}
          />
        )}

        <PurchaseHistoryContainer>
          <Label>Orders History</Label>
          <RectanglesList>
            {ordersHistory.slice(0, MAX_DISPLAY_RECORDS).map((order, index) => (
              
              <PendingOrdersItem
                  key={index}
                  isGrey={index % 2 === 0}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderDetails(true);
                    setActivePopup('orderDetails');
                  }}
                >
                <OrderInfoContainer>
                  <OrderDateContainer>
                    <OrderDate>{`Date: ${formatCreateDate(order.createDate)}`}</OrderDate>
                  </OrderDateContainer>
                  {/* <ProductName>{`Product: ${order.name}`}</ProductName> */}
                  <ProductName><strong>{order.name.split(' ').slice(0, 4).join(' ')}</strong></ProductName>
                </OrderInfoContainer>
                <OrderStatusContainer>
                  <OrderStatusText isRejected={order.status === 'R'} isClosed={order.status === 'C'}>
                    {order.status === 'R' ? 'Rejected' : 'Closed'}
                  </OrderStatusText>
                </OrderStatusContainer>
              </PendingOrdersItem>
            ))}
          </RectanglesList>
          {ordersHistory.length > MAX_DISPLAY_RECORDS && (
            <ViewAllIconWrapper>
              <ViewAllIcon onClick={() => navigate('/orders_history', { state: { ordersHistoryData: ordersHistory } })} />
              </ViewAllIconWrapper>
          )}
        </PurchaseHistoryContainer>
        {/* </RightSide> */}

     {/* Pop-up form for creating a device */}
     {activePopup === 'addDeviceForm' && (
          <AddDeviceForm
            onClose={() => setActivePopup(null)}
            onSubmit={(formData) => {
              console.log('Form submitted with data:', formData);
              setActivePopup(null);
              setShowDeviceForm(false);
            }}
          />
        )}
        {/* Pop-up form for settings */}
        {activePopup === 'settingsForm' && (
          <SettingsForm
            onClose={() => setActivePopup(null)}
            onSubmit={(formData) => {
              console.log('Settings form submitted with data:', formData);
              setActivePopup(null);
              setShowSettingsForm(false);
            }}
          />
        )}
        {/* Pop-up form for user settings */}
        {activePopup === 'userSettingsForm' && (
          <UserSettingsForm
            onClose={() => setActivePopup(null)}
            onSubmit={(formData) => {
              console.log('User settings form submitted with data:', formData);
              setActivePopup(null);
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
