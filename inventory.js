// Inventory item template
function createInventoryItemElement(item) {
    return `
        <div class="inventory-item ${item.quantity <= item.reorderPoint ? 'low-stock' : ''}">
            <div class="item-header">
                <h3>${item.name}</h3>
                <span class="department-tag ${item.department.toLowerCase()}">${item.department}</span>
            </div>
            <div class="item-details">
                <div class="detail">
                    <span class="label">SKU:</span>
                    <span>${item.sku}</span>
                </div>
                <div class="detail">
                    <span class="label">Location:</span>
                    <span>${item.location}</span>
                </div>
                <div class="detail">
                    <span class="label">Quantity:</span>
                    <span class="${item.quantity <= item.reorderPoint ? 'warning' : ''}">${item.quantity}</span>
                </div>
                <div class="detail">
                    <span class="label">Reorder Point:</span>
                    <span>${item.reorderPoint}</span>
                </div>
                <div class="detail">
                    <span class="label">Unit Price:</span>
                    <span>$${item.unitPrice.toFixed(2)}</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editItem('${item.sku}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteItem('${item.sku}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Sample data for the hotel inventory list
let inventoryData = [
    // Housekeeping Items
    {
        name: 'Bath Towels',
        sku: 'HSK-2233667',
        quantity: 120,
        location: 'A-12',
        department: 'Housekeeping',
        reorderPoint: 100,
        unitPrice: 12.99
    },
    {
        name: 'Hand Towels',
        sku: 'HSK-2233668',
        quantity: 200,
        location: 'A-13',
        department: 'Housekeeping',
        reorderPoint: 150,
        unitPrice: 8.99
    },
    {
        name: 'Queen Bed Sheets',
        sku: 'HSK-2233645',
        quantity: 85,
        location: 'B-03',
        department: 'Housekeeping',
        reorderPoint: 90,
        unitPrice: 28.50
    },
    {
        name: 'King Bed Sheets',
        sku: 'HSK-2233646',
        quantity: 65,
        location: 'B-04',
        department: 'Housekeeping',
        reorderPoint: 70,
        unitPrice: 32.50
    },
    {
        name: 'Pillowcases',
        sku: 'HSK-2233647',
        quantity: 300,
        location: 'B-05',
        department: 'Housekeeping',
        reorderPoint: 200,
        unitPrice: 6.99
    },
    {
        name: 'Cleaning Supplies',
        sku: 'HSK-2233456',
        quantity: 65,
        location: 'D-04',
        department: 'Housekeeping',
        reorderPoint: 70,
        unitPrice: 15.99
    },
    {
        name: 'Vacuum Cleaner Bags',
        sku: 'HSK-2233457',
        quantity: 45,
        location: 'D-05',
        department: 'Housekeeping',
        reorderPoint: 50,
        unitPrice: 12.99
    },

    // Amenities Items
    {
        name: 'Shampoo Bottles',
        sku: 'AMN-2233890',
        quantity: 45,
        location: 'A-14',
        department: 'Amenities',
        reorderPoint: 50,
        unitPrice: 3.99
    },
    {
        name: 'Conditioner Bottles',
        sku: 'AMN-2233891',
        quantity: 48,
        location: 'A-15',
        department: 'Amenities',
        reorderPoint: 50,
        unitPrice: 3.99
    },
    {
        name: 'Body Lotion',
        sku: 'AMN-2233892',
        quantity: 55,
        location: 'A-16',
        department: 'Amenities',
        reorderPoint: 50,
        unitPrice: 3.50
    },
    {
        name: 'Shower Caps',
        sku: 'AMN-2233893',
        quantity: 150,
        location: 'A-17',
        department: 'Amenities',
        reorderPoint: 100,
        unitPrice: 0.50
    },
    {
        name: 'Dental Kits',
        sku: 'AMN-2233894',
        quantity: 180,
        location: 'A-18',
        department: 'Amenities',
        reorderPoint: 150,
        unitPrice: 1.99
    },

    // F&B Items
    {
        name: 'Coffee Pods',
        sku: 'FNB-2233123',
        quantity: 30,
        location: 'C-01',
        department: 'F&B',
        reorderPoint: 40,
        unitPrice: 0.75
    },
    {
        name: 'Tea Bags',
        sku: 'FNB-2233124',
        quantity: 250,
        location: 'C-02',
        department: 'F&B',
        reorderPoint: 200,
        unitPrice: 0.25
    },
    {
        name: 'Sugar Packets',
        sku: 'FNB-2233125',
        quantity: 500,
        location: 'C-03',
        department: 'F&B',
        reorderPoint: 400,
        unitPrice: 0.10
    },
    {
        name: 'Creamer Packets',
        sku: 'FNB-2233126',
        quantity: 450,
        location: 'C-04',
        department: 'F&B',
        reorderPoint: 400,
        unitPrice: 0.15
    },
    {
        name: 'Bottled Water',
        sku: 'FNB-2233127',
        quantity: 280,
        location: 'C-05',
        department: 'F&B',
        reorderPoint: 300,
        unitPrice: 0.99
    },
    {
        name: 'Snack Bars',
        sku: 'FNB-2233128',
        quantity: 150,
        location: 'C-06',
        department: 'F&B',
        reorderPoint: 120,
        unitPrice: 1.50
    },
    {
        name: 'Mini Bar Chocolates',
        sku: 'FNB-2233129',
        quantity: 95,
        location: 'C-07',
        department: 'F&B',
        reorderPoint: 100,
        unitPrice: 2.50
    },

    // Additional Housekeeping Items
    {
        name: 'Toilet Paper Rolls',
        sku: 'HSK-2233648',
        quantity: 400,
        location: 'D-06',
        department: 'Housekeeping',
        reorderPoint: 350,
        unitPrice: 1.99
    },
    {
        name: 'Facial Tissues',
        sku: 'HSK-2233649',
        quantity: 250,
        location: 'D-07',
        department: 'Housekeeping',
        reorderPoint: 200,
        unitPrice: 2.99
    },
    {
        name: 'Laundry Bags',
        sku: 'HSK-2233650',
        quantity: 180,
        location: 'D-08',
        department: 'Housekeeping',
        reorderPoint: 150,
        unitPrice: 0.75
    }
];

// Function to show the add item modal
function showAddItemModal() {
    const modal = document.getElementById('addItemModal');
    modal.classList.add('active');
}

// Function to hide the add item modal
function hideAddItemModal() {
    const modal = document.getElementById('addItemModal');
    modal.classList.remove('active');
    document.getElementById('addItemForm').reset();
}

// Function to generate SKU
function generateSKU(department) {
    const prefixMap = {
        'Housekeeping': 'HSK',
        'F&B': 'FNB',
        'Amenities': 'AMN'
    };
    const prefix = prefixMap[department] || department.substring(0, 3).toUpperCase();
    const random = Math.floor(Math.random() * 9000000) + 1000000;
    return `${prefix}-${random}`;
}

// Function to add new item
function addNewItem(formData) {
    const newItem = {
        name: formData.get('name'),
        department: formData.get('department'),
        location: formData.get('location'),
        quantity: parseInt(formData.get('quantity')),
        reorderPoint: parseInt(formData.get('reorderPoint')),
        unitPrice: parseFloat(formData.get('unitPrice')),
        sku: generateSKU(formData.get('department'))
    };

    // Add to inventory data
    inventoryData.push(newItem);
    
    // Update table and stats
    populateInventoryTable();
    updateStats();
    
    // Show success message
    showNotification('Item added successfully!', 'success');
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the inventory page
document.addEventListener('DOMContentLoaded', () => {
    populateInventoryTable();
    updateStats();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add Item button
    const addItemBtn = document.querySelector('.add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', showAddItemModal);
    }

    // Modal close button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideAddItemModal);
    }

    // Form submission
    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', handleAddItem);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideAddItemModal();
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderInventory({ search: e.target.value });
        });
    }

    // Department filter
    const departmentFilter = document.getElementById('departmentFilter');
    if (departmentFilter) {
        departmentFilter.addEventListener('change', (e) => {
            renderInventory({ department: e.target.value });
        });
    }

    // Stock status filter
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
        stockFilter.addEventListener('change', (e) => {
            renderInventory({ stockStatus: e.target.value });
        });
    }
}

// Render inventory items
function renderInventory(filters = {}) {
    const inventoryGrid = document.querySelector('.inventory-grid');
    let filteredItems = [...inventoryData];

    // Apply filters
    if (filters.department) {
        filteredItems = filteredItems.filter(item => item.department === filters.department);
    }
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.sku.toLowerCase().includes(searchTerm)
        );
    }
    if (filters.stockStatus) {
        switch(filters.stockStatus) {
            case 'low':
                filteredItems = filteredItems.filter(item => item.quantity <= item.reorderPoint);
                break;
            case 'normal':
                filteredItems = filteredItems.filter(item => 
                    item.quantity > item.reorderPoint && item.quantity <= item.reorderPoint * 2
                );
                break;
            case 'excess':
                filteredItems = filteredItems.filter(item => item.quantity > item.reorderPoint * 2);
                break;
        }
    }

    // Render filtered items
    inventoryGrid.innerHTML = filteredItems.map(item => createInventoryItemElement(item)).join('');
}

// Add this function to inventory.js
function updateStats() {
    const stats = {
        totalItems: inventoryData.reduce((acc, item) => acc + item.quantity, 0),
        totalDepartments: new Set(inventoryData.map(item => item.department)).size,
        lowStockItems: inventoryData.filter(item => item.quantity <= item.reorderPoint).length,
        totalValue: inventoryData.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
    };

    // Update stats in the DOM if they exist
    const totalItemsElement = document.querySelector('.total-items');
    if (totalItemsElement) {
        totalItemsElement.textContent = stats.totalItems;
    }

    const totalDepartmentsElement = document.querySelector('.total-departments');
    if (totalDepartmentsElement) {
        totalDepartmentsElement.textContent = stats.totalDepartments;
    }

    const lowStockElement = document.querySelector('.low-stock-items');
    if (lowStockElement) {
        lowStockElement.textContent = stats.lowStockItems;
    }

    const totalValueElement = document.querySelector('.total-value');
    if (totalValueElement) {
        totalValueElement.textContent = `$${stats.totalValue.toFixed(2)}`;
    }
}

// Add these functions
function editItem(sku) {
    const item = inventoryData.find(item => item.sku === sku);
    if (item) {
        // Populate the form with item data
        const form = document.getElementById('addItemForm');
        form.querySelector('[name="name"]').value = item.name;
        form.querySelector('[name="department"]').value = item.department;
        form.querySelector('[name="location"]').value = item.location;
        form.querySelector('[name="quantity"]').value = item.quantity;
        form.querySelector('[name="reorderPoint"]').value = item.reorderPoint;
        form.querySelector('[name="unitPrice"]').value = item.unitPrice;
        
        // Show the modal
        showAddItemModal();
    }
}

function deleteItem(sku) {
    if (confirm('Are you sure you want to delete this item?')) {
        inventoryData = inventoryData.filter(item => item.sku !== sku);
        renderInventory();
        updateStats();
        showNotification('Item deleted successfully!', 'success');
    }
}

// Update the populateInventoryTable function
function populateInventoryTable() {
    const inventoryGrid = document.querySelector('.inventory-grid');
    if (!inventoryGrid) return;

    inventoryGrid.innerHTML = inventoryData.map(item => createInventoryItemElement(item)).join('');
}

// Add this function to handle form submission
function handleAddItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newItem = {
        name: formData.get('name'),
        department: formData.get('department'),
        location: formData.get('location'),
        quantity: parseInt(formData.get('quantity')),
        reorderPoint: parseInt(formData.get('reorderPoint')),
        unitPrice: parseFloat(formData.get('unitPrice')),
        sku: generateSKU(formData.get('department'))
    };

    // Add to inventory data
    inventoryData.push(newItem);
    
    // Update inventory display
    renderInventory();
    
    // Show success message
    showNotification('Item added successfully!', 'success');
    
    // Close modal and reset form
    hideAddItemModal();
    e.target.reset();
}