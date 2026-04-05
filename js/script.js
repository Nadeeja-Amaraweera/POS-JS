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

function addToCart(itemID) {
  console.log("Add to cart:", itemID);
  // Find the item in the items array
  const item = items.find((i) => i.itemId === itemID);

  const list = document.getElementById("cartContent");
  list.innerHTML = ""; // Clear old cart items (for testing, remove this in real implementation)
  if (item) {
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
            <span class="qty text-sm font-semibold text-white" data-id="${item.itemId}">1</span>
            <button class="qtyPlus bg-gray-900/30 hover:bg-gray-900 px-2 rounded cursor-pointer"
                data-id="${item.itemId}">+</button>
        </div>

        <span><span>Item Price:</span> <span
                class="text-sm text-gray-400 mr-2">Rs:${item.itemPrice}</span></span>

        <span class="text-md font-semibold text-white">
            <span class="itemTotal">Rs:${item.itemPrice}</span>
            <i class="fa-solid fa-trash-can cursor-pointer text-red-500"></i>
        </span>
    </div>
    <hr class="border-gray-700/40" />
                            
`;

    list.appendChild(cartItem);
    console.log("Item details:", item.itemName, item.itemPrice);


  } else {
    showError("Item not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadCustomers(); // load from memory / localStorage
  loadItems(); // load from memory / localStorage
  console.log(items); // now NOT empty
  loadAllItemsForOrderPage(); // display items
});
