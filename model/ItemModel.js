export const items = [];

// Generate Item ID
export function generateItemId() {
  return "ITM" + String(items.length + 1).padStart(3, "0");
}

// Add Item
export function addItem(item) {
  items.push(item);
}

// Get All Items
export function getAllItems() {
  return items;
}

// Find Item by ID
export function findItemById(id) {
  return items.find(item => item.itemId === id);
}

// Update Item
export function updateItemById(id, data) {
  const index = items.findIndex(i => i.itemId === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...data };
  }
}

// Delete Item
export function deleteItemById(id) {
  const index = items.findIndex(i => i.itemId === id);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

// Search Items
export function searchItems(query) {
  return items.filter(i =>
    i.itemId.toLowerCase().includes(query) ||
    i.itemName.toLowerCase().includes(query) ||
    i.itemPrice.toString().includes(query) ||
    i.itemQuantity.toString().includes(query)
  );
}