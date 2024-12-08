// Enhanced Reports JavaScript

// Chart Data
const dummyData = {
    // Simplified to 7 days of data instead of 30
    inventory: Array.from({ length: 7 }, () => Math.floor(Math.random() * (95 - 75) + 75)),
    inventoryDetails: [
        { inStock: 234, ordered: 50, pending: 15, returns: 3 },
        { inStock: 245, ordered: 45, pending: 12, returns: 2 },
        { inStock: 228, ordered: 55, pending: 18, returns: 4 },
        { inStock: 256, ordered: 40, pending: 10, returns: 1 },
        { inStock: 242, ordered: 48, pending: 14, returns: 3 },
        { inStock: 238, ordered: 52, pending: 16, returns: 2 },
        { inStock: 250, ordered: 43, pending: 11, returns: 2 }
    ],
    supplier: {
        metrics: ['Delivery Time', 'Quality', 'Price', 'Response Time', 'Reliability'],
        values: [85, 90, 78, 88, 92]
    }
};

// Initialize all charts
document.addEventListener('DOMContentLoaded', () => {
    initializeLineChart();
    initializeRadarChart();
    initializeGaugeCharts();
    setupRealTimeUpdates();
    initializeExportButtons();
});

// Line Chart Functions
function initializeLineChart() {
    const svg = document.getElementById('inventoryTrendChart');
    const width = svg.clientWidth - 60;
    const height = svg.clientHeight - 40;
    const data = dummyData.inventory;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Clear previous content
    svg.innerHTML = `
        <g class="grid-lines"></g>
        <path class="trend-line"></path>
        <g class="data-points"></g>
        <g class="x-axis"></g>
        <g class="y-axis"></g>
    `;

    // Create tooltip div if it doesn't exist
    let tooltip = document.getElementById('chart-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'chart-tooltip';
        tooltip.className = 'chart-tooltip';
        document.body.appendChild(tooltip);
    }

    // Create scales
    const xScale = width / (data.length - 1);
    const yMin = Math.min(...data) - 5;
    const yMax = Math.max(...data) + 5;
    const yRange = yMax - yMin;

    // Create grid lines
    const gridLines = svg.querySelector('.grid-lines');
    [0, 0.5, 1].forEach(ratio => {
        const y = height - (height * ratio);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', '30');
        line.setAttribute('y1', y);
        line.setAttribute('x2', width + 30);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(0,0,0,0.1)');
        line.setAttribute('stroke-width', '1');
        gridLines.appendChild(line);
    });

    // Create trend line
    let pathD = '';
    const points = [];
    data.forEach((value, index) => {
        const x = index * xScale + 30;
        const y = height - ((value - yMin) / yRange * height);
        points.push({ x, y });
        pathD += `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    });

    const trendLine = svg.querySelector('.trend-line');
    trendLine.setAttribute('d', pathD);

    // Add data points with hover effect
    const dataPoints = svg.querySelector('.data-points');
    let tooltipTimeout;

    points.forEach((point, index) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.classList.add('data-point');

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '3.5');

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', point.x);
        text.setAttribute('y', point.y - 9);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = `${data[index]}%`;

        const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hitArea.setAttribute('cx', point.x);
        hitArea.setAttribute('cy', point.y);
        hitArea.setAttribute('r', '15'); // Increased hit area
        hitArea.setAttribute('fill', 'transparent');
        hitArea.classList.add('hit-area');

        let isHovering = false;

        const showTooltip = (e) => {
            if (tooltipTimeout) {
                clearTimeout(tooltipTimeout);
            }

            const details = dummyData.inventoryDetails[index];
            tooltip.innerHTML = `
                <div class="tooltip-header">${days[index]}</div>
                <div class="tooltip-content">
                    <div>In Stock: ${details.inStock} units</div>
                    <div>Ordered: ${details.ordered} units</div>
                    <div>Pending: ${details.pending} units</div>
                    <div>Returns: ${details.returns} units</div>
                </div>
            `;

            // Position tooltip
            const rect = svg.getBoundingClientRect();
            const tooltipX = e.clientX;
            const tooltipY = e.clientY;

            // Ensure tooltip stays within viewport
            const tooltipRect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = tooltipX + 15;
            let top = tooltipY - 70;

            // Adjust if tooltip would go off screen
            if (left + tooltipRect.width > viewportWidth) {
                left = tooltipX - tooltipRect.width - 15;
            }
            if (top < 0) {
                top = tooltipY + 15;
            }

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.style.display = 'block';
            
            // Use RAF to ensure smooth transition
            requestAnimationFrame(() => {
                tooltip.classList.add('visible');
            });

            circle.setAttribute('r', '5');
        };

        const hideTooltip = () => {
            tooltip.classList.remove('visible');
            tooltipTimeout = setTimeout(() => {
                tooltip.style.display = 'none';
            }, 200); // Match this with CSS transition duration
            circle.setAttribute('r', '3.5');
        };

        hitArea.addEventListener('mouseenter', (e) => {
            isHovering = true;
            showTooltip(e);
        });

        hitArea.addEventListener('mouseleave', () => {
            isHovering = false;
            hideTooltip();
        });

        // Update tooltip position on mousemove
        hitArea.addEventListener('mousemove', (e) => {
            if (isHovering) {
                showTooltip(e);
            }
        });

        g.appendChild(hitArea);
        g.appendChild(circle);
        g.appendChild(text);
        dataPoints.appendChild(g);
    });

    // Add axes
    const xAxis = svg.querySelector('.x-axis');
    days.forEach((day, i) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', i * xScale + 30);
        text.setAttribute('y', height + 20);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = day;
        xAxis.appendChild(text);
    });

    // Add Y-axis labels
    const yAxis = svg.querySelector('.y-axis');
    [yMax, (yMax + yMin) / 2, yMin].forEach((value, i) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', '25');
        text.setAttribute('y', height - (height * i / 2));
        text.setAttribute('text-anchor', 'end');
        text.textContent = Math.round(value) + '%';
        yAxis.appendChild(text);
    });
}

// Radar Chart Functions
function initializeRadarChart() {
    const svg = document.getElementById('supplierPerformanceChart');
    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    const radius = Math.min(centerX, centerY) - 50;
    
    const { metrics, values } = dummyData.supplier;
    const points = [];
    const angleStep = (2 * Math.PI) / metrics.length;

    // Create radar grid
    const radarGrid = svg.querySelector('.radar-grid');
    for (let level = 1; level <= 5; level++) {
        const r = radius * (level / 5);
        let polygonPoints = '';
        
        for (let i = 0; i < metrics.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            polygonPoints += `${x},${y} `;
        }
        
        radarGrid.innerHTML += `
            <polygon points="${polygonPoints}"/>
        `;
    }

    // Create data area
    values.forEach((value, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * (value / 100);
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        points.push({ x, y });
    });

    const dataArea = svg.querySelector('.data-area');
    dataArea.innerHTML = `
        <polygon points="${points.map(p => `${p.x},${p.y}`).join(' ')}"/>
    `;

    // Add data points
    const dataPoints = svg.querySelector('.data-points');
    points.forEach(point => {
        dataPoints.innerHTML += `
            <circle cx="${point.x}" cy="${point.y}" r="4"/>
        `;
    });

    // Add labels
    const labels = svg.querySelector('.labels');
    metrics.forEach((metric, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + (radius + 20) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);
        labels.innerHTML += `
            <text x="${x}" y="${y}" text-anchor="middle">${metric}</text>
        `;
    });
}

// Gauge Chart Functions
function initializeGaugeCharts() {
    const gauges = document.querySelectorAll('.gauge-chart');
    gauges.forEach(gauge => {
        // Generate initial random value between 70 and 100
        const initialValue = Math.floor(Math.random() * (100 - 70) + 70);
        updateGauge(gauge, initialValue);
    });
}

function updateGauge(gauge, value) {
    const progress = gauge.querySelector('.gauge-progress');
    const valueText = gauge.querySelector('.gauge-value');
    
    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 270; // 270 degrees arc
    const startAngle = -225; // Start at -225 degrees (bottom left)
    const angleRange = maxAngle * (value / 100);
    
    // Calculate start point
    const startX = 75 + radius * Math.cos(startAngle * Math.PI / 180);
    const startY = 75 + radius * Math.sin(startAngle * Math.PI / 180);
    
    // Calculate end point
    const endAngle = startAngle + angleRange;
    const endX = 75 + radius * Math.cos(endAngle * Math.PI / 180);
    const endY = 75 + radius * Math.sin(endAngle * Math.PI / 180);
    
    // Create arc path
    const largeArcFlag = angleRange > 180 ? 1 : 0;
    const arcPath = `
        M ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    `;
    
    progress.setAttribute('d', arcPath);
    progress.style.strokeDasharray = `${circumference}`;
    progress.style.strokeDashoffset = `${circumference * (1 - value / 100)}`;
    valueText.textContent = `${Math.round(value)}%`;
}

// Real-time updates
function setupRealTimeUpdates() {
    // Update line chart every 10 seconds with smoother transitions
    setInterval(() => {
        dummyData.inventory.shift();
        // Generate new value close to the last value for smoother transitions
        const lastValue = dummyData.inventory[dummyData.inventory.length - 1];
        const newValue = Math.max(75, Math.min(95, 
            lastValue + (Math.random() * 10 - 5))); // Change by -5 to +5
        dummyData.inventory.push(Math.round(newValue));
        initializeLineChart();
    }, 10000); // Changed to 10 seconds

    // Update gauge charts every 30 seconds
    setInterval(() => {
        document.querySelectorAll('.gauge-chart').forEach(gauge => {
            const newValue = Math.floor(Math.random() * (100 - 70) + 70);
            updateGauge(gauge, newValue);
        });
    }, 30000);
}

// Export functionality
function initializeExportButtons() {
    document.querySelectorAll('.export-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const reportType = e.target.dataset.report;
            exportReport(reportType);
        });
    });
}

// Export report function
function exportReport(reportType) {
    // Get report data
    const reportData = generateReportData(reportType);
    
    // Create CSV
    const csv = convertToCSV(reportData);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${reportType}_report_${new Date().toISOString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Utility functions
function generateReportData(reportType) {
    // TO DO: implement report data generation
    return [];
}

function convertToCSV(data) {
    // TO DO: implement CSV conversion
    return '';
}
