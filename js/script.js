const customers = [];

console.log(customers.length);

// Save Customer
function saveCustomer(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const phone = document.getElementById("customerPhone").value;

  const customerId = "CUS" + String(customers.length + 1).padStart(3, "0");

  if (!name || !email || !phone) {
    showError("Please fill in all required fields.");
    return;
  } else {
    // Proceed with saving the customer
    customers.push({ customerId, name, email, phone });

    Swal.fire({
      icon: "success",
      title: "Customer Added",
      text: `The customer ${customerId} has been added successfully.`,
      confirmButtonColor: "#3085d6",
    });

    // Clear the form after saving
    console.log("Current Customers:", customers);
    loadCustomers();
    clearFields("customerName", "customerEmail", "customerPhone");
    loadCustomerOptions(); // Refresh customer options in order page
  }
}

// Load Customers in Table
function loadCustomers() {
  const customertableBody = document.getElementById("customerTableBody");
  customertableBody.innerHTML = ""; // Clear existing rows
  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "text-white");
    row.innerHTML = `
            <td class="px-4 py-2">${customer.customerId}</td>
            <td class="px-4 py-2">${customer.name}</td>
            <td class="px-4 py-2">${customer.email}</td>
            <td class="px-4 py-2">${customer.phone}</td>
            <td class="px-4 py-2">
                <div class="flex gap-4">
                    <div class="cursor-pointer text-orange-500 hover:text-white" onclick="editCustomer('${customer.customerId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </div>

                    <div class="cursor-pointer text-red-500 hover:text-white" onclick="deleteCustomer('${customer.customerId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </td>
        `;
    customertableBody.appendChild(row);
  });
  if (customers.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" class="px-6 py-12 text-center text-gray-400">
        No customers found. Add one to see data here.
      </td>
    `;
    customertableBody.appendChild(row);
  }
  countCustomers();
}

// Edit Customer
function editCustomer(customerId) {
  console.log("Edit customer with ID:", customerId);

  customers.forEach((customer) => {
    if (customer.customerId === customerId) {
      document.getElementById("customerName").value = customer.name;
      document.getElementById("customerEmail").value = customer.email;
      document.getElementById("customerPhone").value = customer.phone;
      document.getElementById("customerId").value = customer.customerId;
    }
  });

  Swal.fire({
    icon: "info",
    title: "Edit Mode",
    text: `Editing ${customerId}. Update and click "Update Selected".`,
    confirmButtonColor: "#3085d6",
  });
}

// Update Customer
function updateCustomer(event) {
  event.preventDefault(); // Prevent form submission
  const customerId = document.getElementById("customerId").value;
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const phone = document.getElementById("customerPhone").value;
  if (!customerId) {
    showError("No customer selected for update.");
    return;
  } else if (!name || !email || !phone) {
    showError("Please fill in all customer details.");
    return;
  } else {
    const index = customers.findIndex((c) => c.customerId === customerId);
    if (index !== -1) {
      customers[index] = { ...customers[index], name, email, phone };
      loadCustomers();
      clearFields(
        "customerName",
        "customerEmail",
        "customerPhone",
        "customerId",
      );
      Swal.fire({
        icon: "success",
        title: "Customer Updated",
        text: `The customer ${customerId} has been updated successfully.`,
        confirmButtonColor: "#3085d6",
      });
    }
  }
}

// Delete Customer
function deleteCustomer(customerId) {
  console.log("Delete customer with ID:", customerId);

  Swal.fire({
    title: `Delete ${customerId} Customer?`,
    text: "This action cannot be undone.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked Yes
      customers.splice(
        customers.findIndex((c) => c.customerId === customerId),
        1,
      );
      loadCustomers();
      findCustomer(event); // Refresh search results if applicable

      Swal.fire("Deleted!", "The customer has been deleted.", "success");
    } else {
      // User clicked No or closed the dialog
      Swal.fire("Cancelled", "The customer is safe", "info");
    }
  });
}

// Search Customer
function findCustomer(event) {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById("customerSearch").value.toLowerCase();
  // const tableBody = document.getElementById("customerTableBody");
  // tableBody.innerHTML = ""; // Clear existing rows
  const resultDiv = document.getElementById("CustomerSearchResultArea");

  let results = "";
  let found = false;

  if (!query) {
    resultDiv.classList.add("hidden");
    showError("Please enter a search term.");
    return;
  }

  customers.forEach((customer) => {
    if (
      customer.customerId.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.includes(query)
    ) {
      found = true;
      results += `
                <div class="flex justify-between items-center flex-wrap border border-[#3a4a5a] p-3 bg-white/10 backdrop-blur-sm shadow-sm rounded rounded-lg">
    <div>
        <p class="font-medium text-white">${customer.name}</p>
        <p class="text-xs text-gray-100">ID: ${customer.customerId} | ${customer.email} | ${customer.phone}</p>
    </div>
    <div class="flex gap-2">
        <button id="quickUnregisterFromSearch"
                class="bg-[#4F46E5] text-white px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-indigo-600 transition duration-200 ease-in-out hover:scale-102"
                onclick="editCustomer('${customer.customerId}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button id="quickUnregisterFromSearch"
                class="bg-[#D97706] text-white px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out hover:scale-102"
                onclick="deleteCustomer('${customer.customerId}')">
            <i class="fa-solid fa-trash"></i> Delete
        </button>
    </div>
</div>
            `;
      console.log("Customer found:", customer.customerId);
    }
  });

  if (found) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = results;
  } else {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML =
      "<p class='text-sm bg-no-repeat text-white'>No customers found matching the search criteria.</p>";
  }
}

// Count Customers
function countCustomers() {
  event.preventDefault(); // Prevent form submission
  const count = customers.length;
  if (count === 0) {
    document.getElementById("customerCount").textContent =
      "No customers registered";
  } else {
    document.getElementById("customerCount").textContent =
      "All Customers " + count;
  }
}

// Save Item
const items = [];
function saveItem(event) {
  event.preventDefault(); // Prevent form submission
  const itemName = document.getElementById("itemName").value;
  const itemPrice = document.getElementById("itemPrice").value;
  const itemQuantity = document.getElementById("itemQuantity").value;

  const itemId = "ITM" + String(items.length + 1).padStart(3, "0");

  if (!itemName || !itemPrice || !itemQuantity) {
    showError("Please fill in all required fields.");
    return;
  } else {
    // Proceed with saving the item
    items.push({ itemId, itemName, itemPrice, itemQuantity });

    Swal.fire({
      icon: "success",
      title: "Item Added",
      text: `The item ${itemId} has been added successfully.`,
      confirmButtonColor: "#3085d6",
    });
  }
  // Clear the form after saving
  console.log("Current Items:", items);
  loadItems();
  loadAllItemsForOrderPage(); // Refresh order page item list
}

// Load Items in Table
function loadItems() {
  event.preventDefault(); // Prevent form submission
  const itemtableBody = document.getElementById("itemTableBody");
  itemtableBody.innerHTML = ""; // Clear existing rows
  items.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "text-white");
    row.innerHTML = `
            <td class="px-4 py-2">${item.itemId}</td>
            <td class="px-4 py-2">${item.itemName}</td>
            <td class="px-4 py-2">${item.itemPrice}</td>
            <td class="px-4 py-2">${item.itemQuantity}</td>
            <td class="px-4 py-2">
                <div class="flex gap-4">
                    <div class="cursor-pointer text-orange-500 hover:text-white" onclick="editItem('${item.itemId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </div>

                    <div class="cursor-pointer text-red-500 hover:text-white" onclick="deleteItem('${item.itemId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </td>
        `;
    itemtableBody.appendChild(row);
  });
  if (items.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" class="px-6 py-12 text-center text-gray-400">
        No items found. Add one to see data here.
      </td>
    `;
    itemtableBody.appendChild(row);
  }
  countItems();
  loadAllItemsForOrderPage(); // Refresh order page item list
}

// Edit Item
function editItem(itemId) {
  console.log("Edit item with ID:", itemId);

  items.forEach((item) => {
    if (item.itemId === itemId) {
      document.getElementById("itemName").value = item.itemName;
      document.getElementById("itemPrice").value = item.itemPrice;
      document.getElementById("itemQuantity").value = item.itemQuantity;
      document.getElementById("itemId").value = item.itemId;
    }
  });

  Swal.fire({
    icon: "info",
    title: "Edit Mode",
    text: `Editing ${itemId}. Update and click "Update Selected".`,
    confirmButtonColor: "#3085d6",
  });
}

// Update Item
function updateItem(event) {
  event.preventDefault(); // Prevent form submission
  const itemId = document.getElementById("itemId").value;
  const itemName = document.getElementById("itemName").value;
  const itemPrice = document.getElementById("itemPrice").value;
  const itemQuantity = document.getElementById("itemQuantity").value;
  if (!itemId) {
    showError("No item selected for update.");
    return;
  } else if (!itemName || !itemPrice || !itemQuantity) {
    showError("Please fill in all item details.");
    return;
  } else {
    const index = items.findIndex((i) => i.itemId === itemId);
    if (index !== -1) {
      items[index] = { ...items[index], itemName, itemPrice, itemQuantity };
      loadItems();
      loadAllItemsForOrderPage(); // Refresh order page item list
      Swal.fire({
        icon: "success",
        title: "Item Updated",
        text: `The item ${itemId} has been updated successfully.`,
        confirmButtonColor: "#3085d6",
      });
    }
    loadItems();
    findItem(); // Refresh search results if applicable
  }
}

// Delete Item
function deleteItem(itemId) {
  console.log("Delete item with ID:", itemId);

  Swal.fire({
    title: `Delete ${itemId} Item?`,
    text: "This action cannot be undone.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked Yes
      items.splice(
        items.findIndex((i) => i.itemId === itemId),
        1,
      );
      loadItems();
      findItem(); // Refresh search results if applicable

      Swal.fire("Deleted!", "The item has been deleted.", "success");
    } else {
      // User clicked No or closed the dialog
      Swal.fire("Cancelled", "The item is safe", "info");
    }
  });
}

// Count Items
function countItems() {
  event.preventDefault(); // Prevent form submission
  const count = items.length;
  if (count === 0) {
    document.getElementById("itemCount").textContent = "No items added";
  } else {
    document.getElementById("itemCount").textContent = "All Items " + count;
  }
}

// Search Item
function findItem(event) {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById("itemSearch").value.toLowerCase();
  // const tableBody = document.getElementById("customerTableBody");
  // tableBody.innerHTML = ""; // Clear existing rows
  const resultDiv = document.getElementById("ItemSearchResultArea");

  if (!query) {
    resultDiv.classList.add("hidden");
    showError("Please enter a search term.");
    return;
  }

  let results = "";
  let found = false;

  items.forEach((item) => {
    if (
      item.itemId.toLowerCase().includes(query) ||
      item.itemName.toLowerCase().includes(query) ||
      item.itemPrice.toString().includes(query) ||
      item.itemQuantity.toString().includes(query)
    ) {
      found = true;
      results += `
                <div class="flex justify-between items-center flex-wrap border border-[#3a4a5a] p-3 bg-white/10 backdrop-blur-sm shadow-sm rounded-lg">
    <div>
        <p class="font-medium text-white">${item.itemName}</p>
        <p class="text-xs text-gray-100">ID: ${item.itemId} | Price: $${item.itemPrice} | Qty: ${item.itemQuantity}</p>
    </div>
    <div class="flex gap-2">
        <button id="quickUnregisterFromSearch"
                class="bg-[#4F46E5] text-white px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-indigo-600 transition duration-200 ease-in-out hover:scale-102"
                onclick="editItem('${item.itemId}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button id="quickUnregisterFromSearch"
                class="bg-[#D97706] text-white px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out hover:scale-102"
                onclick="deleteItem('${item.itemId}')">
            <i class="fa-solid fa-trash"></i> Delete
        </button>
    </div>
</div>
            `;
      console.log("Item found:", item.itemId);
    }
  });

  if (found) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = results;
  } else {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML =
      "<p class='text-sm text-gray-500'>No items found matching the search criteria.</p>";
  }
}

// Load Items for Order Page
function loadAllItemsForOrderPage() {
  const list = document.getElementById("orderItemList");
  list.innerHTML = ""; // important: clear old items!

  items.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "p-4 border border-[#3a4a5a] rounded-xl shadow-md bg-white/5 flex justify-between items-start hover:shadow-xl transition duration-200 ease-in-out";

    card.innerHTML = `
    <div>
        <h3 class="font-bold text-white text-sm">${item.itemName}</h3>
        <p class="text-xs text-gray-300 mt-1">Item Code: ${item.itemId}</p>
        <p class="text-indigo-400 font-bold mt-2">$${item.itemPrice}</p>
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

// Add to cart
const cart = [];
function addToCart(itemID) {
  // Find the item in the items array
  const item = items.find((i) => i.itemId === itemID);
  const stockItem = items.find(i => i.itemId === itemID);


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
    cart.push({ ...item, quantity: 1 });
  }

  renderCart(cart); // Update cart display
  countCartItems(); // Update cart count

  console.log("Current Cart:", cart);

}

// Render Cart
function renderCart(cartItems) {

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
  const id = e.target.dataset.id;
  const cartItem = cart.find(i => i.itemId === id);
  const stockItem = items.find(i => i.itemId === id);

  if (e.target.classList.contains("qtyMinus")) {
    if (cartItem && cartItem.quantity > 0) cartItem.quantity--;
    if (cartItem && cartItem.quantity === 0) {
      // Optionally, you can remove the item from the cart if quantity reaches 0
      cart.splice(cart.findIndex(i => i.itemId === id), 1);
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
    if (cartItem) {
      cart.splice(cart.findIndex(i => i.itemId === id), 1);
    }
  }

  renderCart(cart);
  countCartItems();

  console.log("Current Cart:", cart);

});

// Count Cart Items
function countCartItems() {
document.getElementById('cartCount').textContent = cart.length;
}

const order = []; // to store placed orders

// Place Order
function placeOrder() {
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
      const orderId = "ORD" + String(order.length + 1).padStart(3, "0");
      const customerId = document.getElementById("customerInput").value;
      const customer = customers.find(c => c.customerId === customerId);
      const orderItems = cart.map(i => ({
        itemId: i.itemId,
        itemName: i.itemName,
        quantity: i.quantity,
        price: i.itemPrice,
        total: i.itemPrice * i.quantity
      }));
      const totalAmount = orderItems.reduce((sum, i) => sum + i.total, 0);

      const newOrder = {
        orderId,
        customerId,
        customerName: customer ? customer.name : "Unknown",
        customerPhone: customer ? customer.phone : "Unknown",
        items: orderItems,
        totalAmount,
        date: new Date().toLocaleString()
      };

      order.push(newOrder); // Save the order

      console.log("Order", order);

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: `Your order ${orderId} has been placed successfully!`,
        confirmButtonColor: "#3085d6",
      });
      updateStockAfterOrder();
      loadPastedOrder(); // Refresh order list to show new order
    }
  });
}

function loadPastedOrder() { // Load orders from memory / localStorage
  const orderTableBody = document.getElementById("OrderTableBody");
  orderTableBody.innerHTML = ""; // Clear existing rows
  order.forEach((order) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-700", "text-white");
    row.innerHTML = `
            <td class="px-4 py-2">${order.orderId}</td>
            <td class="px-4 py-2">${order.date}</td>
            <td class="px-4 py-2">${order.customerId}</td>
            <td class="px-4 py-2">${order.customerName}</td>
            <td class="px-4 py-2">${order.customerPhone}</td>
            <td class="px-4 py-2">LKR ${order.totalAmount.toFixed(2)}</td>
            <td class="px-4 py-2 text-right">
                <button class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition " onclick="viewOrder('${order.orderId}')">
                    View
                </button>
            </td>
        `;
    orderTableBody.appendChild(row);
  });

  if (order.length === 0) {
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
  const orderDetails = order.find(o => o.orderId === orderId);
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

  order.forEach((order) => {
    if (order.orderId.toLowerCase().includes(query) || order.customerName.toLowerCase().includes(query) || order.customerPhone.includes(query)) {
      const row = document.createElement("tr");
      row.classList.add("hover:bg-gray-700", "text-white");
      row.innerHTML = `
        <td class="px-4 py-2">${order.orderId}</td>
        <td class="px-4 py-2">${order.date}</td>
        <td class="px-4 py-2">${order.customerId}</td>
        <td class="px-4 py-2">${order.customerName}</td>
        <td class="px-4 py-2">${order.customerPhone}</td>
        <td class="px-4 py-2">LKR ${order.totalAmount.toFixed(2)}</td>
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
  cart.forEach(cartItem => {
    const stockItem = items.find(i => i.itemId === cartItem.itemId);
    if (stockItem) {
      stockItem.itemQuantity -= cartItem.quantity;
    }
  });
  cart.length = 0; // Clear cart after order is placed
  const list = document.getElementById("cartContent");
  list.innerHTML = ""; // Clear old cart items (for testing, remove this in real implementation)
  console.log("Cart cleared after order placement. Current Cart:", cart);
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

document.addEventListener("DOMContentLoaded", function () {
  loadCustomers(); // load from memory / localStorage
  loadItems(); // load from memory / localStorage
  loadPastedOrder(); // Load pasted orders
  console.log(items); // now NOT empty
  loadAllItemsForOrderPage(); // display items
  loadCustomerOptions(); // load customer options
});