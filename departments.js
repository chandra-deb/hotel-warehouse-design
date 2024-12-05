// Departments Data Model
let departmentsData = [];
let transferRequests = [];

// Function to save departments to local storage
function saveDepartmentsToLocalStorage() {
    localStorage.setItem('departmentsData', JSON.stringify(departmentsData));
}

// Function to save transfer requests to local storage
function saveTransferRequestsToLocalStorage() {
    localStorage.setItem('transferRequests', JSON.stringify(transferRequests));
}

// Function to load departments from local storage
function loadDepartmentsFromLocalStorage() {
    const storedDepartments = localStorage.getItem('departmentsData');
    if (storedDepartments) {
        departmentsData = JSON.parse(storedDepartments);
    } else {
        // Initial default departments if no data exists
        departmentsData = [
            {
                id: 1,
                name: 'Housekeeping',
                head: 'Maria Rodriguez',
                description: 'Responsible for room cleaning and maintenance',
                items: [
                    { name: 'Bath Towels', quantity: 120 },
                    { name: 'Cleaning Supplies', quantity: 65 }
                ]
            },
            {
                id: 2,
                name: 'Food & Beverage',
                head: 'John Smith',
                description: 'Manages dining and catering services',
                items: [
                    { name: 'Coffee Pods', quantity: 30 },
                    { name: 'Tea Bags', quantity: 250 }
                ]
            },
            {
                id: 3,
                name: 'Amenities',
                head: 'Sarah Johnson',
                description: 'Handles guest amenities and welcome packages',
                items: [
                    { name: 'Shampoo Bottles', quantity: 45 },
                    { name: 'Dental Kits', quantity: 180 }
                ]
            }
        ];
        saveDepartmentsToLocalStorage();
    }
}

// Function to load transfer requests from local storage
function loadTransferRequestsFromLocalStorage() {
    const storedTransferRequests = localStorage.getItem('transferRequests');
    if (storedTransferRequests) {
        transferRequests = JSON.parse(storedTransferRequests);
    } else {
        transferRequests = [];
        saveTransferRequestsToLocalStorage();
    }
}

// Function to delete a department
function deleteDepartment(id) {
    selectedDepartmentId = id;
    const department = departmentsData.find(d => d.id === id);
    if (department) {
        showDeleteModal(department);
    }
    saveDepartmentsToLocalStorage();
}

function showDeleteModal(department) {
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const message = document.querySelector('#deleteConfirmModal p');
    message.textContent = `Are you sure you want to delete department "${department.name}"? This action cannot be undone.`;
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
        selectedDepartmentId = null;
    }, 300);
}

function confirmDeleteDepartment() {
    if (selectedDepartmentId !== null) {
        departmentsData = departmentsData.filter(d => d.id !== selectedDepartmentId);
        saveDepartmentsToLocalStorage();
        renderDepartments();
        hideDeleteModal();
        showNotification('Department deleted successfully', 'warning');
    }
}

// Function to render departments
function renderDepartments(filteredDepartments = null) {
    const departmentsGrid = document.getElementById('departmentsGrid');
    departmentsGrid.innerHTML = '';

    const dataToRender = filteredDepartments || departmentsData;

    dataToRender.forEach(department => {
        const departmentCard = document.createElement('div');
        departmentCard.className = 'department-card';
        
        // Conditionally render items section only if there are items
        const itemsSection = department.items && department.items.length > 0 
            ? `
                <div class="department-items">
                    <strong>Department Items:</strong>
                    <ul>
                        ${department.items.map(item => `
                            <li>
                                <span>${item.name}</span>
                                <span>${item.quantity}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` 
            : ''; // Empty string if no items

        departmentCard.innerHTML = `
            <div class="department-card-header">
                <h3>${department.name}</h3>
                <div class="department-actions">
                    <button class="department-edit-btn" onclick="editDepartment(${department.id})" title="Edit Department">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="department-delete-btn" onclick="deleteDepartment(${department.id})" title="Delete Department">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="department-card-details">
                <p><strong>Department Head:</strong> ${department.head}</p>
                <p>${department.description}</p>
                ${itemsSection}
            </div>
        `;
        departmentsGrid.appendChild(departmentCard);
    });
}

// Function to render transfer requests
function renderTransferRequests() {
    const transferRequestsGrid = document.getElementById('transferRequestsGrid');
    transferRequestsGrid.innerHTML = '';

    transferRequests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = 'transfer-request-card';
        requestCard.innerHTML = `
            <div class="transfer-request-details">
                <p><strong>From:</strong> ${getDepartmentName(request.sourceDepartment)}</p>
                <p><strong>To:</strong> ${getDepartmentName(request.targetDepartment)}</p>
                <p><strong>Item:</strong> ${request.item} (${request.quantity})</p>
                <p><strong>Reason:</strong> ${request.reason}</p>
                <p><strong>Status:</strong> ${request.status}</p>
            </div>
            <div class="transfer-request-actions">
                ${request.status === 'Pending' ? `
                    <button class="approve-btn" onclick="approveTransfer(${request.id})">Approve</button>
                    <button class="reject-btn" onclick="rejectTransfer(${request.id})">Reject</button>
                ` : ''}
            </div>
        `;
        transferRequestsGrid.appendChild(requestCard);
    });
}

// Function to show add department modal
function showAddDepartmentModal() {
    const modal = document.getElementById('addDepartmentModal');
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function hideAddDepartmentModal() {
    const modal = document.getElementById('addDepartmentModal');
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        modal.style.display = 'none';
    }, 300);
}

// Function to edit a department
function editDepartment(id) {
    const department = departmentsData.find(d => d.id === id);
    if (!department) return;

    const modal = document.getElementById('addDepartmentModal');
    const form = document.getElementById('addDepartmentForm');
    
    form.querySelector('#departmentName').value = department.name;
    form.querySelector('#departmentHead').value = department.head;
    form.querySelector('#departmentDescription').value = department.description;
    
    // Change modal title and submit button
    modal.querySelector('.modal-header h2').textContent = 'Edit Department';
    form.querySelector('.submit-btn').textContent = 'Update Department';
    
    // Store the ID for update
    form.dataset.editingId = id;

    showAddDepartmentModal();
}

// Function to show item transfer modal
function showItemTransferModal() {
    const modal = document.getElementById('itemTransferModal');
    if (!modal) return;
    
    // Reset form if it exists
    const form = document.getElementById('itemTransferForm');
    if (form) {
        form.reset();
    }
    
    modal.style.display = 'flex';
    modal.classList.add('active');
}

function hideItemTransferModal() {
    const modal = document.getElementById('itemTransferModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Function to request item transfer
function requestItemTransfer(e) {
    e.preventDefault();
    
    // Get form elements directly
    const sourceDepartment = document.getElementById('sourceDepartment');
    const targetDepartment = document.getElementById('targetDepartment');
    const transferItem = document.getElementById('transferItem');
    const transferQuantity = document.getElementById('transferQuantity');
    const transferReason = document.getElementById('transferReason');

    // Validate inputs
    if (!sourceDepartment.value || !targetDepartment.value) {
        showNotification('Please select source and target departments', 'error');
        return;
    }

    if (sourceDepartment.value === targetDepartment.value) {
        showNotification('Source and target departments cannot be the same', 'error');
        return;
    }

    if (!transferItem.value || transferItem.value.trim() === '') {
        showNotification('Please enter an item to transfer', 'error');
        return;
    }

    const quantity = parseInt(transferQuantity.value);
    if (isNaN(quantity) || quantity <= 0) {
        showNotification('Please enter a valid quantity', 'error');
        return;
    }

    // Find source department and check item availability
    const sourceDept = departmentsData.find(d => d.id === parseInt(sourceDepartment.value));

    if (!sourceDept) {
        showNotification('Invalid source department', 'error');
        return;
    }

    const sourceItem = sourceDept.items.find(item => item.name.toLowerCase() === transferItem.value.toLowerCase());

    if (!sourceItem) {
        showNotification(`Item "${transferItem.value}" not found in source department`, 'error');
        return;
    }

    if (sourceItem.quantity < quantity) {
        showNotification(`Insufficient ${transferItem.value} in source department. Available: ${sourceItem.quantity}`, 'error');
        return;
    }

    // Create transfer request
    const transferRequest = {
        id: transferRequests.length + 1,
        sourceDepartment: sourceDepartment.value,
        targetDepartment: targetDepartment.value,
        item: transferItem.value,
        quantity: quantity,
        reason: transferReason.value,
        status: 'Pending'
    };

    // Add transfer request
    transferRequests.push(transferRequest);
    saveTransferRequestsToLocalStorage();
    
    // Update source department item quantity
    sourceItem.quantity -= quantity;

    // Find or create target department item
    const targetDept = departmentsData.find(d => d.id === parseInt(targetDepartment.value));
    if (targetDept) {
        const targetItem = targetDept.items.find(item => item.name.toLowerCase() === transferItem.value.toLowerCase());
        if (targetItem) {
            targetItem.quantity += quantity;
        } else {
            targetDept.items.push({
                name: transferItem.value,
                quantity: quantity
            });
        }
    }
    
    // Save changes to local storage
    saveDepartmentsToLocalStorage();
    
    // Render transfer requests and departments
    renderTransferRequests();
    renderDepartments();
    
    // Hide modal
    hideItemTransferModal();
    
    // Show success notification
    showNotification('Transfer request submitted successfully!');
}

// Function to update source items dropdown based on selected department
function updateSourceItems() {
    const sourceDepartment = document.getElementById('sourceDepartment');
    const transferItem = document.getElementById('transferItem');
    
    // Clear existing options
    transferItem.innerHTML = '<option value="">Select Item</option>';
    
    // Find the selected department
    const selectedDept = departmentsData.find(d => d.id === parseInt(sourceDepartment.value));
    
    if (selectedDept && selectedDept.items) {
        // Populate items dropdown
        selectedDept.items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} (${item.quantity} available)`;
            transferItem.appendChild(option);
        });
    }
}

// Function to approve transfer request
function approveTransfer(requestId) {
    const request = transferRequests.find(r => r.id === requestId);
    if (!request) return;

    // Find source and target departments
    const sourceDept = departmentsData.find(d => d.id === parseInt(request.sourceDepartment));
    const targetDept = departmentsData.find(d => d.id === parseInt(request.targetDepartment));

    if (!sourceDept || !targetDept) return;

    // Update item quantities
    const sourceItem = sourceDept.items.find(item => item.name === request.item);
    const targetItem = targetDept.items.find(item => item.name === request.item);

    if (sourceItem && sourceItem.quantity >= request.quantity) {
        sourceItem.quantity -= request.quantity;

        if (targetItem) {
            targetItem.quantity += request.quantity;
        } else {
            targetDept.items.push({
                name: request.item,
                quantity: request.quantity
            });
        }

        // Update request status
        request.status = 'Approved';
        saveTransferRequestsToLocalStorage();
        saveDepartmentsToLocalStorage();
        renderTransferRequests();
        renderDepartments();
        showNotification('Transfer request approved!');
    } else {
        showNotification('Insufficient item quantity!', 'error');
    }
}

// Function to reject transfer request
function rejectTransfer(requestId) {
    const requestIndex = transferRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
        transferRequests[requestIndex].status = 'Rejected';
        saveTransferRequestsToLocalStorage();
        renderTransferRequests();
        showNotification('Transfer request rejected.');
    }
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notificationContainer = document.getElementById('notificationContainer') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500);
    }, 3000);
}

// Function to create notification container if it doesn't exist
function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

// Function to handle department search
function searchDepartments() {
    const searchInput = document.getElementById('departmentSearch');
    const filterSelect = document.getElementById('departmentFilter');
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();

    const filteredDepartments = departmentsData.filter(dept => {
        const matchesSearch = dept.name.toLowerCase().includes(searchTerm) || 
                               dept.head.toLowerCase().includes(searchTerm) || 
                               dept.description.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === '' || dept.name.toLowerCase() === filterValue;
        
        return matchesSearch && matchesFilter;
    });

    renderDepartments(filteredDepartments);
}

// Helper function to get department name by ID
function getDepartmentName(id) {
    const department = departmentsData.find(d => d.id === parseInt(id));
    return department ? department.name : 'Unknown';
}

// Function to add a new department
function addDepartment(e) {
    e.preventDefault();

    // Get form elements
    const departmentName = document.getElementById('departmentName');
    const departmentHead = document.getElementById('departmentHead');
    const departmentDescription = document.getElementById('departmentDescription');

    // Debug logging
    console.log('Add Department Form Elements:', {
        departmentName,
        departmentHead,
        departmentDescription
    });

    // Validate form elements exist
    if (!departmentName || !departmentHead || !departmentDescription) {
        showNotification('Form elements not found. Please check the form setup.', 'error');
        return;
    }

    // Validate inputs
    if (!departmentName.value.trim()) {
        showNotification('Department name is required', 'error');
        return;
    }

    // Check if department name already exists
    if (departmentsData.some(d => d.name.toLowerCase() === departmentName.value.trim().toLowerCase())) {
        showNotification('A department with this name already exists', 'error');
        return;
    }

    // Create new department object
    const newDepartment = {
        id: departmentsData.length > 0 
            ? Math.max(...departmentsData.map(d => d.id)) + 1 
            : 1,
        name: departmentName.value.trim(),
        head: departmentHead.value.trim() || 'Unassigned',
        description: departmentDescription.value.trim() || 'No description provided',
        items: [] // Start with no items
    };

    // Add department to data
    departmentsData.push(newDepartment);

    // Save to local storage
    saveDepartmentsToLocalStorage();

    // Render updated departments
    renderDepartments();

    // Reset form and hide modal
    departmentName.value = '';
    departmentHead.value = '';
    departmentDescription.value = '';
    hideAddDepartmentModal();

    // Show success notification
    showNotification('Department added successfully!');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load data from local storage
    loadDepartmentsFromLocalStorage();
    loadTransferRequestsFromLocalStorage();

    // Initial render
    renderDepartments();
    renderTransferRequests();

    // Setup transfer form submission
    const itemTransferForm = document.getElementById('itemTransferForm');
    
    if (itemTransferForm) {
        itemTransferForm.addEventListener('submit', function(e) {
            requestItemTransfer(e);
        });
    }

    // Setup add department form submission
    const addDepartmentForm = document.getElementById('addDepartmentForm');
    console.log('Add Department Form:', addDepartmentForm); // Debug logging

    if (addDepartmentForm) {
        addDepartmentForm.addEventListener('submit', function(e) {
            console.log('Add Department Form Submitted'); // Debug logging
            addDepartment(e);
        });
    } else {
        console.error('Add Department Form not found. Check your HTML form ID.');
    }

    // Setup modal close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                if (modal.id === 'itemTransferModal') {
                    hideItemTransferModal();
                } else if (modal.id === 'addDepartmentModal') {
                    hideAddDepartmentModal();
                }
            }
        });
    });

    // Setup source department change event
    const sourceDepartment = document.getElementById('sourceDepartment');
    if (sourceDepartment) {
        sourceDepartment.addEventListener('change', updateSourceItems);
    }
});
