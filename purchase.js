// Purchase Management System

let purchases = [
    {
        id: 1,
        vendorName: "Best Products Inc.",
        itemName: "Kitchen Utensils Set",
        quantity: 50,
        unitPrice: 25.99,
        totalPrice: 1299.50,
        expectedDelivery: "2024-02-15",
        status: "pending",
        notes: "Urgent order for new restaurant kitchen"
    },
    {
        id: 2,
        vendorName: "Quality Supplies Co.",
        itemName: "Cleaning Supplies",
        quantity: 100,
        unitPrice: 15.50,
        totalPrice: 1550.00,
        expectedDelivery: "2024-02-20",
        status: "approved",
        notes: "Monthly cleaning inventory replenishment"
    },
    {
        id: 3,
        vendorName: "Superior Resources Inc.",
        itemName: "Bed Linens",
        quantity: 200,
        unitPrice: 45.75,
        totalPrice: 9150.00,
        expectedDelivery: "2024-03-01",
        status: "completed",
        notes: "Replacement for worn-out linens"
    },
    {
        id: 4,
        vendorName: "Luxury Furnishings Ltd.",
        itemName: "Designer Throw Pillows",
        quantity: 75,
        unitPrice: 35.99,
        totalPrice: 2699.25,
        expectedDelivery: "2024-02-25",
        status: "pending",
        notes: "Suite room enhancement project"
    },
    {
        id: 5,
        vendorName: "Fresh Foods Co.",
        itemName: "Premium Coffee Beans",
        quantity: 150,
        unitPrice: 28.50,
        totalPrice: 4275.00,
        expectedDelivery: "2024-02-18",
        status: "approved",
        notes: "Monthly coffee supply for restaurant"
    },
    {
        id: 6,
        vendorName: "Tech Solutions Inc.",
        itemName: "Smart Room Thermostats",
        quantity: 40,
        unitPrice: 89.99,
        totalPrice: 3599.60,
        expectedDelivery: "2024-03-10",
        status: "cancelled",
        notes: "Energy efficiency upgrade project"
    },
    {
        id: 7,
        vendorName: "Bathroom Essentials Co.",
        itemName: "Luxury Towel Set",
        quantity: 300,
        unitPrice: 42.99,
        totalPrice: 12897.00,
        expectedDelivery: "2024-02-28",
        status: "pending",
        notes: "VIP room amenities upgrade"
    },
    {
        id: 8,
        vendorName: "Kitchen Pro Supplies",
        itemName: "Commercial Blenders",
        quantity: 5,
        unitPrice: 399.99,
        totalPrice: 1999.95,
        expectedDelivery: "2024-03-05",
        status: "approved",
        notes: "Bar equipment upgrade"
    },
    {
        id: 9,
        vendorName: "Safety First Ltd.",
        itemName: "Fire Extinguishers",
        quantity: 25,
        unitPrice: 79.99,
        totalPrice: 1999.75,
        expectedDelivery: "2024-02-22",
        status: "completed",
        notes: "Annual safety equipment update"
    },
    {
        id: 10,
        vendorName: "Eco Clean Products",
        itemName: "Biodegradable Toiletries",
        quantity: 1000,
        unitPrice: 5.99,
        totalPrice: 5990.00,
        expectedDelivery: "2024-03-15",
        status: "pending",
        notes: "Eco-friendly initiative"
    },
    {
        id: 11,
        vendorName: "Decor Masters",
        itemName: "Artificial Plants",
        quantity: 30,
        unitPrice: 149.99,
        totalPrice: 4499.70,
        expectedDelivery: "2024-03-08",
        status: "approved",
        notes: "Lobby decoration refresh"
    },
    {
        id: 12,
        vendorName: "Electronics Pro",
        itemName: "Smart TVs - 55 inch",
        quantity: 15,
        unitPrice: 699.99,
        totalPrice: 10499.85,
        expectedDelivery: "2024-03-20",
        status: "cancelled",
        notes: "Room entertainment upgrade"
    },
    {
        id: 13,
        vendorName: "Wellness Supplies Co.",
        itemName: "Gym Equipment Set",
        quantity: 1,
        unitPrice: 8999.99,
        totalPrice: 8999.99,
        expectedDelivery: "2024-03-25",
        status: "pending",
        notes: "Hotel gym renovation project"
    },
    {
        id: 14,
        vendorName: "Pool Maintenance Inc.",
        itemName: "Pool Chemicals Bundle",
        quantity: 10,
        unitPrice: 299.99,
        totalPrice: 2999.90,
        expectedDelivery: "2024-02-28",
        status: "approved",
        notes: "Quarterly pool maintenance supplies"
    },
    {
        id: 15,
        vendorName: "Restaurant Essentials",
        itemName: "Wine Glass Collection",
        quantity: 200,
        unitPrice: 12.99,
        totalPrice: 2598.00,
        expectedDelivery: "2024-03-05",
        status: "completed",
        notes: "Restaurant glassware upgrade"
    }
];

let selectedPurchaseId = null;

// Clear localStorage and reload page
function resetData() {
    localStorage.removeItem('purchaseData');
    window.location.reload();
}

// Initialize the purchase page
document.addEventListener('DOMContentLoaded', () => {
    // Always use our initial data for demonstration
    localStorage.setItem('purchaseData', JSON.stringify(purchases));
    
    // Setup event listeners
    setupEventListeners();
    setupFilterListeners();
    populateVendorSelect();

    // Initial render
    renderPurchases(purchases);
    
    // Add form validation listeners
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        // Add touched class to form fields when user interacts with them
        purchaseForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('blur', () => {
                input.classList.add('touched');
            });
        });

        // Handle form submission
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.classList.add('submitted');
            
            // If form is valid, proceed with submission
            if (this.checkValidity()) {
                handleAddPurchase(e);
                this.classList.remove('submitted');
            }
        });
    }
});

function setupEventListeners() {
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', handleAddPurchase);
    }

    const addPurchaseBtn = document.getElementById('addPurchaseBtn');
    if (addPurchaseBtn) {
        addPurchaseBtn.addEventListener('click', showAddPurchaseModal);
    }
}

function setupFilterListeners() {
    const searchInput = document.getElementById('purchaseSearch');
    const statusFilter = document.getElementById('purchaseStatusFilter');
    const vendorFilter = document.getElementById('vendorFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterPurchases);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPurchases);
    }
    if (vendorFilter) {
        vendorFilter.addEventListener('change', filterPurchases);
    }
}

function populateVendorSelect() {
    const vendorSelect = document.getElementById('vendorSelect');
    const vendorFilter = document.getElementById('vendorFilter');
    
    const vendors = JSON.parse(localStorage.getItem('vendorData')) || [
        { id: 1, name: "Best Products Inc." },
        { id: 2, name: "Quality Supplies Co." },
        { id: 3, name: "Superior Resources Inc." }
    ];
    
    if (vendorSelect) {
        vendorSelect.innerHTML = '<option value="">Select Vendor</option>';
        vendors.forEach(vendor => {
            const option = document.createElement('option');
            option.value = vendor.id;
            option.textContent = vendor.name;
            vendorSelect.appendChild(option);
        });
    }

    if (vendorFilter) {
        vendorFilter.innerHTML = '<option value="">All Vendors</option>';
        vendors.forEach(vendor => {
            const option = document.createElement('option');
            option.value = vendor.id;
            option.textContent = vendor.name;
            vendorFilter.appendChild(option);
        });
    }
}

function renderPurchases(purchasesToRender) {
    const purchaseGrid = document.getElementById('purchaseGrid');
    if (!purchaseGrid) return;

    purchaseGrid.innerHTML = '';

    purchasesToRender.forEach(purchase => {
        const card = document.createElement('div');
        card.className = 'purchase-card';
        
        const totalPrice = (purchase.quantity * purchase.unitPrice).toFixed(2);
        
        card.innerHTML = `
            <div class="purchase-header">
                <h3>${purchase.itemName}</h3>
                <span class="status-tag ${purchase.status.toLowerCase()}">${purchase.status}</span>
            </div>
            <div class="purchase-details">
                <div class="detail">
                    <span class="label">Vendor:</span>
                    <span>${purchase.vendorName}</span>
                </div>
                <div class="detail">
                    <span class="label">Quantity:</span>
                    <span>${purchase.quantity}</span>
                </div>
                <div class="detail">
                    <span class="label">Unit Price:</span>
                    <span>$${purchase.unitPrice}</span>
                </div>
                <div class="detail">
                    <span class="label">Total:</span>
                    <span>$${totalPrice}</span>
                </div>
                <div class="detail">
                    <span class="label">Expected:</span>
                    <span>${purchase.expectedDelivery}</span>
                </div>
            </div>
            <div class="purchase-actions">
                <button class="edit-btn" onclick="editPurchase(${purchase.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deletePurchase(${purchase.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        purchaseGrid.appendChild(card);
    });
}

function updateStats() {
    // Commented out to prevent errors if elements don't exist
    const totalPurchasesEl = document.getElementById('totalPurchases');
    const completedPurchasesEl = document.getElementById('completedPurchases');
    const pendingPurchasesEl = document.getElementById('pendingPurchases');

    const totalPurchases = purchases.length;
    const completedPurchases = purchases.filter(p => p.status === 'completed').length;
    const pendingPurchases = purchases.filter(p => p.status === 'pending').length;

    if (totalPurchasesEl) totalPurchasesEl.textContent = totalPurchases;
    if (completedPurchasesEl) completedPurchasesEl.textContent = completedPurchases;
    if (pendingPurchasesEl) pendingPurchasesEl.textContent = pendingPurchases;
}

function filterPurchases() {
    const searchInput = document.getElementById('purchaseSearch').value.toLowerCase();
    const statusFilter = document.getElementById('purchaseStatusFilter').value;
    const vendorFilter = document.getElementById('vendorFilter').value;
    
    const filteredPurchases = purchases.filter(purchase => {
        const matchesSearch = 
            purchase.itemName.toLowerCase().includes(searchInput) ||
            purchase.vendorName.toLowerCase().includes(searchInput);
        
        const matchesStatus = 
            statusFilter === '' || 
            purchase.status === statusFilter;
        
        const matchesVendor = 
            vendorFilter === '' || 
            purchase.vendorName.includes(document.getElementById('vendorFilter').options[document.getElementById('vendorFilter').selectedIndex].text);
        
        return matchesSearch && matchesStatus && matchesVendor;
    });
    
    renderPurchases(filteredPurchases);
}

function showAddPurchaseModal() {
    const modal = document.getElementById('addPurchaseModal');
    if (!modal) return;
    
    // Reset form
    const form = document.getElementById('purchaseForm');
    if (form) {
        form.reset();
        form.classList.remove('submitted');
        const fields = form.querySelectorAll('input, select');
        fields.forEach(field => field.classList.remove('touched'));
        selectedPurchaseId = null;
    }
    
    modal.style.display = 'flex';
    // Trigger reflow
    modal.offsetHeight;
    modal.classList.add('show');
}

function hideAddPurchaseModal() {
    const modal = document.getElementById('addPurchaseModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Match transition duration
}

function deletePurchase(id) {
    const purchase = purchases.find(p => p.id === id);
    if (!purchase) return;

    selectedPurchaseId = id;

    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    if (deleteConfirmModal) {
        const itemNameEl = deleteConfirmModal.querySelector('.item-name');
        const itemDetailsEl = deleteConfirmModal.querySelector('.item-details');
        
        if (itemNameEl) itemNameEl.textContent = purchase.itemName;
        if (itemDetailsEl) itemDetailsEl.textContent = `${purchase.quantity} x $${purchase.unitPrice.toFixed(2)}`;

        deleteConfirmModal.style.display = 'flex';
        requestAnimationFrame(() => {
            deleteConfirmModal.classList.add('active');
        });
    }
}

function hideDeleteModal() {
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    if (deleteConfirmModal) {
        deleteConfirmModal.classList.remove('active');
        deleteConfirmModal.classList.add('closing');
        
        setTimeout(() => {
            deleteConfirmModal.classList.remove('closing');
            deleteConfirmModal.style.display = 'none';
            selectedPurchaseId = null;
        }, 300);
    }
}

function handleAddPurchase(e) {
    e.preventDefault();
    
    const vendorSelect = document.getElementById('vendorSelect');
    const itemName = document.getElementById('itemName');
    const quantity = document.getElementById('quantity');
    const unitPrice = document.getElementById('unitPrice');
    const expectedDelivery = document.getElementById('expectedDelivery');
    const status = document.getElementById('status');
    const notes = document.getElementById('notes');

    if (!vendorSelect || !itemName || !quantity || !unitPrice || !expectedDelivery || !status) {
        console.error('Required form elements not found');
        return;
    }

    const newPurchase = {
        id: purchases.length + 1,
        vendorName: vendorSelect.options[vendorSelect.selectedIndex].text,
        itemName: itemName.value,
        quantity: parseInt(quantity.value),
        unitPrice: parseFloat(unitPrice.value),
        totalPrice: (parseInt(quantity.value) * parseFloat(unitPrice.value)).toFixed(2),
        expectedDelivery: expectedDelivery.value,
        status: status.value,
        notes: notes ? notes.value : ''
    };

    purchases.push(newPurchase);
    localStorage.setItem('purchaseData', JSON.stringify(purchases));
    
    renderPurchases(purchases);
    hideAddPurchaseModal();
    showNotification('Purchase order added successfully!', 'success');
}

function editPurchase(id) {
    const purchase = purchases.find(p => p.id === id);
    if (!purchase) return;

    selectedPurchaseId = id;

    // Populate form
    document.getElementById('vendorSelect').value = purchase.vendorName;
    document.getElementById('itemName').value = purchase.itemName;
    document.getElementById('quantity').value = purchase.quantity;
    document.getElementById('unitPrice').value = purchase.unitPrice;
    document.getElementById('expectedDelivery').value = purchase.expectedDelivery;
    document.getElementById('status').value = purchase.status;
    document.getElementById('notes').value = purchase.notes;

    const purchaseModal = document.getElementById('addPurchaseModal');
    if (purchaseModal) {
        purchaseModal.classList.add('show');
        
        // Use requestAnimationFrame to ensure the display change takes effect
        requestAnimationFrame(() => {
            // Then add the active class to trigger the animation
            purchaseModal.classList.add('active');
        });
    }
}

function confirmDeletePurchase() {
    if (!selectedPurchaseId) return;

    purchases = purchases.filter(p => p.id !== selectedPurchaseId);
    localStorage.setItem('purchaseData', JSON.stringify(purchases));

    renderPurchases(purchases);
    updateStats();
    hideDeleteModal();
    showNotification('Purchase order deleted successfully!');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove notification
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
