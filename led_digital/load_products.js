document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM completamente cargado y analizado");
    fetch('products.json')
        .then(response => {
            console.log("Respuesta del fetch:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            console.log("Productos cargados:", products);
            const productsContainer = document.getElementById('products-container');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('col-4');
                productElement.innerHTML = `
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <h4>${product.name}</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>₹${product.price.toFixed(2)}</p>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            const productsContainer = document.getElementById('products-container');
            productsContainer.innerHTML = '<p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>';
        });
});