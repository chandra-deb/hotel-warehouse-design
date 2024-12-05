// Vendor card template
function createVendorCardElement(vendor) {
    const performanceClass = vendor.performance.toLowerCase();
    const performanceLabel = vendor.performance.charAt(0).toUpperCase() + vendor.performance.slice(1);
    
    return `
        <div class="vendor-card">
            <h3>
                ${vendor.name}
                <span class="tag ${performanceClass}">${performanceLabel}</span>
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
    },
    {
        id: 2,
        name: "Best Products Inc.",
        contactPerson: "Jane Smith",
        email: "jane@bestproducts.com",
        phone: "234-567-8901",
        address: "456 Industrial Dr, City, Country",
        bankAccount: "BANK9012345",
        performance: "average",
        lastDelivery: "2023-12-20"
    },
    {
        id: 3,
        name: "Superior Supplies Co.",
        contactPerson: "Bob Williams",
        email: "bob@superiorsupplies.com",
        phone: "345-678-9012",
        address: "789 Warehouse Rd, City, Country",
        bankAccount: "BANK2345678",
        performance: "poor",
        lastDelivery: "2023-11-15"
    },
    {
        id: 4,
        name: "Quality Products Inc.",
        contactPerson: "Samantha Lee",
        email: "samantha@qualityproducts.com",
        phone: "456-789-0123",
        address: "901 Main St, City, Country",
        bankAccount: "BANK3456789",
        performance: "good",
        lastDelivery: "2024-02-01"
    },
    {
        id: 5,
        name: "Reliable Resources Co.",
        contactPerson: "David Kim",
        email: "david@reliableresources.com",
        phone: "567-890-1234",
        address: "0111 Logistics Dr, City, Country",
        bankAccount: "BANK4567890",
        performance: "average",
        lastDelivery: "2023-12-12"
    },
    {
        id: 6,
        name: "Professional Products Inc.",
        contactPerson: "Emily Chen",
        email: "emily@proproducts.com",
        phone: "678-901-2345",
        address: "1213 Supply St, City, Country",
        bankAccount: "BANK5678901",
        performance: "poor",
        lastDelivery: "2023-10-15"
    },
    {
        id: 7,
        name: "Advanced Supplies Co.",
        contactPerson: "Michael Davis",
        email: "michael@advancedsupplies.com",
        phone: "789-012-3456",
        address: "1415 Industrial Dr, City, Country",
        bankAccount: "BANK6789012",
        performance: "good",
        lastDelivery: "2024-01-15"
    },
    {
        id: 8,
        name: "Elite Products Inc.",
        contactPerson: "Sarah Taylor",
        email: "sarah@eliteproducts.com",
        phone: "890-123-4567",
        address: "1617 Logistics Dr, City, Country",
        bankAccount: "BANK7890123",
        performance: "average",
        lastDelivery: "2023-11-20"
    },
    {
        id: 9,
        name: "Ultimate Resources Co.",
        contactPerson: "Kevin Brown",
        email: "kevin@ultimateresources.com",
        phone: "901-234-5678",
        address: "1819 Supply St, City, Country",
        bankAccount: "BANK8901234",
        performance: "poor",
        lastDelivery: "2023-10-20"
    },
    {
        id: 10,
        name: "Prime Products Inc.",
        contactPerson: "Lisa Nguyen",
        email: "lisa@primeproducts.com",
        phone: "012-345-6789",
        address: "2011 Industrial Dr, City, Country",
        bankAccount: "BANK9012345",
        performance: "good",
        lastDelivery: "2024-02-01"
    },
    {
        id: 11,
        name: "Best Solutions Co.",
        contactPerson: "James Smith",
        email: "james@bestsolutions.com",
        phone: "123-456-7890",
        address: "2213 Logistics Dr, City, Country",
        bankAccount: "BANK0123456",
        performance: "average",
        lastDelivery: "2023-12-15"
    },
    {
        id: 12,
        name: "Superior Solutions Inc.",
        contactPerson: "Amy Lee",
        email: "amy@superiorsolutions.com",
        phone: "234-567-8901",
        address: "2415 Supply St, City, Country",
        bankAccount: "BANK1234567",
        performance: "poor",
        lastDelivery: "2023-11-15"
    },
    {
        id: 13,
        name: "Quality Solutions Co.",
        contactPerson: "Brian Kim",
        email: "brian@qualitysolutions.com",
        phone: "345-678-9012",
        address: "2617 Industrial Dr, City, Country",
        bankAccount: "BANK2345678",
        performance: "good",
        lastDelivery: "2024-01-15"
    },
    {
        id: 14,
        name: "Professional Solutions Inc.",
        contactPerson: "Christine Chen",
        email: "christine@prosolutions.com",
        phone: "456-789-0123",
        address: "2819 Logistics Dr, City, Country",
        bankAccount: "BANK3456789",
        performance: "average",
        lastDelivery: "2023-12-20"
    },
    {
        id: 15,
        name: "Advanced Solutions Co.",
        contactPerson: "Michael Davis",
        email: "michael@advancedsolutions.com",
        phone: "567-890-1234",
        address: "3011 Supply St, City, Country",
        bankAccount: "BANK4567890",
        performance: "poor",
        lastDelivery: "2023-10-20"
    },
    {
        id: 16,
        name: "Elite Solutions Inc.",
        contactPerson: "Sarah Taylor",
        email: "sarah@elitesolutions.com",
        phone: "678-901-2345",
        address: "3213 Industrial Dr, City, Country",
        bankAccount: "BANK5678901",
        performance: "good",
        lastDelivery: "2024-02-01"
    },
    {
        id: 17,
        name: "Ultimate Solutions Co.",
        contactPerson: "Kevin Brown",
        email: "kevin@ultimatesolutions.com",
        phone: "789-012-3456",
        address: "3415 Logistics Dr, City, Country",
        bankAccount: "BANK6789012",
        performance: "average",
        lastDelivery: "2023-11-20"
    },
    {
        id: 18,
        name: "Prime Solutions Inc.",
        contactPerson: "Lisa Nguyen",
        email: "lisa@primesolutions.com",
        phone: "890-123-4567",
        address: "3617 Supply St, City, Country",
        bankAccount: "BANK7890123",
        performance: "poor",
        lastDelivery: "2023-10-15"
    },
    {
        id: 19,
        name: "Best Solutions Co.",
        contactPerson: "James Smith",
        email: "james@bestsolutions.com",
        phone: "901-234-5678",
        address: "3819 Industrial Dr, City, Country",
        bankAccount: "BANK8901234",
        performance: "good",
        lastDelivery: "2024-01-15"
    },
    {
        id: 20,
        name: "Superior Solutions Inc.",
        contactPerson: "Amy Lee",
        email: "amy@superiorsolutions.com",
        phone: "012-345-6789",
        address: "4011 Logistics Dr, City, Country",
        bankAccount: "BANK9012345",
        performance: "average",
        lastDelivery: "2023-12-15"
    },

];

// Function to filter vendors
function filterVendors() {
    const searchInput = document.getElementById('vendorSearch').value.toLowerCase();
    const performanceFilter = document.getElementById('performanceFilter').value;
    
    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = 
            vendor.name.toLowerCase().includes(searchInput) ||
            vendor.contactPerson.toLowerCase().includes(searchInput) ||
            vendor.email.toLowerCase().includes(searchInput) ||
            vendor.phone.toLowerCase().includes(searchInput) ||
            vendor.address.toLowerCase().includes(searchInput);
        
        const matchesPerformance = 
            performanceFilter === 'all' || 
            vendor.performance === performanceFilter;
        
        return matchesSearch && matchesPerformance;
    });
    
    renderVendors(filteredVendors);
}

// Add event listeners for filtering
function setupFilterListeners() {
    const searchInput = document.getElementById('vendorSearch');
    const performanceFilter = document.getElementById('performanceFilter');
    
    searchInput.addEventListener('input', filterVendors);
    performanceFilter.addEventListener('change', filterVendors);
}

// Initialize the vendor page
document.addEventListener('DOMContentLoaded', () => {
    // Load stored data if available
    const storedData = localStorage.getItem('vendorData');
    if (storedData) {
        vendors = JSON.parse(storedData);
    }else{
        localStorage.setItem('vendorData', JSON.stringify(vendors));
    }

    // Setup event listeners
    setupEventListeners();
    setupFilterListeners();

    // Initial render
    renderVendors(vendors);
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

    // Update stats in the UI
    document.getElementById('totalVendors').textContent = totalVendors;
    document.getElementById('activeVendors').textContent = activeVendors;
    document.getElementById('newVendors').textContent = newVendors;

    // Update stat card colors
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const icon = card.querySelector('.stat-icon');
        if (card.querySelector('h3').textContent.includes('Total')) {
            icon.style.background = '#6366f1'; // Purple for total
        } else if (card.querySelector('h3').textContent.includes('Active')) {
            icon.style.background = '#22c55e'; // Green for active
        } else if (card.querySelector('h3').textContent.includes('New')) {
            icon.style.background = '#3b82f6'; // Blue for new
        }
    });
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
            performance: 'new', // New vendors start with 'new' status
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
