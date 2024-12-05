// Departments Data Model
let departmentsData = [
    {
        id: 1,
        name: 'Housekeeping',
        head: 'Maria Rodriguez',
        description: 'Responsible for room cleaning, maintenance, and guest comfort',
        items: [
            { name: 'Bath Towels', quantity: 120 },
            { name: 'Cleaning Supplies', quantity: 65 }
        ]
    },
    {
        id: 2,
        name: 'Food & Beverage',
        head: 'John Smith',
        description: 'Manages restaurant, room service, and mini-bar operations',
        items: [
            { name: 'Coffee Pods', quantity: 30 },
            { name: 'Tea Bags', quantity: 250 }
        ]
    },
    {
        id: 3,
        name: 'Amenities',
        head: 'Sarah Lee',
        description: 'Manages guest amenities and welcome packages',
        items: [
            { name: 'Shampoo Bottles', quantity: 45 },
            { name: 'Dental Kits', quantity: 180 }
        ]
    }
];

let transferRequests = [];

// Function to render departments
function renderDepartments(filteredDepartments = null) {
    const departmentsGrid = document.getElementById('departmentsGrid');
    departmentsGrid.innerHTML = '';

    const dataToRender = filteredDepartments || departmentsData;

    dataToRender.forEach(department => {
        const departmentCard = document.createElement('div');
        departmentCard.className = 'department-card';
        departmentCard.innerHTML = `
            <div class="department-card-header">
                <h3>${department.name}</h3>
                <div class="department-actions">
                    <button class="department-edit-btn" onclick="editDepartment(${department.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="department-delete-btn" onclick="deleteDepartment(${department.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="department-card-details">
                <p><strong>Head:</strong> ${department.head}</p>
                <p>${department.description}</p>
                <div class="department-items">
                    <strong>Key Items:</strong>
                    <ul>
                        ${department.items.map(item => `<li>${item.name}: ${item.quantity}</li>`).join('')}
                    </ul>
                </div>
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
    
    // Reset form and remove any previous editing state
    const form = document.getElementById('addDepartmentForm');
    form.reset();
    delete form.dataset.editingId;
    
    // Reset modal header and submit button
    modal.querySelector('.modal-header h2').textContent = 'Add New Department';
    form.querySelector('.submit-btn').textContent = 'Add Department';
    
    // Show modal
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

// Function to hide add department modal
function hideAddDepartmentModal() {
    const modal = document.getElementById('addDepartmentModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
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

// Function to delete a department
function deleteDepartment(id) {
    departmentsData = departmentsData.filter(d => d.id !== id);
    renderDepartments();
    showNotification('Department deleted successfully!');
}

// Function to show item transfer modal
function showItemTransferModal() {
    const modal = document.getElementById('itemTransferModal');
    const sourceDepartmentSelect = modal.querySelector('#sourceDepartment');
    const targetDepartmentSelect = modal.querySelector('#targetDepartment');
    const itemSelect = modal.querySelector('#transferItem');

    // Reset form
    document.getElementById('itemTransferForm').reset();

    // Populate department selects
    sourceDepartmentSelect.innerHTML = departmentsData.map(dept => 
        `<option value="${dept.id}">${dept.name}</option>`
    ).join('');

    targetDepartmentSelect.innerHTML = departmentsData.map(dept => 
        `<option value="${dept.id}">${dept.name}</option>`
    ).join('');

    // Populate items select (from source department)
    sourceDepartmentSelect.addEventListener('change', (e) => {
        const sourceDept = departmentsData.find(d => d.id === parseInt(e.target.value));
        itemSelect.innerHTML = sourceDept.items.map(item => 
            `<option value="${item.name}">${item.name} (${item.quantity})</option>`
        ).join('');
    });

    // Trigger initial items population
    if (departmentsData.length > 0) {
        const firstDept = departmentsData[0];
        itemSelect.innerHTML = firstDept.items.map(item => 
            `<option value="${item.name}">${item.name} (${item.quantity})</option>`
        ).join('');
    }

    // Show modal
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

// Function to hide item transfer modal
function hideItemTransferModal() {
    const modal = document.getElementById('itemTransferModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Function to request item transfer
function requestItemTransfer(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const transferRequest = {
        id: transferRequests.length + 1,
        sourceDepartment: formData.get('sourceDepartment'),
        targetDepartment: formData.get('targetDepartment'),
        item: formData.get('transferItem'),
        quantity: parseInt(formData.get('transferQuantity')),
        reason: formData.get('transferReason'),
        status: 'Pending'
    };

    transferRequests.push(transferRequest);
    renderTransferRequests();
    hideItemTransferModal();
    showNotification('Transfer request submitted successfully!');
}

// Helper function to get department name by ID
function getDepartmentName(id) {
    const department = departmentsData.find(d => d.id === parseInt(id));
    return department ? department.name : 'Unknown';
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const addDepartmentForm = document.getElementById('addDepartmentForm');
    const itemTransferForm = document.getElementById('itemTransferForm');
    const departmentSearch = document.getElementById('departmentSearch');
    const departmentFilter = document.getElementById('departmentFilter');

    // Initial render
    renderDepartments();
    renderTransferRequests();

    // Form submission listeners
    addDepartmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editingId = e.target.dataset.editingId;
        
        if (editingId) {
            // Update existing department
            const departmentIndex = departmentsData.findIndex(d => d.id === parseInt(editingId));
            if (departmentIndex !== -1) {
                const formData = new FormData(e.target);
                departmentsData[departmentIndex] = {
                    id: parseInt(editingId),
                    name: formData.get('departmentName'),
                    head: formData.get('departmentHead'),
                    description: formData.get('departmentDescription'),
                    items: departmentsData[departmentIndex].items
                };
                renderDepartments();
                hideAddDepartmentModal();
                showNotification('Department updated successfully!');
            }
            delete e.target.dataset.editingId;
        } else {
            // Add new department
            addDepartment(e);
        }
    });

    itemTransferForm.addEventListener('submit', requestItemTransfer);

    // Search and filter listeners
    departmentSearch.addEventListener('input', searchDepartments);
    departmentFilter.addEventListener('change', searchDepartments);
});

// Event Listeners for close buttons
document.addEventListener('DOMContentLoaded', () => {
    // Close buttons for modals
    const modalCloseButtons = document.querySelectorAll('.close-btn');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });
});

// Function to add a new department
function addDepartment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newDepartment = {
        id: departmentsData.length + 1,
        name: formData.get('departmentName'),
        head: formData.get('departmentHead'),
        description: formData.get('departmentDescription'),
        items: []
    };

    departmentsData.push(newDepartment);
    renderDepartments();
    hideAddDepartmentModal();
    showNotification('Department added successfully!');
}
