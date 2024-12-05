// Vendor card template
function createVendorCardElement(vendor) {
    return `
        <div class="vendor-card">
            <h3>
                ${vendor.name}
                <span class="tag">${vendor.performance}</span>
            </h3>
            <div class="vendor-info">
                <span class="label">Contact Person:</span>
                <span class="value">${vendor.contactPerson}</span>
                
                <span class="label">Email:</span>
                <span class="value">${vendor.email}</span>
                
                <span class="label">Phone:</span>
                <span class="value">${vendor.phone}</span>
                
                <span class="label">Address:</span>
                <span class="value">${vendor.address}</span>
                
                <span class="label">Bank Account:</span>
                <span class="value">${vendor.bankAccount}</span>
                
                <span class="label">Last Delivery:</span>
                <span class="value">${vendor.lastDelivery}</span>
            </div>
            <div class="vendor-actions">
                <button onclick="editVendor(${vendor.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteVendor(${vendor.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Sample vendor data
let vendors = [
    {
        id: 1,
        name: "Sample Supplier Co.",
        contactPerson: "John Doe",
        email: "john@supplier.com",
        phone: "123-456-7890",
        address: "123 Business St, City, Country",
        bankAccount: "BANK1234567",
        performance: "good",
        lastDelivery: "2024-01-15"
    }
];

// Initialize the vendor page
document.addEventListener('DOMContentLoaded', () => {
    // Load stored data if available
    const storedData = localStorage.getItem('vendorData');
    if (storedData) {
        vendors = JSON.parse(storedData);
    }

    // Setup event listeners
    setupEventListeners();

    // Initial render
    renderVendors();
    updateStats();
});

function setupEventListeners() {
    // Add vendor button
    const addVendorBtn = document.getElementById('addVendorBtn');
    addVendorBtn.addEventListener('click', () => {
        showAddVendorModal();
    });

    // Cancel button in add/edit modal
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', hideVendorModal);

    // Cancel button in delete modal
    const cancelDelete = document.getElementById('cancelDelete');
    cancelDelete.addEventListener('click', hideDeleteModal);

    // Confirm delete button
    const confirmDelete = document.getElementById('confirmDelete');
    confirmDelete.addEventListener('click', () => {
        if (selectedVendorId) {
            confirmDeleteVendor(selectedVendorId);
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredVendors = vendors.filter(vendor => 
            vendor.name.toLowerCase().includes(searchTerm) ||
            vendor.contactPerson.toLowerCase().includes(searchTerm) ||
            vendor.email.toLowerCase().includes(searchTerm)
        );
        renderVendors(filteredVendors);
    });

    // Vendor form submission
    const vendorForm = document.getElementById('vendorForm');
    vendorForm.addEventListener('submit', handleAddVendor);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const vendorModal = document.getElementById('vendorModal');
        const deleteConfirmModal = document.getElementById('deleteConfirmModal');
        
        if (e.target === vendorModal) {
            hideVendorModal();
        }
        if (e.target === deleteConfirmModal) {
            hideDeleteModal();
        }
    });
}

function renderVendors(filteredVendors = vendors) {
    const vendorGrid = document.getElementById('vendorGrid');
    vendorGrid.innerHTML = '';
    
    filteredVendors.forEach(vendor => {
        vendorGrid.innerHTML += createVendorCardElement(vendor);
    });

    updateStats();
}

function updateStats() {
    const totalVendors = vendors.length;
    const activeVendors = vendors.filter(v => v.performance === 'good').length;
    const newVendors = vendors.filter(v => v.performance === 'new').length;

    // Update stats in the UI if you have stats elements
    // Add code here to update your statistics display
}

function showAddVendorModal() {
    const vendorModal = document.getElementById('vendorModal');
    vendorModal.style.display = 'flex';
    requestAnimationFrame(() => {
        vendorModal.classList.add('active');
    });
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = 'Add New Vendor';
    document.getElementById('vendorForm').reset();
}

function hideVendorModal() {
    const vendorModal = document.getElementById('vendorModal');
    vendorModal.classList.add('closing');
    
    setTimeout(() => {
        vendorModal.classList.remove('active', 'closing');
        vendorModal.style.display = 'none';
        document.getElementById('vendorForm').reset();
        selectedVendorId = null;
    }, 300);
}

function handleAddVendor(e) {
    e.preventDefault();
    
    const vendorData = {
        name: document.getElementById('vendorName').value,
        contactPerson: document.getElementById('contactPerson').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        bankAccount: document.getElementById('bankAccount').value,
    };

    if (selectedVendorId) {
        // Update existing vendor
        const index = vendors.findIndex(v => v.id === selectedVendorId);
        if (index !== -1) {
            vendors[index] = {
                ...vendors[index],
                ...vendorData
            };
            showNotification('Vendor updated successfully');
        }
    } else {
        // Add new vendor
        const newVendor = {
            id: vendors.length + 1,
            ...vendorData,
            performance: 'new',
            lastDelivery: 'N/A'
        };
        vendors.push(newVendor);
        showNotification('New vendor added successfully');
    }

    // Save to localStorage
    localStorage.setItem('vendorData', JSON.stringify(vendors));

    // Update UI
    renderVendors();
    hideVendorModal();
}

function editVendor(id) {
    const vendor = vendors.find(v => v.id === id);
    if (!vendor) return;

    selectedVendorId = id;
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = 'Edit Vendor';
    
    document.getElementById('vendorName').value = vendor.name;
    document.getElementById('contactPerson').value = vendor.contactPerson;
    document.getElementById('email').value = vendor.email;
    document.getElementById('phone').value = vendor.phone;
    document.getElementById('address').value = vendor.address;
    document.getElementById('bankAccount').value = vendor.bankAccount;
    
    const vendorModal = document.getElementById('vendorModal');
    vendorModal.style.display = 'flex';
    requestAnimationFrame(() => {
        vendorModal.classList.add('active');
    });
}

function deleteVendor(id) {
    selectedVendorId = id;
    const vendor = vendors.find(v => v.id === id);
    if (vendor) {
        showDeleteModal(vendor);
    }
}

function showDeleteModal(vendor) {
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const message = document.querySelector('#deleteConfirmModal p');
    message.textContent = `Are you sure you want to delete vendor "${vendor.name}"? This action cannot be undone.`;
    deleteConfirmModal.style.display = 'flex';
    requestAnimationFrame(() => {
        deleteConfirmModal.classList.add('active');
    });
}

function hideDeleteModal() {
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    deleteConfirmModal.classList.add('closing');
    
    setTimeout(() => {
        deleteConfirmModal.classList.remove('active', 'closing');
        deleteConfirmModal.style.display = 'none';
        selectedVendorId = null;
    }, 300);
}

function confirmDeleteVendor(id) {
    vendors = vendors.filter(v => v.id !== id);
    localStorage.setItem('vendorData', JSON.stringify(vendors));
    renderVendors();
    hideDeleteModal();
    showNotification('Vendor deleted successfully', 'warning');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

let selectedVendorId = null;
