export const customers = [];

// Generate Customer ID
export function generateCustomerId() {
  return "CUS" + String(customers.length + 1).padStart(3, "0");
}

// Add Customer
export function addCustomer(customer) {
  customers.push(customer);
}

// Load Customers to Table
export function getAllCustomers() {
  return customers;
}

// Find Customer by ID
export function findCustomerById(id) {
  return customers.find((customer) => customer.customerId === id);
}

// Update Customer
export function updateCustomerById(id, data){
  const index = customers.findIndex((c) => c.customerId === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...data };
  }
}

// Delete Customer
export function deleteCustomerById(id) {
  const index = customers.findIndex((customer) => customer.customerId === id);
  if (index !== -1) {
    customers.splice(index, 1);
  }
}

// Search Customers
export function searchCustomers(query) {
  return customers.filter(c =>
    c.customerId.toLowerCase().includes(query) ||
    c.name.toLowerCase().includes(query) ||
    c.email.toLowerCase().includes(query) ||
    c.phone.includes(query)
  );
}
