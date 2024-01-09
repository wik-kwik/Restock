import React, { useState, useEffect } from 'react';
import {
    MainWrapper,
    PendingOrdersContainer,
    RectanglesList,
    PendingOrdersItem,
    OrderInfoContainer,
    OrderDateContainer,
    OrderDate,
    ProductName,
    OrderDetailsContainer,
    OrderText,
    PendingOrdersButtons,
    AcceptButton,
    RejectButton,
    OrderStatusContainer,
    OrderStatusText,
} from './PendingOrdersElements';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';
import { formatCreateDate } from '../FormatCreateDate';

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [createDate, setCreateDate] = useState('');
    const location = useLocation();
    const { pendingOrdersData } = location.state || {};
    const { token } = useAuth();

    // console.log(pendingOrdersData);

    useEffect(() => {
        // Set the pendingOrders state when the component mounts
        setPendingOrders(pendingOrdersData);
      }, [pendingOrdersData]);

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
                // setOrdersHistory((prevHistory) => [...prevHistory, { ...rejectedOrder, status: 'R' }]);
            } else {
                console.error('Error rejecting order:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    return (
        <MainWrapper>
        <PendingOrdersContainer>
            <RectanglesList>
                {pendingOrders.map((order, index) => (
                    <PendingOrdersItem key={index} isGrey={index % 2 === 0}>
                        <OrderInfoContainer>
                            <OrderDateContainer>
                            <OrderDate>{`Date: ${formatCreateDate(order.createDate)}`}</OrderDate>
                            </OrderDateContainer>
                            <ProductName>{`Product: ${order.name}`}</ProductName>
                            <OrderDetailsContainer>
                            <OrderText>{`${order.smart ? order.productPrice.toFixed(2) : (order.productPrice + order.deliveryPrice).toFixed(2)} PLN${order.smart ? ', delivery free with SMART!' : `, including delivery cost: ${order.deliveryPrice.toFixed(2)} PLN`}`}</OrderText>
                                {/* <OrderText>{`${order.smart ? ', delivery free with SMART!' : ', including delivery cost: ' + order.deliveryPrice + ' PLN'}`}</OrderText> */}
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
        </PendingOrdersContainer>
        </MainWrapper>
    );
};

export default PendingOrders;
