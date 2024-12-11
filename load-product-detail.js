document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productId = getQueryParam('id');
    console.log("Código del producto:", productId);

    if (!productId) {
        document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }

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
            const product = products.find(p => p.Codigo === productId);

            if (!product) {
                document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
                return;
            }

            const precio = parseFloat(product.Precio.replace('S/', ''));
            const costo = parseFloat(product.Costo.replace('S/', ''));

            const productElement = document.createElement('div');
            productElement.classList.add('product-detail');

            productElement.innerHTML = `
                <div class="col-2">
                    <img src="${product.image || 'images/imagen-no-disponible.jpg'}" alt="${product.Producto}" id="ProductImg" onerror="this.onerror=null; this.src='images/imagen-no-disponible.jpg';">
                </div>
                <div class="col-2">
                    <p><a href="products.html" style="color: red">Menú</a> / ${product.Producto}</p>
                    <h1>${product.Producto}</h1>
                    ${product.PrecioOferta ? `
                        <p style="text-decoration: line-through; color: grey;">Precio Anterior: S/ ${precio.toFixed(2)}</p>
                        <h4 style="color: red; font-family: 'Poppins', sans-serif;">Precio Oferta: S/ ${parseFloat(product.PrecioOferta.replace('S/', '')).toFixed(2)}</h4>
                    ` : `
                        <h4>Precio: S/ ${precio.toFixed(2)}</h4>
                    `}
                    <a href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.Producto)}%20por%20S/${product.PrecioOferta ? parseFloat(product.PrecioOferta.replace('S/', '')).toFixed(2) : precio.toFixed(2)}." class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
                </div>
            `;

            document.getElementById('product-details').appendChild(productElement);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            document.getElementById('product-details').innerHTML = '<p>Hubo un error al cargar el producto. Por favor, inténtalo de nuevo más tarde.</p>';
        });
});