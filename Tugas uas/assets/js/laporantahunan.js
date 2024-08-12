const reportForm = document.getElementById('reportForm');
const annualChartCtx = document.getElementById('annualChart').getContext('2d');
const historyContainer = document.getElementById('historyContainer');
const historyTableBody = document.getElementById('historyTable').getElementsByTagName('tbody')[0];

let years = [];
let values = [];
let assetIncreases = [];
let numBorrowers = [];
let fundIncreases = [];

const annualChart = new Chart(annualChartCtx, {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            {
                label: 'Nilai',
                data: values,
                backgroundColor: 'rgba(42, 33, 133, 0.5)',
                borderColor: '#2a2185',
                borderWidth: 1,
                stack: 'stack1'
            },
            {
                label: 'Peningkatan Aset',
                data: assetIncreases,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: '#ff6384',
                borderWidth: 1,
                stack: 'stack2'
            },
            {
                label: 'Jumlah Orang yang Meminjam Barang',
                data: numBorrowers,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: '#36a2eb',
                borderWidth: 1,
                stack: 'stack2'
            },
            {
                label: 'Nominal Dana yang Meningkat',
                data: fundIncreases,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: '#4bc0c0',
                borderWidth: 1,
                stack: 'stack2'
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tahun'
                },
                stacked: true
            },
            y: {
                title: {
                    display: true,
                    text: 'Nilai'
                },
                stacked: true
            }
        }
    }
});

reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const year = document.getElementById('year').value;
    const value = document.getElementById('value').value;
    const assetIncrease = document.getElementById('assetIncrease').value;
    const numBorrower = document.getElementById('numBorrower').value;
    const fundIncrease = document.getElementById('fundIncrease').value;

    // Check if year already exists
    const index = years.indexOf(year);

    if (index !== -1) {
        values[index] = value;
        assetIncreases[index] = assetIncrease;
        numBorrowers[index] = numBorrower;
        fundIncreases[index] = fundIncrease;
    } else {
        years.push(year);
        values.push(value);
        assetIncreases.push(assetIncrease);
        numBorrowers.push(numBorrower);
        fundIncreases.push(fundIncrease);
    }

    // Update chart
    annualChart.data.labels = years;
    annualChart.data.datasets[0].data = values;
    annualChart.data.datasets[1].data = assetIncreases;
    annualChart.data.datasets[2].data = numBorrowers;
    annualChart.data.datasets[3].data = fundIncreases;
    annualChart.update();

    // Update history table
    let row = historyTableBody.insertRow();
    row.insertCell(0).innerText = year;
    row.insertCell(1).innerText = value;
    row.insertCell(2).innerText = assetIncrease;
    row.insertCell(3).innerText = numBorrower;
    row.insertCell(4).innerText = fundIncrease;

    // Clear form fields
    reportForm.reset();
});

// Show/hide history container
document.getElementById('historyLink').addEventListener('click', () => {
    if (historyContainer.style.display === 'none' || historyContainer.style.display === '') {
        historyContainer.style.display = 'block';
    } else {
        historyContainer.style.display = 'none';
    }
});



// Toggle Menu
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};
