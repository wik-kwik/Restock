import React, { useState, useEffect } from 'react';
import {
  MainWrapper,
  OrdersHistoryContainer,
  RectanglesList,
  OrdersHistoryItem,
  OrderInfoContainer,
  OrderDateContainer,
  OrderDate,
  ProductName,
  OrderDetailsContainer,
  OrderText,
  OrderStatusContainer,
  OrderStatusText,
} from './OrdersHistoryElements';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';
import { formatCreateDate } from '../FormatCreateDate';

const OrdersHistory = () => {
  const [ordersHistory, setordersHistory] = useState([]);
  const location = useLocation();
  const { ordersHistoryData } = location.state || {};
  const { token } = useAuth();

  useEffect(() => {
    setordersHistory(ordersHistoryData);
  }, [ordersHistoryData]);

  return (
    <MainWrapper>
      <OrdersHistoryContainer>
        <RectanglesList>
          {ordersHistory.map((ordersHistory, index) => (
            <OrdersHistoryItem key={index} isGrey={index % 2 === 0}>
              <OrderInfoContainer>
                <OrderDateContainer>
                  <OrderDate>{`Date: ${formatCreateDate(ordersHistory.createDate)}`}</OrderDate>
                </OrderDateContainer>
                <ProductName>{`Product: ${ordersHistory.name}`}</ProductName>
                <OrderDetailsContainer>
                  <OrderText>{`Price: ${ordersHistory.smart ? ordersHistory.productPrice : ordersHistory.productPrice + ordersHistory.deliveryPrice} PLN`}</OrderText>
                  <OrderText>{`${ordersHistory.smart ? ', delivery free with SMART!' : ', including delivery cost: ' + ordersHistory.deliveryPrice + ' PLN'}`}</OrderText>
                </OrderDetailsContainer>
              </OrderInfoContainer>
              <OrderStatusContainer>
                <OrderStatusText isRejected={ordersHistory.status === 'R'} isClosed={ordersHistory.status === 'C'}>
                  {ordersHistory.status === 'R' ? 'Rejected' : 'Closed'}
                </OrderStatusText>
              </OrderStatusContainer>
            </OrdersHistoryItem>
          ))}
        </RectanglesList>
      </OrdersHistoryContainer>
    </MainWrapper>
  );
};

export default OrdersHistory;