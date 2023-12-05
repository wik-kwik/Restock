// MainPage.js
import React, { useState } from 'react';
import {
  MainWrapper,
  LeftSide,
  MyDevicesContainer,
  MyDevicesTitleContainer,
  MyDevicesTitle,
  DeviceBox,
  AddButton,
  RightSide,
  PendingOrdersContainer,
  PurchaseHistoryContainer
} from './MainPageElements';
import AddDeviceForm from './AddDeviceForm';

const MainPage = () => {
  // State to manage the visibility of the device creation form
  const [showDeviceForm, setShowDeviceForm] = useState(false);

  // Function to handle the click on the add button
  const handleAddButtonClick = () => {
    // Logic to show the device creation form
    setShowDeviceForm(true);
  };

  return (
    <MainWrapper>
      <LeftSide>
        <MyDevicesContainer>
          <MyDevicesTitleContainer>
            <MyDevicesTitle>My Devices</MyDevicesTitle>
          </MyDevicesTitleContainer>
          {/* Sample Device Boxes with Add Button */}
          <DeviceBox>
            Device 1
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 2
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 3
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 4
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 5
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 6
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 7
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
          <DeviceBox>
            Device 8
            <AddButton onClick={handleAddButtonClick}>+</AddButton>
          </DeviceBox>
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
  );
};

export default MainPage;
