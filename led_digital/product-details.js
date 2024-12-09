document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Simulación de una llamada a una API para obtener los detalles del producto
        const products = {
            1: {
                name: "Biryani",
                image: "images/product-3.jpg",
                description: "Delicious Biryani with spices.",
                price: 10.99
            },
            // Agrega más productos aquí
        };

        const product = products[productId];

        if (product) {
            document.getElementById('product-details').innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        }
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
    }
});