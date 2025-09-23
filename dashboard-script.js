document.addEventListener('DOMContentLoaded', () => {
    // --- Upload Modal Functionality ---
    const uploadModal = document.getElementById('upload-modal');
    const closeUploadModalBtn = document.getElementById('close-upload-modal');
    const sidebarUploadBtn = document.getElementById('sidebar-upload-btn');
    const quickActionUploadBtn = document.getElementById('quick-action-upload-btn');
    const fileInput = document.getElementById('file-input');
    const fileCountSpan = document.getElementById('file-count');
    const filePreviewContainer = document.getElementById('file-preview-container');
    let uploadedFiles = []; // To store files temporarily

    function openUploadModal() {
        uploadModal.classList.add('active');
    }

    function closeUploadModal() {
        uploadModal.classList.remove('active');
        // Clear form and preview when closing
        document.getElementById('upload-form').reset();
        uploadedFiles = [];
        updateFilePreview();
    }

    sidebarUploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openUploadModal();
    });

    quickActionUploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openUploadModal();
    });

    closeUploadModalBtn.addEventListener('click', closeUploadModal);

    // Close modal if clicking outside the card
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            closeUploadModal();
        }
    });

    fileInput.addEventListener('change', (e) => {
        uploadedFiles = Array.from(e.target.files);
        updateFilePreview();
    });

    function updateFilePreview() {
        filePreviewContainer.innerHTML = ''; // Clear existing previews
        fileCountSpan.textContent = `${uploadedFiles.length} files selected`;

        uploadedFiles.forEach((file, index) => {
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file-preview');
            fileDiv.innerHTML = `
                <span class="file-name">${file.name}</span>
                <button type="button" class="remove-file" data-index="${index}">&times;</button>
            `;
            filePreviewContainer.appendChild(fileDiv);
        });

        // Add event listeners to new remove buttons
        filePreviewContainer.querySelectorAll('.remove-file').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.target.dataset.index);
                uploadedFiles.splice(indexToRemove, 1); // Remove from array
                // Re-assign files to input to reflect changes (optional, but good practice)
                const dataTransfer = new DataTransfer();
                uploadedFiles.forEach(file => dataTransfer.items.add(file));
                fileInput.files = dataTransfer.files;
                updateFilePreview(); // Re-render preview
            });
        });
    }

    document.getElementById('upload-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would handle the form submission,
        // e.g., send data to a server using FormData
        const hazardType = document.getElementById('hazard-type').value;
        const message = document.getElementById('message').value;

        console.log('Submitting Report:');
        console.log('Hazard Type:', hazardType);
        console.log('Message:', message);
        console.log('Files:', uploadedFiles);

        alert('Report Submitted! (Check console for data)');
        closeUploadModal();
    });


    // --- Chart.js Initialization ---
    // (You'll need Chart.js library linked in HTML for these to work)

    // Hazard Trends Chart
    const hazardChartCtx = document.getElementById('hazard-chart').getContext('2d');
    new Chart(hazardChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Hazard Incidents',
                data: [12, 19, 3, 5, 2, 8],
                borderColor: '#ef5350', // Red for hazards
                backgroundColor: 'rgba(239, 83, 80, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Water Quality Index Chart
    const waterQualityChartCtx = document.getElementById('water-quality-chart').getContext('2d');
    new Chart(waterQualityChartCtx, {
        type: 'bar',
        data: {
            labels: ['River A', 'Lake B', 'Coastal C', 'Stream D'],
            datasets: [{
                label: 'Water Quality Index (0-100)',
                data: [75, 88, 62, 91],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });

    // Departmental Performance Charts (Doughnut Charts)
    function createDepartmentChart(canvasId, total, solved, departmentName) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Solved', 'Pending'],
                datasets: [{
                    data: [solved, total - solved],
                    backgroundColor: ['#4CAF50', '#FFC107'], // Green for solved, Amber for pending
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Hide legend for small charts
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + ' reports';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    createDepartmentChart('imo-chart', 250, 230, 'IMO');
    createDepartmentChart('ilo-chart', 180, 165, 'ILO');
    createDepartmentChart('unesco-chart', 300, 280, 'UNESCO-IOC');
    createDepartmentChart('navy-chart', 400, 380, 'Navy & Coast Guard');
    createDepartmentChart('customs-chart', 150, 140, 'Customs & Immigration');
});