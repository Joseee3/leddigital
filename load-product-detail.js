// load-product-detail.js

console.log("Script load-product-detail.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM completamente cargado y analizado");

    // Función para obtener parámetros de la URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productId = getQueryParam('id');
    console.log("ID del producto:", productId);

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
            const product = products.find(p => p.id == productId);

            if (!product) {
                document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
                return;
            }

            const productElement = document.createElement('div');
            productElement.classList.add('product-detail');

            productElement.innerHTML = `
                <div class="col-2">
                    <img src="${product.image}" alt="${product.name}" id="ProductImg">
                </div>
                <div class="col-2">
                    <p><a href="products.html">Menu</a> / ${product.name}</p>
                    <h1>${product.name}</h1>
                    <h4>₹${product.price.toFixed(2)}</h4>
                    <select>
                        <option>Seleccione cantidad</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <a href="#" class="btn">Agregar al Carrito</a>
                    <h3>Detalles del Producto <i class="fa fa-indent"></i></h3>
                    <br>
                    <p>${product.description}</p>
                </div>
            `;

            document.getElementById('product-details').appendChild(productElement);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            document.getElementById('product-details').innerHTML = '<p>Hubo un error al cargar los detalles del producto. Por favor, inténtalo de nuevo más tarde.</p>';
        });
});