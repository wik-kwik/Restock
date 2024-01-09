import React from 'react';
import {
    FormWrapper,
    FormTitle,
    CloseButton,
    OrderDetailText,
    OrderImage
} from './OrderDetailsElements';
import { formatCreateDate } from '../../FormatCreateDate';

const OrderDetails = ({ order, onClose }) => {

    return (
        <FormWrapper>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <FormTitle>Order Details</FormTitle>

            {/* Display the image from the order.photoUrl */}
            {order.photoUrl && <OrderImage src={order.photoUrl} alt="Product" />}

            {/* <OrderDetailText>{`Order ID: ${order.id}`}</OrderDetailText> */}
            <OrderDetailText><strong>Product name:</strong> {order.name}</OrderDetailText>
            <OrderDetailText><strong>Product price:</strong> {order.productPrice.toFixed(2)} PLN</OrderDetailText>
            <OrderDetailText><strong>Delivery price:</strong> {order.deliveryPrice.toFixed(2)} PLN</OrderDetailText>
            <OrderDetailText><strong>Smart:</strong> {order.smart === 1 ? 'Yes' : 'No'}</OrderDetailText>
            <OrderDetailText>
                <strong>Status:</strong> {order.status === 'R' ? 'Rejected' : order.status === 'C' ? 'Completed' : order.status === 'A' ? 'Accepted' : order.status === 'P' ? 'Pending' : order.status}
            </OrderDetailText>
            <OrderDetailText><strong>Created:</strong> {formatCreateDate(order.createDate)}</OrderDetailText>
            <OrderDetailText>
  {order.modifyDate !== null && (
    <React.Fragment>
      <strong>Last modified:</strong> {formatCreateDate(order.modifyDate)}
    </React.Fragment>
  )}
</OrderDetailText>

            {/* <OrderDetailText><strong>Date ordered:</strong> {formatCreateDate(order.createDate)}</OrderDetailText> */}
            {/* Informacje dotyczące sensora? Który endpoint? */}
            {/* <OrderDetailText><strong>Sensor model: </strong></OrderDetailText>
            <OrderDetailText><strong>Sensor location: </strong></OrderDetailText> */}
        </FormWrapper>
    );
};

export default OrderDetails;
