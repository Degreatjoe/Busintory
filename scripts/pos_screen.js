async function loadProducts() {
        const response = await fetch("assets/product.json");
        const data = await response.json();
        return data;
    }

    function product(productData) {
        const container = document.createElement('div');
        container.className = 'product-item';

        const name = document.createElement('span');
        name.className = 'product-name';
        name.textContent = productData.display_name;

        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = "$" + productData.selling_price.toFixed(2);

        const sellBtn = document.createElement('button');
        sellBtn.textContent = "Sell";
        sellBtn.onclick = () => {
            alert(`Selling: ${productData.display_name} for $${productData.selling_price.toFixed(2)}`);
        };

        container.appendChild(name);
        container.appendChild(price);
        container.appendChild(sellBtn);

        return container;
    }

    async function displayProducts(filter = "") {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ""; // clear previous
        const products = await loadProducts();

        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.display_name.toLowerCase().includes(filter.toLowerCase())
        );

        filteredProducts.forEach(p => {
            const productElem = product(p);
            productList.appendChild(productElem);
        });
    }

    // Initial display
    displayProducts();

    // Add search filter
    document.getElementById('search').addEventListener('input', (e) => {
        displayProducts(e.target.value);
    });