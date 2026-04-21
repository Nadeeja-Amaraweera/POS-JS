import { getAllItems } from "./ItemModel.js";
// Add to cart
const cart = [];

const items = getAllItems();

export function addToCartId(itemID) {
  const item = items.find(i => i.itemId === itemID);

  if (item) {
    cart.push({ ...item, quantity: 1 });
  }
}

export function getCart() {
  return cart;
}

export function deleteCartItemById(id) {
  const index = cart.findIndex(i => i.itemId === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}