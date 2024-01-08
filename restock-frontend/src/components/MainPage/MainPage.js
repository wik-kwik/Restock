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
  const [numberOfSensors, setNumberOfSensors] = useState(0);
  const [sensorData, setSensorData] = useState(null);
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const [allSensorsData, setAllSensorsData] = useState([]);


  const handleAddButtonClick = async (sensorId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sensors?id=${sensorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const sensorData = await response.json();
        setShowDeviceForm(true);
        setActivePopup('addDeviceForm');
        setSensorData(sensorData);
        setSelectedSensorId(sensorId); // Set the selected sensorId
      } else {
        console.error('Error fetching sensor data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
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

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
    setActivePopup('orderDetails');
  };

  const handleAcceptOrder = async (event, orderId) => {
    event.stopPropagation();
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

  const handleRejectOrder = async (event, orderId) => {
    event.stopPropagation();
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

  const handleAddDeviceFormSubmit = (formData) => {
    // Perform any necessary updates or actions based on the submitted form data
    console.log('Form submitted with data:', formData);
    const fetchUpdatedData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sensors/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const updatedData = await response.json();
          
          // Update the state with the new data
          setAllSensorsData(updatedData);

          // Optionally, perform other actions based on the updated data
        } else {
          console.error('Failed to fetch updated data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching updated data:', error);
      }
    };

    // Call the function to fetch updated data
    fetchUpdatedData();
  };


  useEffect(() => {
    console.log('Token changed:', token);

    const fetchPendingOrders = async () => {
      try {
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
        const response = await fetch('http://localhost:8080/api/orders/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrdersHistory(data);
      } catch (error) {
        console.error('Error fetching orders history:', error);
      }
    };

    const fetchNumberOfSensors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sensors/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setNumberOfSensors(data.length);
        setAllSensorsData(data); // Store all sensor data in state
      } catch (error) {
        console.error('Error fetching number of sensors:', error);
      };
    };

    // Call the function to fetch the number of sensors
    fetchNumberOfSensors();

    // Fetch pending orders when the component mounts and when the token changes
    fetchPendingOrders();

    // Fetch orders history when the component mounts and when the token changes
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
  {[...Array(8).keys()].map((index) => {
    const sensor = allSensorsData[index]; // Get the sensor data for the current index
    const isClickable = index < numberOfSensors; // Check if the sensor is active

    return (
      <DeviceBox
        key={index}
        style={{
          opacity: isClickable ? 1 : 0.5,
          cursor: isClickable ? 'pointer' : 'not-allowed',
        }}
        onClick={() => isClickable && handleAddButtonClick(sensor.id)} // Pass the sensorId
      >
        {sensor ? `Sensor ${sensor.name}` : `Inactive Sensor ${index + 1}`}
        {isClickable && (
          <AddButton onClick={() => handleAddButtonClick(sensor.id)}>+</AddButton>
        )}
      </DeviceBox>
    );
  })}
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
  onClick={(event) => {
    // Check if the click is not on the Accept or Reject buttons
    if (!event.target.matches('.AcceptButton, .RejectButton')) {
      setSelectedOrder(order);
      setShowOrderDetails(true);
      setActivePopup('orderDetails');
    }
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
<AcceptButton onClick={(event) => handleAcceptOrder(event, order.id)}>Accept</AcceptButton>
<RejectButton onClick={(event) => handleRejectOrder(event, order.id)}>Reject</RejectButton>

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
    onClose={() => {
      setActivePopup(null);
      setSensorData(null);
      setSelectedSensorId(null); // Reset selected sensorId when closing the form
    }}
    onSubmit={(formData) => {
      // Pass the form data to the handleAddDeviceFormSubmit function
      handleAddDeviceFormSubmit(formData);

      // Continue with the existing logic
      setActivePopup(null);
      setShowDeviceForm(false);
      setSensorData(null);
      setSelectedSensorId(null); // Reset selected sensorId after form submission
    }}
            sensorId={selectedSensorId} // Pass selectedSensorId as a prop to AddDeviceForm
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
