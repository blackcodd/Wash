let selectedItems = [];
let selectedShop = null;
let isLoggedIn = false; // Simulate login state
function toggleFeatures(){

}

function loadContent(page) {
  const content = {
    landing: ['Cotton', 'Shari', 'Panjabi', 'Pant', 'Shirt', '3-piece'],
    service: ['Ironing', 'Washing', 'Dry Clean'],
    history: [] // handled separately
  };

  const prices = {
    Cotton: 50,
    Shari: 100,
    Panjabi: 80,
    Pant: 60,
    Shirt: 40,
    '3-piece': 120,
    Ironing: 30,
    Washing: 40,
    'Dry Clean': 90
  };

  const images = {
    landing: [
      'images/cotton.jpeg',
      'images/shari.png',
      'images/panjabi.jpeg',
      'images/pant.webp',
      'images/Tshirt.jpeg',
      'images/3pice.jpeg'
    ],
    service: [
      'images/Iron.jpg',
      'images/washing.jpg',
      'images/dryclean.jpeg'
    ],
    history: []
  };

  const container = document.getElementById('main-content');
  container.innerHTML = '';

  if (page === 'history') {
    showOrderHistory(container);
    return;
  }

  selectedItems = []; // reset selection

  content[page].forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'landing';
    

    const img = document.createElement('img');
    img.src = images[page][index];
    img.alt = item;
     const name = document.createElement('span');
     name.textContent = item;
     name.style.fontSize = '10px';
     name.style.display = 'flex';

    const price = prices[item] || 0;
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = '0';
    amountInput.placeholder = `quantity :`;
    amountInput.style.margin = '5px';
    amountInput.style.width = '80%';

    const addButton = document.createElement('button');
    addButton.textContent = 'Done';
    addButton.className = 'add-button';
    addButton.style.margin = '5px';
    addButton.onclick = () => {
      const quantity = parseInt(amountInput.value);
      if (!isNaN(quantity) && quantity > 0) {
        selectedItems.push({ item, quantity, price });
        addButton.disabled = true;
        amountInput.disabled = true;
      }
      selectedItems.forEach(entry => {
       console.log(`Item: ${entry.item}, Quantity: ${entry.quantity}, Price: ${entry.price}`);
      });
    };
  // Create checkboxes for Laundry and Wash
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(amountInput);
    div.appendChild(addButton);
    container.appendChild(div);
  });

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.className = 'submit-button';
  submitBtn.textContent = 'Select Shop & Submit';
  submitBtn.onclick = showShopSelection;
  container.appendChild(submitBtn);
}

function showShopSelection() {
  const shopCards = document.querySelectorAll('.shop-card');
  shopCards.forEach(card => {
    card.onclick = () => {
      selectedShop = card.textContent;
      calculateAndShowSummary();
    };
  });
}

function calculateAndShowSummary() {
  const container = document.getElementById('main-content');
  container.innerHTML = '<h2>Order Summary</h2> <br/>';

  let total = 0;
  selectedItems.forEach(entry => {
    const line = document.createElement('p');
    line.className = 'summary-line';
    const subTotal = entry.quantity * entry.price;
    total += subTotal;
    line.textContent = `${entry.item} x ${entry.quantity} = ${subTotal}`;
    container.appendChild(line);
    container.appendChild(document.createElement('br'));
  });

  const shopLine = document.createElement('p');
  shopLine.innerHTML = `<strong>Shop:</strong> ${selectedShop}`;
  container.appendChild(shopLine);
  container.appendChild(document.createElement('br'));

  const totalLine = document.createElement('h3');
  totalLine.textContent = `Total: ₹${total}`;
  container.appendChild(totalLine);

  const orderBtn = document.createElement('button');
  orderBtn.textContent = 'Place Order';
  orderBtn.onclick = () => {
    if (!isLoggedIn) {
      toggleFeatures(); // Show login/register
    } else {
      saveOrder();
    }
  };

  container.appendChild(orderBtn);
}

function saveOrder() {
  const order = {
    items: selectedItems,
    shop: selectedShop,
    status: 'Received',
    id: `Order #${Date.now()}`
  };

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  alert('Order placed!');
  loadContent('history');
}

function showOrderHistory(container) {
  container.innerHTML = '<h2>Your Orders</h2>';
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  if (orders.length === 0) {
    container.innerHTML += '<p>No orders yet.</p>';
    return;
  }

  orders.forEach(order => {
    const div = document.createElement('div');
    div.className = 'order-entry';
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.marginBottom = '10px';

    div.innerHTML = `
      <strong>${order.id}</strong><br/>
      <strong>Shop:</strong> ${order.shop}<br/>
      <strong>Status:</strong> ${order.status}<br/>
      <strong>Items:</strong><ul>
        ${order.items.map(i => `<li>${i.item} x ${i.quantity}</li>`).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
}

// Login/Register toggle behavior (already present)
document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', function () {
    const target = this.getAttribute('data-tab');
    document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Toggle login/register popup
function toggleFeatures() {
      const featureContent = document.getElementById("loginandregistration");
      if (featureContent.style.display === "none" || featureContent.style.display === "") {
        featureContent.style.display = "block";
      } else {
        featureContent.style.display = "none";
      }
    }

// Default load
loadContent('landing');

