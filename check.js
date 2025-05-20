// check.js

// Fetch table data from backend at port 8080 and display in a list

async function loadTableData() {
    try {
        const response = await fetch('http://localhost:8080/table');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Assuming data is an array of objects
        const list = document.createElement('ul');
        data.forEach(row => {
            const item = document.createElement('li');
            item.textContent = JSON.stringify(row);
            list.appendChild(item);
        });

        document.body.appendChild(list);
    } catch (error) {
        console.error('Error loading table data:', error);
    }
}

// Call the function when the page loads
window.onload = loadTableData;