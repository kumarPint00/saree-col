const { Order, OrderItem, sequelize } = require("../models");
const { Op } = require("sequelize");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.rzp_key_id,
  key_secret: process.env.rzp_key_secret,
});

function generateCustomOrderId(countryCode) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  const uniqueIdentifier = Math.random().toString(36).substring(2, 8);
  const customOrderId =
    countryCode.toUpperCase() +
    "-" +
    year +
    month +
    day +
    "-" +
    uniqueIdentifier;
  return customOrderId;
}

exports.createOrder = async (req, res, next) => {
  const {
    userId,
    deliveryAddressId,
    orderAmount,
    orderCurrency,
    paymentType,
    items,
    countryCode,
  } = req.body;
  let transaction;
  try {
    const customOrderId = generateCustomOrderId(countryCode);
    transaction = await sequelize.transaction();
    const order = await Order.create(
      {
        customOrderId: customOrderId,
        orderDate: new Date(),
        orderAmount: orderAmount,
        orderCurrency: orderCurrency,
        paymentType: paymentType,
        paymentStatus: "pending",
        deliveryAddressId: deliveryAddressId,
        deliveryStatus: "pending",
        estimatedDeliveryDate: new Date(
          new Date().setDate(new Date().getDate() + 12),
        ),
        userId: userId,
        currentStatus: "pending",
      },
      { transaction },
    );

    for (const item of items) {
      await OrderItem.create(
        {
          orderId: order.id,
          productVariantId: item.productVariantId,
          productVariantSizeId: item.productVariantSizeId,
          productQty: item.productQty,
          itemAmount: item.itemAmount,
        },
        { transaction },
      );
    }

    const rzpOrder = await instance.orders.create({
      amount: orderAmount,
      currency: orderCurrency,
      receipt: customOrderId,
      partial_payment: false,
    });
    await transaction.commit();
    res.status(201).json({
      orderId: order.id,
      success: true,
      message: "Order created successfully",
      orderId: order.id,
      rzpOrderDetails: rzpOrder,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.scrapOrder = async (req, res, next) => {
  const { orderId } = req.body;
  try {
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (
      order.paymentStatus !== "pending" ||
      order.currentStatus !== "pending" ||
      order.deliveryStatus !== "pending"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order cannot be scrapped. Payment status, current status, or delivery status is not pending",
      });
    }
    await OrderItem.destroy({
      where: {
        orderId: orderId,
      },
    });
    await order.destroy();
    res
      .status(200)
      .json({ success: true, message: "Order scrapped successfully" });
  } catch (error) {
    next(error);
  }
};

exports.paymentSuccess = async (req, res, next) => {
  // the payment is success
  // verify the payment using the below object
  // {
  //   "razorpay_payment_id": "pay_29QQoUBi66xm2f",
  //   "razorpay_order_id": "order_9A33XWu170gUtm",
  //   "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
  // }
  // follow the steps to verify the payment https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#15-verify-payment-signature
  // clear the customer cart, update order status to payment received
  // send email to user
  // return the payment verification successful or tampered status
};

exports.paymentFailure = async (req, res, next) => {
  //   rzp1.on('payment.failed', function (response){
  //     alert(response.error.code);
  //     alert(response.error.description);
  //     alert(response.error.source);
  //     alert(response.error.step);
  //     alert(response.error.reason);
  //     alert(response.error.metadata.order_id);
  //     alert(response.error.metadata.payment_id);
  // }
  // update the order to payment failed, do not scrap the order
  // send email to user
  // send the cart items to customer
};

exports.cancelOrder = async (req, res, next) => {
  let transaction;
  try {
    const { orderId } = req.body;
    // check the order status
    // if order status is shipped, delivered, dispatched, return

    transaction = await sequelize.transaction();

  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

// confirm cash on deliver order
// cancel order

// create return
// update order status
// razorpay webhook payment update
// update order status
// update delivery status
// update tracking url



// order statuses
//Pending
//Pending Payment or Awaiting Payment
//Payment Received
//Order Confirmed
//Failed
//Expired
//Awaiting Fulfillment
//Awaiting Shipment
//On Hold
//Shipped
//Partially Shipped
//Awaiting Pickup
//Completed
//Canceled
//Declined
//Refunded
//Partially Refunded
//Refund Rejected
//Disputed