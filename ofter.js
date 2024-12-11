// offers.js

export function renderSales(productsOnSale) {
    const salesContainer = document.getElementById('sales-container');
    salesContainer.innerHTML = '';
    productsOnSale.forEach(product => {
        const saleElement = document.createElement('div');
        saleElement.classList.add('sale-item');

        // Extraer y convertir los precios eliminando el símbolo de moneda
        const precio = parseFloat(product.Precio.replace('S/', ''));
        const oldPrice = parseFloat(product.oldPrice.replace('S/', ''));

        // Ruta de la imagen o imagen predeterminada
        const imagePath = product.image ? product.image : 'images/imagen-no-disponible.jpg';

        // Crear el HTML del producto en oferta
        saleElement.innerHTML = `
            <div class="image-container">
                <img src="${imagePath}" alt="${product.Producto}" onerror="this.src='images/imagen-no-disponible.jpg';">
            </div>
            <div class="product-content">
                <h4>${product.Producto}</h4>
                <div class="rating">
                    ${generarEstrellas(product.rating)}
                </div>
                <p class="old-price">S/ ${oldPrice.toFixed(2)}</p>
                <p class="new-price">S/ ${precio.toFixed(2)}</p>
                <a href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.Producto)}%20por%20S/${precio.toFixed(2)}." class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
            </div>
        `;
        salesContainer.appendChild(saleElement);
    });
}

// Reutilizar la función generarEstrellas si es necesario
function generarEstrellas(rating) {
    const totalEstrellas = 5;
    let estrellasHTML = '';

    for (let i = 1; i <= totalEstrellas; i++) {
        if (i <= Math.floor(rating)) {
            estrellasHTML += '<i class="fa fa-star"></i>'; // Estrella completa
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            estrellasHTML += '<i class="fa fa-star-half-o"></i>'; // Media estrella
        } else {
            estrellasHTML += '<i class="fa fa-star-o"></i>'; // Estrella vacía
        }
    }

    return estrellasHTML;
}