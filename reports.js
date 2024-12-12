// Enhanced Reports JavaScript

// Dummy data for Purchase Orders
const purchaseOrdersData = {
    currentOrders: [
        { id: 'PO-2024-001', supplier: 'Linen Plus', items: ['Bed Sheets', 'Towels'], total: 2500, status: 'Pending', date: '2024-01-05' },
        { id: 'PO-2024-002', supplier: 'ABC Supplies', items: ['Soap', 'Shampoo'], total: 1800, status: 'Approved', date: '2024-01-06' },
        { id: 'PO-2024-003', supplier: 'XYZ Corp', items: ['Cleaning Supplies'], total: 3200, status: 'Delivered', date: '2024-01-07' }
    ]
};

// Dummy data for Quality Control
const qualityControlData = {
    qualityChecks: [
        { id: 'QC-2024-001', item: 'Bed Sheets', batch: 'BTH-001', date: '2024-01-05', status: 'Passed', inspector: 'John Smith', notes: 'Meets quality standards' },
        { id: 'QC-2024-002', item: 'Towels', batch: 'BTH-002', date: '2024-01-06', status: 'Failed', inspector: 'Jane Doe', notes: 'Color inconsistency' },
        { id: 'QC-2024-003', item: 'Soap', batch: 'BTH-003', date: '2024-01-07', status: 'Passed', inspector: 'John Smith', notes: 'Good quality' }
    ]
};

// Dummy data for Expiry Tracking
const expiryData = {
    items: [
        { id: 'INV-2024-001', name: 'Shampoo Bottles', batch: 'BTH-001', expiryDate: '2024-06-15', quantity: 200, location: 'Warehouse A', daysUntilExpiry: 159 },
        { id: 'INV-2024-002', name: 'Soap Bars', batch: 'BTH-002', expiryDate: '2024-02-28', quantity: 150, location: 'Warehouse B', daysUntilExpiry: 51 },
        { id: 'INV-2024-003', name: 'Cleaning Solution', batch: 'BTH-003', expiryDate: '2024-01-15', quantity: 100, location: 'Warehouse A', daysUntilExpiry: 7 }
    ]
};

// Balance Sheet Data
const inventoryData = {
    items: [
        { id: 'ITM-001', name: 'Bed Sheets', quantity: 450, value: 15, location: 'Main Storage', category: 'Linen' },
        { id: 'ITM-002', name: 'Towels', quantity: 800, value: 8, location: 'Housekeeping', category: 'Linen' },
        { id: 'ITM-003', name: 'Soap Bars', quantity: 1200, value: 2, location: 'Main Storage', category: 'Amenities' },
        { id: 'ITM-004', name: 'Shampoo Bottles', quantity: 900, value: 3, location: 'Housekeeping', category: 'Amenities' }
    ],
    movements: [
        { date: '2024-01-08', type: 'Received', itemId: 'ITM-001', quantity: 100, location: 'Main Storage' },
        { date: '2024-01-07', type: 'Transfer', itemId: 'ITM-002', quantity: 50, location: 'Housekeeping' },
        { date: '2024-01-06', type: 'Disposal', itemId: 'ITM-003', quantity: 20, location: 'Main Storage' }
    ],
    locations: ['Main Storage', 'Housekeeping', 'Kitchen Storage', 'Maintenance']
};

// Helper Functions
function getExpiryStatus(daysUntilExpiry) {
    if (daysUntilExpiry <= 7) return 'critical';
    if (daysUntilExpiry <= 30) return 'warning';
    if (daysUntilExpiry <= 90) return 'attention';
    return 'safe';
}

function getExpiryStatusText(daysUntilExpiry) {
    if (daysUntilExpiry <= 7) return 'Critical';
    if (daysUntilExpiry <= 30) return 'Warning';
    if (daysUntilExpiry <= 90) return 'Attention';
    return 'Safe';
}

function generateExpiryTableRows(items) {
    return items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.batch}</td>
            <td>${item.expiryDate}</td>
            <td>${item.daysUntilExpiry} days</td>
            <td>${item.quantity}</td>
            <td>${item.location}</td>
            <td><span class="status ${getExpiryStatus(item.daysUntilExpiry)}">${getExpiryStatusText(item.daysUntilExpiry)}</span></td>
        </tr>
    `).join('');
}

function groupByCategory(items) {
    return items.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});
}

// Report Generation Functions
function generateSupplierReport() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Supplier Performance Analysis</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="supplier-summary">
                    <div class="summary-card">
                        <h3>On-Time Delivery</h3>
                        <div class="big-number">94%</div>
                        <div class="trend positive">↑ 2.1%</div>
                    </div>
                    <div class="summary-card">
                        <h3>Quality Score</h3>
                        <div class="big-number">98.5%</div>
                        <div class="trend positive">↑ 0.5%</div>
                    </div>
                    <div class="summary-card">
                        <h3>Response Time</h3>
                        <div class="big-number">4.8</div>
                        <div class="subtitle">hours avg.</div>
                    </div>
                    <div class="summary-card">
                        <h3>Average Delay</h3>
                        <div class="big-number">1.2</div>
                        <div class="subtitle">days</div>
                    </div>
                </div>

                <div class="supplier-table">
                    <h3>Top Suppliers Performance</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Reliability</th>
                                <th>On-Time</th>
                                <th>Quality</th>
                                <th>Response</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ABC Supplies Co.</td>
                                <td>98%</td>
                                <td>96%</td>
                                <td>99%</td>
                                <td>4.2h</td>
                                <td><span class="status excellent">Excellent</span></td>
                            </tr>
                            <tr>
                                <td>XYZ Corporation</td>
                                <td>95%</td>
                                <td>94%</td>
                                <td>97%</td>
                                <td>4.8h</td>
                                <td><span class="status good">Good</span></td>
                            </tr>
                            <tr>
                                <td>Global Traders Ltd.</td>
                                <td>92%</td>
                                <td>90%</td>
                                <td>95%</td>
                                <td>5.5h</td>
                                <td><span class="status good">Good</span></td>
                            </tr>
                            <tr>
                                <td>Quality Goods Inc.</td>
                                <td>94%</td>
                                <td>92%</td>
                                <td>96%</td>
                                <td>4.9h</td>
                                <td><span class="status good">Good</span></td>
                            </tr>
                            <tr>
                                <td>Prime Vendors Co.</td>
                                <td>96%</td>
                                <td>95%</td>
                                <td>98%</td>
                                <td>4.5h</td>
                                <td><span class="status excellent">Excellent</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="action-buttons">
                    <button onclick="exportSupplierReport()" class="btn-primary">Export Report</button>
                    <button onclick="scheduleSupplierMeeting()" class="btn-secondary">Schedule Review</button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    setTimeout(() => modal.classList.add('show'), 10);
}

function generatePOReport() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Purchase Order Status Report</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="po-summary">
                    <div class="summary-card">
                        <h3>Pending Orders</h3>
                        <span class="count">${purchaseOrdersData.currentOrders.filter(po => po.status === 'Pending').length}</span>
                    </div>
                    <div class="summary-card">
                        <h3>Approved Orders</h3>
                        <span class="count">${purchaseOrdersData.currentOrders.filter(po => po.status === 'Approved').length}</span>
                    </div>
                    <div class="summary-card">
                        <h3>Delivered Orders</h3>
                        <span class="count">${purchaseOrdersData.currentOrders.filter(po => po.status === 'Delivered').length}</span>
                    </div>
                </div>
                <div class="po-list">
                    <h3>Current Purchase Orders</h3>
                    <table class="po-table">
                        <thead>
                            <tr>
                                <th>PO Number</th>
                                <th>Supplier</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchaseOrdersData.currentOrders.map(po => `
                                <tr>
                                    <td>${po.id}</td>
                                    <td>${po.supplier}</td>
                                    <td>${po.items.join(', ')}</td>
                                    <td>$${po.total}</td>
                                    <td><span class="status ${po.status.toLowerCase()}">${po.status}</span></td>
                                    <td>${po.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="action-btn" onclick="exportPOReport()">Export Report</button>
                <button class="action-btn" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function generateQCReport() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Quality Control Report</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="qc-summary">
                    <div class="summary-card">
                        <h3>Total Inspections</h3>
                        <span class="count">${qualityControlData.qualityChecks.length}</span>
                    </div>
                    <div class="summary-card">
                        <h3>Pass Rate</h3>
                        <span class="count">${Math.round((qualityControlData.qualityChecks.filter(qc => qc.status === 'Passed').length / qualityControlData.qualityChecks.length) * 100)}%</span>
                    </div>
                    <div class="summary-card">
                        <h3>Failed Items</h3>
                        <span class="count">${qualityControlData.qualityChecks.filter(qc => qc.status === 'Failed').length}</span>
                    </div>
                </div>
                <div class="qc-list">
                    <h3>Recent Quality Checks</h3>
                    <table class="qc-table">
                        <thead>
                            <tr>
                                <th>QC ID</th>
                                <th>Item</th>
                                <th>Batch</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Inspector</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${qualityControlData.qualityChecks.map(qc => `
                                <tr>
                                    <td>${qc.id}</td>
                                    <td>${qc.item}</td>
                                    <td>${qc.batch}</td>
                                    <td>${qc.date}</td>
                                    <td><span class="status ${qc.status.toLowerCase()}">${qc.status}</span></td>
                                    <td>${qc.inspector}</td>
                                    <td>${qc.notes}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="action-btn" onclick="exportQCReport()">Export Report</button>
                <button class="action-btn" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function checkExpiryDates() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Expiry Date Tracking</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="expiry-summary">
                    <div class="summary-card critical">
                        <h3>Critical</h3>
                        <div class="count">${expiryData.items.filter(item => item.daysUntilExpiry <= 7).length}</div>
                        <div class="subtitle">≤ 7 days</div>
                    </div>
                    <div class="summary-card warning">
                        <h3>Warning</h3>
                        <div class="count">${expiryData.items.filter(item => item.daysUntilExpiry > 7 && item.daysUntilExpiry <= 30).length}</div>
                        <div class="subtitle">≤ 30 days</div>
                    </div>
                    <div class="summary-card attention">
                        <h3>Attention</h3>
                        <div class="count">${expiryData.items.filter(item => item.daysUntilExpiry > 30 && item.daysUntilExpiry <= 90).length}</div>
                        <div class="subtitle">≤ 90 days</div>
                    </div>
                    <div class="summary-card safe">
                        <h3>Safe</h3>
                        <div class="count">${expiryData.items.filter(item => item.daysUntilExpiry > 90).length}</div>
                        <div class="subtitle">> 90 days</div>
                    </div>
                </div>

                <div class="expiry-filters">
                    <button onclick="filterExpiryItems('all')" class="active">All Items</button>
                    <button onclick="filterExpiryItems('critical')">Critical (≤7 days)</button>
                    <button onclick="filterExpiryItems('warning')">Warning (≤30 days)</button>
                    <button onclick="filterExpiryItems('attention')">Attention (≤90 days)</button>
                    <button onclick="filterExpiryItems('safe')">Safe (>90 days)</button>
                </div>

                <div class="table-container">
                    <table class="expiry-table">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Expiry Date</th>
                                <th>Days Until Expiry</th>
                                <th>Quantity</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="expiryTableBody">
                            ${generateExpiryTableRows(expiryData.items)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="action-btn" onclick="exportExpiryReport()">Export Report</button>
                <button class="action-btn" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function generateBalanceSheet() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const totalValue = inventoryData.items.reduce((sum, item) => sum + (item.quantity * item.value), 0);
    const itemsByCategory = groupByCategory(inventoryData.items);
    
    const content = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Inventory Balance Sheet</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="summary-cards">
                    <div class="summary-card">
                        <h3>Total Items</h3>
                        <div class="big-number">${inventoryData.items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Total Value</h3>
                        <div class="big-number">$${totalValue.toFixed(2)}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Categories</h3>
                        <div class="big-number">${Object.keys(itemsByCategory).length}</div>
                    </div>
                </div>

                <div class="inventory-table">
                    <h3>Inventory by Category</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Items</th>
                                <th>Total Quantity</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(itemsByCategory).map(([category, items]) => `
                                <tr>
                                    <td>${category}</td>
                                    <td>${items.length}</td>
                                    <td>${items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                    <td>$${items.reduce((sum, item) => sum + (item.quantity * item.value), 0).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="action-buttons">
                    <button onclick="exportBalanceSheet()" class="btn-primary">Export Report</button>
                    <button onclick="printBalanceSheet()" class="btn-secondary">Print Report</button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    setTimeout(() => modal.classList.add('show'), 10);
}

function generateMovementReport() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Item Movement History</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="summary-cards">
                    <div class="summary-card">
                        <h3>Total Movements</h3>
                        <div class="big-number">${inventoryData.movements.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Locations</h3>
                        <div class="big-number">${inventoryData.locations.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Active Items</h3>
                        <div class="big-number">${inventoryData.items.length}</div>
                    </div>
                </div>

                <div class="movement-filters">
                    <button class="filter-btn active" onclick="filterMovements('all')">All</button>
                    <button class="filter-btn" onclick="filterMovements('received')">Received</button>
                    <button class="filter-btn" onclick="filterMovements('transfer')">Transfers</button>
                    <button class="filter-btn" onclick="filterMovements('disposal')">Disposals</button>
                </div>

                <div class="movement-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${inventoryData.movements.map(movement => {
                                const item = inventoryData.items.find(item => item.id === movement.itemId);
                                return `
                                    <tr>
                                        <td>${movement.date}</td>
                                        <td><span class="status ${movement.type.toLowerCase()}">${movement.type}</span></td>
                                        <td>${item ? item.name : 'Unknown Item'}</td>
                                        <td>${movement.quantity}</td>
                                        <td>${movement.location}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="action-buttons">
                    <button onclick="exportMovementReport()" class="btn-primary">Export Report</button>
                    <button onclick="printMovementReport()" class="btn-secondary">Print Report</button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    setTimeout(() => modal.classList.add('show'), 10);
}

// Filter Functions
function filterExpiryItems(status) {
    const tbody = document.getElementById('expiryTableBody');
    const items = [...expiryData.items];
    
    const filteredItems = status === 'all' ? items : items.filter(item => {
        const itemStatus = getExpiryStatus(item.daysUntilExpiry);
        return itemStatus === status;
    });
    
    tbody.innerHTML = generateExpiryTableRows(filteredItems);
    
    // Update active button state
    document.querySelectorAll('.expiry-filters button').forEach(btn => {
        btn.classList.toggle('active', btn.onclick.toString().includes(status));
    });
}

function filterMovements(type) {
    const buttons = document.querySelectorAll('.movement-filters .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter logic would go here
    alert(`Filtering for ${type} movements`);
}

// Export Functions
function exportSupplierReport() {
    alert('Supplier Report exported successfully!');
}

function exportPOReport() {
    alert('Purchase Order Report exported successfully!');
}

function exportQCReport() {
    alert('Quality Control Report exported successfully!');
}

function exportExpiryReport() {
    alert('Expiry Report exported successfully!');
}

function exportBalanceSheet() {
    alert('Exporting Balance Sheet...');
}

function exportMovementReport() {
    alert('Exporting Movement Report...');
}

function printBalanceSheet() {
    alert('Preparing Balance Sheet for printing...');
}

function printMovementReport() {
    alert('Preparing Movement Report for printing...');
}

// Add modal styles
const modalStyles = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .modal.show {
        opacity: 1;
    }

    .modal-content {
        background: white;
        border-radius: 8px;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        transform: translateY(-20px);
        transition: transform 0.3s ease-in-out;
    }

    .modal.show .modal-content {
        transform: translateY(0);
    }

    .modal-header {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    .modal-body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
    }

    .modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-shrink: 0;
    }

    .summary-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .summary-card h3 {
        color: #495057;
        margin: 0 0 10px 0;
        font-size: 1rem;
    }

    .summary-card .count,
    .summary-card .big-number {
        font-size: 2rem;
        font-weight: bold;
        color: #2c3e50;
        margin: 5px 0;
    }

    .summary-card .trend {
        font-size: 0.9rem;
        margin-top: 5px;
    }

    .summary-card .trend.positive {
        color: #28a745;
    }

    .summary-card .trend.negative {
        color: #dc3545;
    }

    .summary-card .subtitle {
        color: #6c757d;
        font-size: 0.9rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
    }

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    th {
        background: #f8f9fa;
        font-weight: 500;
        color: #495057;
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 500;
        display: inline-block;
    }

    .status.excellent {
        background: #d4edda;
        color: #155724;
    }

    .status.good {
        background: #cce5ff;
        color: #004085;
    }

    .status.critical {
        background: #f8d7da;
        color: #721c24;
    }

    .status.warning {
        background: #fff3cd;
        color: #856404;
    }

    .status.attention {
        background: #e2e3e5;
        color: #383d41;
    }

    .status.safe {
        background: #d4edda;
        color: #155724;
    }

    .action-btn,
    .btn-primary,
    .btn-secondary {
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .action-btn,
    .btn-primary {
        background: #4CAF50;
        color: white;
        border: none;
    }

    .btn-secondary {
        background: white;
        color: #4CAF50;
        border: 1px solid #4CAF50;
    }

    .action-btn:hover,
    .btn-primary:hover {
        background: #43a047;
    }

    .btn-secondary:hover {
        background: #f8f9fa;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
`;

const style = document.createElement('style');
style.textContent = modalStyles;
document.head.appendChild(style);
