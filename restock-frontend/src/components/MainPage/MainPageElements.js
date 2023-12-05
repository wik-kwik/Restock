// MainPageElements.js
import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  height: 100vh;

  @media screen and (max-width: 815px) {
    flex-direction: column;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
  padding: 20px;
`;

export const MyDevicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em; /* Adjust the gap as needed */
  background-color: #f0f0f0;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const MyDevicesTitleContainer = styled.div`
  min-width: 100%;
`;

export const MyDevicesTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

export const DeviceBox = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 15px;
  width: 20em;
  height: 7em; /* Set height */
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const PurchaseHistoryContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
