import React from 'react';
import { MainWrapper, LeftSide, MyDevicesContainer, DeviceBox, RightSide, PendingOrdersContainer, PurchaseHistoryContainer } from './MainPageElements';

export const MainPage = () => {
    return (
      <MainWrapper>
        <LeftSide>
          <MyDevicesContainer>
            <h2>My Devices</h2>
            <DeviceBox>Device 1</DeviceBox>
            <DeviceBox>Device 2</DeviceBox>
            <DeviceBox>Device 3</DeviceBox>
            <DeviceBox>Device 4</DeviceBox>
            <DeviceBox>Device 5</DeviceBox>
            <DeviceBox>Device 6</DeviceBox>
            <DeviceBox>Device 7</DeviceBox>
            <DeviceBox>Device 8</DeviceBox>
          </MyDevicesContainer>
        </LeftSide>
        <RightSide>
          <PendingOrdersContainer>
            <h2>Pending Orders</h2>
            {/* Include content for pending orders */}
          </PendingOrdersContainer>
          <PurchaseHistoryContainer>
            <h2>Purchase History</h2>
            {/* Include content for purchase history */}
          </PurchaseHistoryContainer>
        </RightSide>
      </MainWrapper>
    );
  };
  
  export default MainPage;