import {
  getAllItems,
} from "../model/ItemModel.js";

import {
  customers,
} from "../model/CustomerModel.js";

import {
  getCart,
  addToCartId,
  deleteCartItemById
} from "../model/CartModel.js";

import {
  getAllOrders,
  addOrder
} from "../model/OrderModel.js";

import {
  showError,
  clearFields,
} from "../js/main.js";

// Load Items for Order Page
export function loadAllItemsForOrderPage() {
  const list = document.getElementById("orderItemList");
  list.innerHTML = ""; // important: clear old items!

  const items = getAllItems();
  console.log("Loading items for order page:", items); // Debug log

  items.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "p-4 border border-[#3a4a5a] rounded-xl shadow-md bg-white/5 flex justify-between items-start hover:shadow-xl transition duration-200 ease-in-out";

    card.innerHTML = `
    <div>
        <h3 class="font-bold text-white text-sm">${item.itemName}</h3>
        <p class="text-xs text-gray-300 mt-1">Item Code: ${item.itemId}</p>
        <p class="text-indigo-400 font-bold mt-2">LKR: ${item.itemPrice}</p>
        <p class="text-emerald-400 text-[10px] font-semibold mt-1">Stock: ${item.itemQuantity}</p>
    </div>
    <button 
        class="bg-[#4F46E5] hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1 shadow-md transition duration-200 ease-in-out hover:scale-102"
        onclick="addToCart('${item.itemId}')">
        + Add
    </button>
`;

    list.appendChild(card);
  });
}


export function addToCart(itemID) {
  // Find the item in the items array
  const item = getAllItems().find((i) => i.itemId === itemID);
  const stockItem = getAllItems().find(i => i.itemId === itemID);

  const cart = getCart(); // Get current cart state

  if (!item) {
    showError("Item not found!");
    return;
  }

  // Check if item is already in cart
  const existingItem = cart.find(i => i.itemId === itemID);

  if (existingItem) {
    // If item is already in cart, increase its quantity
    if (stockItem.itemQuantity > existingItem.quantity) {
      existingItem.quantity++;
    } else {
      showError("Cannot add more than available stock!");
    }
  } else {
    // If item is not in cart, add it with quantity 1
    addToCartId(itemID);
  }

  renderCart(cart); // Update cart display
  countCartItems(); // Update cart count

  console.log("Current Cart:", cart);

}

// Calculate total amount
function totalCartAmount() {

  const cart = getCart(); // Get current cart state

  const cartSubtotal = document.getElementById("CartSubtotal");
  const cartTax = document.getElementById("CartTax");
  const cartTotal = document.getElementById("CartTotal");


  cartSubtotal.textContent = "Rs:" + cart.reduce((sum, i) => sum + (i.itemPrice * i.quantity), 0).toFixed(2);
  cartTax.textContent = "Rs:" + (cart.reduce((sum, i) => sum + (i.itemPrice * i.quantity), 0) * 0.10).toFixed(2);
  cartTotal.textContent = "Rs:" + (cart.reduce((sum, i) => sum + (i.itemPrice * i.quantity), 0) * 1.10).toFixed(2);
}

// Render Cart
function renderCart(cartItems) {

  totalCartAmount(); // Update total amount whenever cart is rendered

  const list = document.getElementById("cartContent");
  list.innerHTML = ""; // Clear old cart items (for testing, remove this in real implementation)

  cartItems.forEach(item => {

    const cartItem = document.createElement("div");
    cartItem.className =
      "bg-white/10 p-2 shadow-sm w-full";

    cartItem.innerHTML = `
    
    <h3 class="text-md font-bold text-white mb-2">${item.itemName}</h3>
    <h4 class="text-sm text-gray-400 mb-2">Item Code: ${item.itemId}</h4>
    <div class="flex justify-between items-center mb-1">
        <div>
            <button class="qtyMinus bg-gray-900/30 hover:bg-gray-900 px-2 rounded cursor-pointer"
                data-id="${item.itemId}">-</button>
            <span class="qty text-sm font-semibold text-white" data-id="${item.itemId}">${item.quantity}</span>
            <button class="qtyPlus bg-gray-900/30 hover:bg-gray-900 px-2 rounded cursor-pointer"
                data-id="${item.itemId}">+</button>
        </div>

        <span><span>Item Price:</span> <span
                class="text-sm text-gray-400 mr-2">Rs:${item.itemPrice}</span></span>

        <span class="text-md font-semibold text-white">
            <span class="itemTotal">Rs:${item.itemPrice * item.quantity}</span>
            <i class="fa-solid fa-trash-can cursor-pointer text-red-500" data-id="${item.itemId}"></i>
        </span>
    </div>
    <hr class="border-gray-700/40" />
                            
`;
    list.appendChild(cartItem);
  });
}


// update cart quantity
document.getElementById("cartContent").addEventListener("click", (e) => {

  const cart = getCart(); // Get current cart state

  totalCartAmount(); // Update total amount whenever cart is updated

  const id = e.target.dataset.id;
  const cartItem = getCart().find(i => i.itemId === id);
  const stockItem = getAllItems().find(i => i.itemId === id);

  if (e.target.classList.contains("qtyMinus")) {
    if (cartItem && cartItem.quantity > 0) cartItem.quantity--;
    if (cartItem && cartItem.quantity === 0) {
      // Optionally, you can remove the item from the cart if quantity reaches 0
      deleteCartItemById(id); // Remove from cart model as well
    }
  }

  if (e.target.classList.contains("qtyPlus")) {
    if (stockItem.itemQuantity > cartItem.quantity) {
      cartItem.quantity++;
    } else {
      showError("Cannot add more than available stock!");
    }
  }

  if (e.target.classList.contains("fa-trash-can")) {
    console.log("Removing item from cart:", id);
    if (cartItem) {
      deleteCartItemById(id); // Remove from cart model
    }
  }

  renderCart(getCart());
  countCartItems();

  console.log("Current Cart:", getCart());

});

// Count Cart Items
function countCartItems() {
  const cart = getCart(); // Get current cart state
  document.getElementById('cartCount').textContent = cart.length;
}



// Place Order
function placeOrder() {
  const cart = getCart(); // Get current cart state
  if (cart.length === 0) {
    showError("Your cart is empty!");
    return;
  }

  Swal.fire({
    title: "Confirm Order",
    text: "Are you sure you want to place this order?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {

      // Create order object
      const orderId = "ORD" + String(getAllOrders().length + 1).padStart(3, "0");
      const customerId = document.getElementById("customerInput").value;
      const customer = customers.find(c => c.customerId === customerId);
      const orderItems = cart.map(i => ({
        itemId: i.itemId,
        itemName: i.itemName,
        quantity: i.quantity,
        price: i.itemPrice,
        total: i.itemPrice * i.quantity
      }));

      const totalAmount = document.getElementById("CartTotal").textContent;
      const cashReceived = document.getElementById("cashReceivedInput").value;
      const balance = document.getElementById("balanceReceivedInput").value;

      if (cashReceived && parseFloat(cashReceived) < parseFloat(totalAmount.replace("Rs:", ""))) {
        showError("Cash received cannot be less than total amount!");
        return;
      }

      const newOrder = {
        orderId,
        customerId,
        customerName: customer ? customer.name : "Unknown",
        customerPhone: customer ? customer.phone : "Unknown",
        items: orderItems,
        totalAmount,
        cashReceived,
        balance,
        date: new Date().toLocaleString()
      };

      addOrder(newOrder); // Save order to model

      console.log("Order", getAllOrders());

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: `Your order ${orderId} has been placed successfully!`,
        confirmButtonColor: "#3085d6",
      });

      document.getElementById("CartSubtotal").textContent = "Rs:0.00";
      document.getElementById("CartTax").textContent = "Rs:0.00";
      document.getElementById("CartTotal").textContent = "Rs:0.00";

      updateStockAfterOrder();
      loadPastedOrder(); // Refresh order list to show new order
    }
  });
}

function loadPastedOrder() { // Load orders from memory / localStorage
  const orderTableBody = document.getElementById("OrderTableBody");
  orderTableBody.innerHTML = ""; // Clear existing rows
  getAllOrders().forEach((order) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "text-white");
    row.innerHTML = `
            <td class="px-4 py-2">${order.orderId}</td>
            <td class="px-4 py-2">${order.date}</td>
            <td class="px-4 py-2">${order.customerId}</td>
            <td class="px-4 py-2">${order.customerName}</td>
            <td class="px-4 py-2">${order.customerPhone}</td>
            <td class="px-4 py-2">LKR ${order.totalAmount}</td>
            <td class="px-4 py-2 text-right">
                <button class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition " onclick="viewOrder('${order.orderId}')">
                    View
                </button>
            </td>
        `;
    orderTableBody.appendChild(row);
  });

  if (getAllOrders().length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" class="px-6 py-12 text-center text-gray-400">
        No orders found. Place an order to see data here.
      </td>
    `;
    orderTableBody.appendChild(row);
  }
}

// View Order Details
function viewOrder(orderId) {
  const orderDetails = getAllOrders().find(o => o.orderId === orderId);
  if (!orderDetails) {
    showError("Order not found!");
    return;
  }

  let itemsHtml = "";
  orderDetails.items.forEach(i => {
    itemsHtml += `
      <tr>
        <td class="px-4 py-2">${i.itemName}</td>
        <td class="px-4 py-2">${i.quantity}</td>
        <td class="px-4 py-2">LKR ${i.price}</td>
        <td class="px-4 py-2">LKR ${i.total}</td>
      </tr>
    `;
  });

  Swal.fire({
    title: `Order ${orderId} Details`,
    html: `
      <p><strong>Customer:</strong> ${orderDetails.customerName} (${orderDetails.customerPhone})  </p>
      <p><strong>Date:</strong> ${orderDetails.date}</p>
      <table class="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th class="px-4 py-2">Item</th>
            <th class="px-4 py-2">Quantity</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="px-4 py-2 text-right font-bold">Cash Received:</td>
            <td class="px-4 py-2 font-bold">LKR ${orderDetails.cashReceived}</td>
          </tr>
          <tr>
            <td colspan="3" class="px-4 py-2 text-right font-bold">Balance:</td>
            <td class="px-4 py-2 font-bold">LKR ${orderDetails.balance}</td>
          </tr>
        </tfoot>
      </table>
    `
  });
}

// Search Order
function findOrder(event) {
  event.preventDefault();
  const query = document.getElementById("orderSearch").value.toLowerCase();
  const orderTableBody = document.getElementById("OrderTableBody");
  orderTableBody.innerHTML = ""; // Clear existing rows

  if (!query) {
    showError("Please enter a search term.");
    loadPastedOrder(); // Reload all orders if search is cleared
    return;
  }


  let found = false;

  getAllOrders().forEach((order) => {
    if (order.orderId.toLowerCase().includes(query) || order.customerName.toLowerCase().includes(query) || order.customerPhone.includes(query)) {
      const row = document.createElement("tr");
      row.classList.add("hover:bg-gray-700", "text-white");
      row.innerHTML = `
        <td class="px-4 py-2">${order.orderId}</td>
        <td class="px-4 py-2">${order.date}</td>
        <td class="px-4 py-2">${order.customerId}</td>
        <td class="px-4 py-2">${order.customerName}</td>
        <td class="px-4 py-2">${order.customerPhone}</td>
        <td class="px-4 py-2">LKR ${order.totalAmount}</td>
        <td class="px-4 py-2 text-right">
          <button class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded" onclick="viewOrder('${order.orderId}')">
            View
          </button>
        </td>
      `;
      orderTableBody.appendChild(row);
      found = true;
    }
  });

  if (!found) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" class="px-6 py-12 text-center text-gray-400">
        No orders found matching your search.
      </td>
    `;
    orderTableBody.appendChild(row);
  }
}

// update stock after order placement
function updateStockAfterOrder() {
  const items = getAllItems();
  getCart().forEach(cartItem => {
    const stockItem = items.find(i => i.itemId === cartItem.itemId);
    if (stockItem) {
      stockItem.itemQuantity -= cartItem.quantity;
    }
  });
  getCart().length = 0; // Clear cart after order is placed
  const list = document.getElementById("cartContent");
  list.innerHTML = ""; // Clear old cart items (for testing, remove this in real implementation)
  console.log("Cart cleared after order placement. Current Cart:", getCart());
  loadItems(); // Refresh item list to reflect updated stock
  loadAllItemsForOrderPage(); // Refresh order page item list
  countCartItems(); // Update cart count
}

// Customer options for order page
function loadCustomerOptions() {
  const select = document.getElementById("customerInput");
  const phoneInput = document.getElementById("customerPhoneInput");

  // clear old options
  select.innerHTML = `<option value="" class="text-gray-900">Select Customer</option>`;

  customers.forEach(c => {
    const option = document.createElement("option");
    option.classList.add("text-sm", "text-gray-900");
    option.value = c.customerId;   // store ID
    option.textContent = `${c.name} (${c.customerId})`;   // show name and ID
    select.appendChild(option);
  });

  // Update phone input when customer is selected
  select.addEventListener("change", () => {
    const selectedCustomer = customers.find(c => c.customerId === select.value);
    if (selectedCustomer) {
      phoneInput.value = selectedCustomer.phone;
    } else {
      phoneInput.value = "";
    }
  });
}

// Cash Received and Change Calculation
function calculateBalance() {
  let total = parseFloat(document.getElementById("CartTotal").textContent.replace("Rs:", "")) || 0;
  let cashReceived = parseFloat(document.getElementById("cashReceivedInput").value) || 0;
  const balance = document.getElementById("balanceReceivedInput").value;

  let regex = /^\d*\.?\d*$/;

  if (!regex.test(cashReceived)) {
    showError("Cash received must be a valid number!");
    return;
  }
  if (!regex.test(balance)) {
    showError("Balance must be a valid number!");
    return;
  }

  let  newBalance = cashReceived - total;

  if (newBalance < 0) {
    document.getElementById("balanceReceivedInput").classList.add("text-red-300");
    document.getElementById("balanceReceivedInput").classList.remove("text-green-300");
  } else {
    document.getElementById("balanceReceivedInput").value = newBalance.toFixed(2);
    document.getElementById("balanceReceivedInput").classList.add("text-green-300");
    document.getElementById("balanceReceivedInput").classList.remove("text-red-300");
  }
}


window.addToCart = addToCart;
window.placeOrder = placeOrder;
window.viewOrder = viewOrder;
window.findOrder = findOrder;
window.loadPastedOrder = loadPastedOrder;
window.loadAllItemsForOrderPage = loadAllItemsForOrderPage;
window.loadCustomerOptions = loadCustomerOptions;
window.calculateBalance = calculateBalance;