document.addEventListener('DOMContentLoaded', function() {
    const vegetablesContainer = document.getElementById('vegetablesContainer');
    const orderForm = document.getElementById('orderForm');
    const productsList = document.getElementById('productsList');
    
    // Fetch vegetables data from db.json
    function fetchVegetables() {
        fetch('https://nairobi-organics-phase-1.vercel.app/vegetables')
            .then(response => response.json())
            .then(data => {
                displayVegetables(data.vegetables);
            })
            .catch(error => {
                console.error('Error fetching vegetables:', error);
            });
    }

    // Function to display vegetables
    function displayVegetables(vegetables) {
        vegetables.forEach(vegetable => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${vegetable.image}" alt="${vegetable.name}">
                <h3>${vegetable.name}</h3>
                <p>kshs${vegetable.price.toFixed(2)}</p>
                <button class="buy-button" data-name="${vegetable.name}" data-price="${vegetable.price}">Buy</button>`;
            vegetablesContainer.appendChild(productElement);
        });
    }

    // Display vegetables initially
    fetchVegetables();

    // Handle form submission
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const order = {};

        formData.forEach((value, key) => {
            order[key] = value;
        });

        // Process the order (send to backend or handle as needed)
        console.log('Order details:', order);

        // Clear products list and form after submission (for demo purposes)
        productsList.innerHTML = '';
        orderForm.reset();
    });

    // Handle buy button clicks (example: add product to order list)
    vegetablesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('buy-button')) {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <p>${productName} - kshs${productPrice.toFixed(2)}</p>`;
            productsList.appendChild(productItem);
        }
    });

    // Toggle mobile menu visibility
    menuToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    });
});
