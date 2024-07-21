document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'db.json';
    const vegetablesContainer = document.getElementById('vegetablesContainer');
    const productsList = document.getElementById('productsList');


    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const headerNav = document.querySelector('.header-nav');

    hamburgerMenu.addEventListener('click', function() {
        headerNav.classList.toggle('open');
    });

    // Closes the menu when a navigation link is clicked for convinient navigation
    const navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            headerNav.classList.remove('open');
        });
    });


    // Function to fetch and display vegetables
    function fetchAndDisplayVegetables() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.vegetables.forEach(vegetable => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');
                    productElement.innerHTML = `
                        <img src="${vegetable.image}" alt="${vegetable.name}">
                        <h3>${vegetable.name}</h3>
                        <p>kshs${vegetable.price.toFixed(2)}</p>
                        <button class="buy-button" data-name="${vegetable.name}" data-price="${vegetable.price}">Buy</button>`;
                    vegetablesContainer.appendChild(productElement);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Initial fetch and display of vegetables
    fetchAndDisplayVegetables();

    // Handle buy button clicks
    vegetablesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('buy-button')) {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            // Create element for selected product
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.textContent = `
                ${productName} - kshs${productPrice.toFixed(2)}`;
            productsList.appendChild(productItem);
        }
    });

    // Handle form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const order = {};

        formData.forEach((value, key) => {
            order[key] = value;
        });

        // Sending data to the server using fetch API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order successfully submitted:', data);

        })
        .catch(error => {
            console.error('Error submitting order:', error);
        });


        orderForm.reset();
    });
});

