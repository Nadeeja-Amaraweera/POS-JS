import {
    generateCustomerId,
    addCustomer,
    getAllCustomers,
    findCustomerById,
    updateCustomerById,
    deleteCustomerById,
    searchCustomers,
} from "../model/CustomerModel.js";

import {
  showError,
  clearFields,
} from "../js/main.js";

// Save Customer
function saveCustomer(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const phone = document.getElementById("customerPhone").value;

  if (!name || !email || !phone) {
    showError("Please fill in all required fields.");
    return;
  } else if (name.length < 3) {
    showError("Name must be at least 3 characters long.");
    return;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError("Please enter a valid email address.");
    return;
  } else if (!/^\d{10}$/.test(phone)) {
    showError("Phone number must be 10 digits long.");
    return;
  } else if (getAllCustomers().some(c => c.email === email)) {
    showError("Email already exists. Please use a different email.");
    return;
  } else if (getAllCustomers().some(c => c.phone === phone)) {
    showError("Phone number already exists. Please use a different phone number.");
    return;
  } else {
    // Proceed with saving the customer
    const customer = {
        customerId: generateCustomerId(),
        name,
        email,
        phone
    };
    addCustomer(customer);
    const resultDiv = document.getElementById("CustomerSearchResultArea");
      if (resultDiv) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML =
      "<p class='text-sm text-white'>Enter a search term.</p>";
      }

    Swal.fire({
      icon: "success",
      title: "Customer Added",
      text: `The customer ${customer.customerId} has been added successfully.`,
      confirmButtonColor: "#3085d6",
    });

    // Clear the form after saving
    console.log("Current Customers:", getAllCustomers());
    loadCustomers();
    clearFields("customerName", "customerEmail", "customerPhone" ,"customerId","customerSearch");
    loadCustomerOptions(); // Refresh customer options in order page
  }
}

// Load Customers in Table
function loadCustomers() {
    const customers = getAllCustomers();
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
    const customer = findCustomerById(customerId);

    if (customer) {
      document.getElementById("customerName").value = customer.name;
      document.getElementById("customerEmail").value = customer.email;
      document.getElementById("customerPhone").value = customer.phone;
      document.getElementById("customerId").value = customer.customerId;
    }


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
    showError("Please fill in all required fields.");
    return;
  } else if (name.length < 3) {
    showError("Name must be at least 3 characters long.");
    return;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError("Please enter a valid email address.");
    return;
  } else if (!/^\d{10}$/.test(phone)) {
    showError("Phone number must be 10 digits long.");
    return;
  } else if (getAllCustomers().some(c => c.email === email)) {
    showError("Email already exists. Please use a different email.");
    return;
  } else if (getAllCustomers().some(c => c.phone === phone)) {
    showError("Phone number already exists. Please use a different phone number.");
    return;
  } else {

        updateCustomerById(customerId, { name, email, phone });

      loadCustomers();
      clearFields(
        "customerName",
        "customerEmail",
        "customerPhone",
        "customerId",
        "customerSearch"
      );
      const resultDiv = document.getElementById("CustomerSearchResultArea");
      if (resultDiv) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML =
      "<p class='text-sm text-white'>Enter a search term.</p>";
      }
      Swal.fire({
        icon: "success",
        title: "Customer Updated",
        text: `The customer ${customerId} has been updated successfully.`,
        confirmButtonColor: "#3085d6",
      });
    
  }
}

// Delete Customer
function deleteCustomer(customerId) {

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
      deleteCustomerById(customerId);
      loadCustomers();

      Swal.fire("Deleted!", "The customer has been deleted.", "success");
    } else {
      // User clicked No or closed the dialog
      Swal.fire("Cancelled", "The customer is safe", "info");
    }
  });
  clearFields(
        "customerName",
        "customerEmail",
        "customerPhone",
        "customerId",
        "customerSearch"
      );
      const resultDiv = document.getElementById("CustomerSearchResultArea");
      if (resultDiv) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML =
      "<p class='text-sm text-white'>Enter a search term.</p>";
      }
}

// Search Customer
function findCustomer(event) {
  event.preventDefault(); // Prevent form submission

  const query = document.getElementById("customerSearch").value.toLowerCase();

  const resultDiv = document.getElementById("CustomerSearchResultArea");

  if (!query) {
    resultDiv.classList.add("hidden");
    showError("Please enter a search term.");
    return;
  }

    const results = searchCustomers(query);

    if (results.length === 0) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML =
      "<p class='text-sm text-white'>No customers found</p>";
    return;
  }

   resultDiv.classList.remove("hidden");

    resultDiv.innerHTML = results.map(customer => `
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
    `).join("");
    

}

// Count Customers
function countCustomers() {
  const count = getAllCustomers().length;
  if (count === 0) {
    document.getElementById("customerCount").textContent =
      "No customers registered";
  } else {
    document.getElementById("customerCount").textContent =
      "All Customers " + count;
  }
}

window.saveCustomer = saveCustomer;
window.loadCustomers = loadCustomers;
window.editCustomer = editCustomer;
window.updateCustomer = updateCustomer;
window.deleteCustomer = deleteCustomer;
window.findCustomer = findCustomer;
window.countCustomers = countCustomers;
window.showError = showError;
window.clearFields = clearFields;