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
    }
];

let selectedPurchaseId = null;

// Initialize the purchase page
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('purchaseData');
    if (storedData) {
        purchases = JSON.parse(storedData);
    } else {
        localStorage.setItem('purchaseData', JSON.stringify(purchases));
    }

    // Setup event listeners
    setupEventListeners();
    setupFilterListeners();
    populateVendorSelect();

    // Initial render
    renderPurchases(purchases);
    updateStats();
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
        const purchaseCard = document.createElement('div');
        purchaseCard.className = 'item-card';
        purchaseCard.innerHTML = `
            <div class="card-header">
                <h3>${purchase.itemName}</h3>
                <span class="status-tag ${purchase.status}">${purchase.status}</span>
            </div>
            <div class="card-details">
                <span class="label">Vendor:</span>
                <span class="value">${purchase.vendorName}</span>
                
                <span class="label">Quantity:</span>
                <span class="value">${purchase.quantity}</span>
                
                <span class="label">Unit Price:</span>
                <span class="value">$${purchase.unitPrice.toFixed(2)}</span>
                
                <span class="label">Total Price:</span>
                <span class="value">$${purchase.totalPrice.toFixed(2)}</span>
                
                <span class="label">Expected Delivery:</span>
                <span class="value">${purchase.expectedDelivery}</span>
            </div>
            <div class="card-actions">
                <button onclick="editPurchase(${purchase.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePurchase(${purchase.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        purchaseGrid.appendChild(purchaseCard);
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
    const purchaseModal = document.getElementById('addPurchaseModal');
    if (purchaseModal) {
        purchaseModal.style.display = 'flex';
        requestAnimationFrame(() => {
            purchaseModal.classList.add('active');
        });
    }
}

function hideAddPurchaseModal() {
    const purchaseModal = document.getElementById('addPurchaseModal');
    if (purchaseModal) {
        purchaseModal.classList.remove('active');
        purchaseModal.classList.add('closing');
        
        setTimeout(() => {
            purchaseModal.classList.remove('closing');
            purchaseModal.style.display = 'none';
            document.getElementById('purchaseForm').reset();
            selectedPurchaseId = null;
        }, 300);
    }
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
    
    const purchaseData = {
        vendorName: document.getElementById('vendorSelect').options[document.getElementById('vendorSelect').selectedIndex].text,
        itemName: document.getElementById('itemName').value,
        quantity: parseInt(document.getElementById('quantity').value),
        unitPrice: parseFloat(document.getElementById('unitPrice').value),
        expectedDelivery: document.getElementById('expectedDelivery').value,
        status: document.getElementById('purchaseStatus').value,
        notes: document.getElementById('notes').value
    };

    purchaseData.totalPrice = purchaseData.quantity * purchaseData.unitPrice;

    if (selectedPurchaseId) {
        // Update existing purchase
        const index = purchases.findIndex(p => p.id === selectedPurchaseId);
        if (index !== -1) {
            purchases[index] = {
                ...purchases[index],
                ...purchaseData
            };
            showNotification('Purchase order updated successfully');
        }
    } else {
        // Add new purchase
        const newPurchase = {
            id: purchases.length > 0 ? Math.max(...purchases.map(p => p.id)) + 1 : 1,
            ...purchaseData
        };
        purchases.push(newPurchase);
        showNotification('New purchase order added successfully');
    }

    // Save to localStorage
    localStorage.setItem('purchaseData', JSON.stringify(purchases));

    // Update UI
    renderPurchases(purchases);
    updateStats();
    hideAddPurchaseModal();
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
    document.getElementById('purchaseStatus').value = purchase.status;
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
    showNotification('Purchase order deleted successfully');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
