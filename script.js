// Sample data for the hotel inventory list
const inventoryData = [
    {
        name: 'Bath Towels',
        sku: 'LIN-2233667',
        quantity: 120,
        location: 'A-12',
        department: 'Housekeeping',
        reorderPoint: 100,
        unitPrice: 12.99
    },
    {
        name: 'Queen Bed Sheets',
        sku: 'BED-2233645',
        quantity: 85,
        location: 'B-03',
        department: 'Housekeeping',
        reorderPoint: 90,
        unitPrice: 28.50
    },
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
        name: 'Coffee Pods',
        sku: 'F&B-2233123',
        quantity: 30,
        location: 'C-01',
        department: 'F&B',
        reorderPoint: 40,
        unitPrice: 0.75
    },
    {
        name: 'Cleaning Supplies',
        sku: 'CLN-2233456',
        quantity: 65,
        location: 'D-04',
        department: 'Housekeeping',
        reorderPoint: 70,
        unitPrice: 15.99
    }
];

// Function to populate the inventory table
function populateInventoryTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';

    inventoryData.forEach(item => {
        const isLowStock = item.quantity <= item.reorderPoint;
        const row = document.createElement('tr');
        row.className = isLowStock ? 'low-stock' : '';
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.sku}</td>
            <td>${item.department}</td>
            <td>${item.location}</td>
            <td class="${isLowStock ? 'warning' : ''}">${item.quantity}</td>
            <td>${item.reorderPoint}</td>
            <td>$${item.unitPrice.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    populateInventoryTable();
    updateStats();
    
    // Add event listeners for navigation
    document.querySelectorAll('.nav-menu li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-menu li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Add filter button functionality
    document.querySelector('.filter-btn').addEventListener('click', () => {
        showFilterModal();
    });
});

// Function to update statistics
function updateStats() {
    const stats = {
        totalItems: inventoryData.reduce((acc, item) => acc + item.quantity, 0),
        totalDepartments: new Set(inventoryData.map(item => item.department)).size,
        lowStockItems: inventoryData.filter(item => item.quantity <= item.reorderPoint).length,
        totalValue: inventoryData.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
    };

    // Update stats in the DOM
    document.querySelectorAll('.stat-card').forEach(card => {
        const type = card.getAttribute('data-stat-type');
        if (stats[type]) {
            const value = type === 'totalValue' 
                ? `$${stats[type].toFixed(2)}` 
                : stats[type];
            card.querySelector('.stat-value').textContent = value;
        }
    });
}

// Function to handle low stock alerts
function checkLowStock() {
    const lowStockItems = inventoryData.filter(item => item.quantity <= item.reorderPoint);
    lowStockItems.forEach(item => {
        console.log(`Low stock alert: ${item.name} (${item.quantity} units remaining) - Required for ${item.department}`);
    });
} 