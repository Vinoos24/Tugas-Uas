document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('itemForm');
    const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    let editingRow = null; // Variable to keep track of the row being edited

    // Load existing items from local storage
    loadItems();

    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemCode = document.getElementById('itemCode').value;
        const itemName = document.getElementById('itemName').value;
        const itemLocation = document.getElementById('itemLocation').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemDate = document.getElementById('itemDate').value;
        const itemCondition = document.getElementById('itemCondition').value;
        const itemPhoto = document.getElementById('itemPhoto').files[0];

        if (itemPhoto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const photoURL = e.target.result;
                if (editingRow) {
                    // Update item in table and local storage
                    updateItemInTable(editingRow, itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, photoURL);
                    updateItemInLocalStorage(editingRow, itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, photoURL);
                    editingRow = null; // Reset the editingRow variable
                } else {
                    // Add new item to table and local storage
                    addItemToTable(itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, photoURL);
                    saveItemToLocalStorage(itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, photoURL);
                }
                itemForm.reset();
            };
            reader.readAsDataURL(itemPhoto);
        }
    });

    function addItemToTable(code, name, location, quantity, date, condition, photoURL) {
        const row = itemTable.insertRow();
        row.insertCell(0).textContent = code;
        row.insertCell(1).textContent = name;
        row.insertCell(2).textContent = location;
        row.insertCell(3).textContent = quantity;
        row.insertCell(4).textContent = date;
        row.insertCell(5).textContent = condition;
        row.insertCell(6).innerHTML = `<img src="${photoURL}" alt="Item Photo">`;
        row.insertCell(7).innerHTML = `
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Hapus</button>
        `;
    }

    function updateItemInTable(row, code, name, location, quantity, date, condition, photoURL) {
        row.cells[0].textContent = code;
        row.cells[1].textContent = name;
        row.cells[2].textContent = location;
        row.cells[3].textContent = quantity;
        row.cells[4].textContent = date;
        row.cells[5].textContent = condition;
        row.cells[6].innerHTML = `<img src="${photoURL}" alt="Item Photo">`;
    }

    function saveItemToLocalStorage(code, name, location, quantity, date, condition, photoURL) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ code, name, location, quantity, date, condition, photoURL });
        localStorage.setItem('items', JSON.stringify(items));
    }

    function updateItemInLocalStorage(row, code, name, location, quantity, date, condition, photoURL) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const itemCode = row.cells[0].textContent;
        const index = items.findIndex(item => item.code === itemCode);
        if (index >= 0) {
            items[index] = { code, name, location, quantity, date, condition, photoURL };
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    function loadItems() {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            addItemToTable(item.code, item.name, item.location, item.quantity, item.date, item.condition, item.photoURL);
        });
    }

    window.editItem = function (button) {
        const row = button.closest('tr');
        document.getElementById('itemCode').value = row.cells[0].textContent;
        document.getElementById('itemName').value = row.cells[1].textContent;
        document.getElementById('itemLocation').value = row.cells[2].textContent;
        document.getElementById('itemQuantity').value = row.cells[3].textContent;
        document.getElementById('itemDate').value = row.cells[4].textContent;
        document.getElementById('itemCondition').value = row.cells[5].textContent;
        document.getElementById('itemPhoto').value = ""; // Reset file input
        editingRow = row; // Set the row being edited
    };

    window.deleteItem = function (button) {
        const row = button.closest('tr');
        row.remove();
        deleteItemFromLocalStorage(row);
    };

    function deleteItemFromLocalStorage(row) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const itemCode = row.cells[0].textContent;
        items = items.filter(item => item.code !== itemCode);
        localStorage.setItem('items', JSON.stringify(items));
    }
});


// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
