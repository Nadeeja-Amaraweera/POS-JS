const order = []; // to store placed orders

export function getAllOrders() {
  return order;
}

export function addOrder(newOrder) {
    order.push(newOrder); // Save the order
}