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

    console.log(order.photoUrl);
    return (
        <FormWrapper>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <FormTitle>Order Details</FormTitle>

            {/* Display the image from the order.photoUrl */}
            {order.photoUrl && <OrderImage src={order.photoUrl} alt="Product" />}

            {/* <OrderDetailText>{`Order ID: ${order.id}`}</OrderDetailText> */}
            <OrderDetailText><strong>Product name:</strong> {order.name}</OrderDetailText>
            <OrderDetailText><strong>Product price:</strong> {order.productPrice} PLN</OrderDetailText>
            <OrderDetailText><strong>Delivery price:</strong> {order.deliveryPrice} PLN</OrderDetailText>
            <OrderDetailText><strong>Smart:</strong> {order.smart === 1 ? 'Yes' : 'No'}</OrderDetailText>
            <OrderDetailText><strong>Date ordered:</strong> {formatCreateDate(order.createDate)}</OrderDetailText>
            {/* Informacje dotyczące sensora? Który endpoint? */}
            <OrderDetailText><strong>Sensor model: </strong></OrderDetailText>
            <OrderDetailText><strong>Sensor location: </strong></OrderDetailText>
        </FormWrapper>
    );
};

export default OrderDetails;
