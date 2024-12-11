document.addEventListener('DOMContentLoaded', function () {
    // Contenedores principales
    const productsContainer = document.getElementById('products-container');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const featuredCategoriesContainer = document.getElementById('featured-categories');
    const offersContainer = document.getElementById('offers-container');
    const searchInput = document.getElementById('search-input');
    let products = [];
    let filteredProducts = [];

    // Mapeo de categorías a imágenes para index.html
    const categoryImages = {
        "Acrilicos": "images/categorias/acrilico.JPG",
        "Perfiles": "images/categorias/perfiles.jpg",
        "Cintas": "images/categorias/cintas.jpg",
    };

    // Función para generar las estrellas de calificación
    function generarEstrellas(rating) {
        const totalEstrellas = 5;
        let estrellasHTML = '';

        for (let i = 1; i <= totalEstrellas; i++) {
            if (i <= Math.floor(rating)) {
                estrellasHTML += '<i class="fa fa-star"></i>';
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                estrellasHTML += '<i class="fa fa-star-half-o"></i>';
            } else {
                estrellasHTML += '<i class="fa fa-star-o"></i>';
            }
        }

        return estrellasHTML;
    }

    // Función para renderizar productos
    function renderProducts(productsToRender, max = null) {
        if (!productsContainer) return;
        productsContainer.innerHTML = '';
        let productsToShow = productsToRender;

        if (max !== null) {
            productsToShow = productsToRender.slice(0, max);
        }

        productsToShow.forEach(product => {
            try {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');

                const precio = product.Precio ? parseFloat(product.Precio.replace('S/', '')) : 0;
                const costo = product.Costo ? parseFloat(product.Costo.replace('S/', '')) : 0;
                const imagePath = product.image ? product.image : 'images/imagen-no-disponible.jpg';

                productElement.innerHTML = `
                    <div class="image-container">
                        <img src="${imagePath}" alt="${product.Producto}" onerror="this.src='images/imagen-no-disponible.jpg';">
                    </div>
                    <div class="product-content">
                        <h4>${product.Producto}</h4>
                        <div class="rating">
                            ${generarEstrellas(product.rating)}
                        </div>
                        <p style="color: black">S/ ${precio.toFixed(2)}</p>
                        <a href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.Producto)}%20por%20S/${precio.toFixed(2)}." class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            } catch (error) {
                console.error(`Error al renderizar el producto ${product.Producto}:`, error);
            }
        });

        // Agregar botón para ver más productos solo si estamos en index.html
        if (max !== null) {
            const viewMoreButton = document.createElement('button');
            viewMoreButton.innerText = 'Ver más productos';
            viewMoreButton.classList.add('view-more-btn');
            viewMoreButton.addEventListener('click', () => {
                window.location.href = 'products.html';
            });
            productsContainer.appendChild(viewMoreButton);
        }
    }

    // Función para renderizar ofertas
    function renderOffers(offersToRender, max = 3) {
        if (!offersContainer) {
            console.warn('No se encontró el contenedor de ofertas (offers-container).');
            return;
        }
        offersContainer.innerHTML = '';
        let offersToShow = offersToRender.slice(0, max);

        console.log(`Renderizando ${offersToShow.length} ofertas.`);

        offersToShow.forEach(product => {
            try {
                const offerElement = document.createElement('div');
                offerElement.classList.add('offer-item');

                const precioOriginal = product.Precio ? parseFloat(product.Precio.replace('S/', '')) : 0;
                const precioOferta = product.PrecioOferta ? parseFloat(product.PrecioOferta.replace('S/', '')) : precioOriginal;
                const imagePath = product.image ? product.image : 'images/imagen-no-disponible.jpg';

                offerElement.innerHTML = `
                    <div class="image-container">
                        <img src="${imagePath}" alt="${product.Producto}" onerror="this.src='images/imagen-no-disponible.jpg';">
                        <span class="offer-badge">Oferta</span>
                    </div>
                    <div class="product-content">
                        <h4>${product.Producto}</h4>
                        <div class="rating">
                            ${generarEstrellas(product.rating)}
                        </div>
                        <p class="precio-original">S/ ${precioOriginal.toFixed(2)}</p>
                        <p class="precio-oferta">S/ ${precioOferta.toFixed(2)}</p>
                        <a href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.Producto)}%20por%20S/${precioOferta.toFixed(2)}." class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
                    </div>
                `;
                offersContainer.appendChild(offerElement);
            } catch (error) {
                console.error(`Error al renderizar la oferta para el producto ${product.Producto}:`, error);
            }
        });
    }

    // Función para obtener categorías únicas
    function getUniqueCategories(products) {
        const categorias = products.map(product => product.Categoria);
        return [...new Set(categorias)];
    }

    // Función para crear filtros de categorías
    function createCategoryFilters(categories) {
        if (!categoryFiltersContainer) return;
        categoryFiltersContainer.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.innerText = 'Todos';
        allButton.classList.add('filter-btn', 'active');
        allButton.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            allButton.classList.add('active');
            filteredProducts = products;
            renderProducts(filteredProducts);
        });
        categoryFiltersContainer.appendChild(allButton);

        categories.forEach(categoria => {
            const button = document.createElement('button');
            button.innerText = categoria;
            button.classList.add('filter-btn');
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filtered = products.filter(product => product.Categoria === categoria);
                filteredProducts = filtered;
                renderProducts(filteredProducts);
            });
            categoryFiltersContainer.appendChild(button);
        });
    }

    // Función para renderizar categorías destacadas
    function renderFeaturedCategories(categories, max = null) {
        if (!featuredCategoriesContainer) return;
        featuredCategoriesContainer.innerHTML = '';
        let categoriesToShow = categories;

        if (max !== null) {
            categoriesToShow = categories.slice(0, max);
        }

        categoriesToShow.forEach(categoria => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');
            categoryCard.setAttribute('data-category', categoria);

            const imageSrc = categoryImages[categoria] || 'images/categorias/default.jpg';

            categoryCard.innerHTML = `
                <img src="${imageSrc}" alt="${categoria}">
                <div class="category-overlay">
                    <h3>${categoria}</h3>
                </div>
            `;

            categoryCard.addEventListener('click', function() {
                const filtered = products.filter(product => product.Categoria === categoria);
                renderProducts(filtered);
            });

            featuredCategoriesContainer.appendChild(categoryCard);
        });

        // Agregar botón para ver más categorías solo si estamos en index.html
        if (max !== null) {
            const viewMoreButton = document.createElement('button');
            viewMoreButton.innerText = 'Ver más categorías';
            viewMoreButton.classList.add('view-more-btn');
            viewMoreButton.addEventListener('click', () => {
                window.location.href = 'products.html';
            });
            featuredCategoriesContainer.appendChild(viewMoreButton);
        }
    }

    // Función para aplicar búsqueda y filtros
    function applyFilters() {
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase();
        const activeButtons = categoryFiltersContainer ? categoryFiltersContainer.querySelectorAll('.filter-btn.active') : null;
        const selectedCategories = activeButtons ? Array.from(activeButtons).map(btn => btn.innerText) : [];

        filteredProducts = products.filter(product => {
            const matchesSearch = product.Producto.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes('Todos') || selectedCategories.includes(product.Categoria);
            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts);
    }

    // Detectar si estamos en index.html o products.html
    const isIndexPage = featuredCategoriesContainer !== null;
    const isProductsPage = categoryFiltersContainer !== null;

    // Función para cargar y renderizar los productos
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de productos obtenidos:', data);
            products = data;
            filteredProducts = products;

            if (isIndexPage) {
                const offers = products.filter(product => product.Onsale === true);
                console.log('Productos en oferta:', offers);
                renderOffers(offers);

                const mainProducts = products.filter(product => product.Onsale !== true);
                renderProducts(mainProducts.slice(0, 9));

                const uniqueCategories = getUniqueCategories(products);
                renderFeaturedCategories(uniqueCategories, 4); // Mostrar solo 4 categorías en index.html
            } else if (isProductsPage) {
                renderProducts(filteredProducts);
                const uniqueCategories = getUniqueCategories(products);
                createCategoryFilters(uniqueCategories);
                renderFeaturedCategories(uniqueCategories); // Mostrar todas las categorías en products.html
            }
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            if (productsContainer) {
                productsContainer.innerHTML = '<p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>';
            }
            if (featuredCategoriesContainer) {
                featuredCategoriesContainer.innerHTML = '<p>Hubo un error al cargar las categorías. Por favor, inténtalo de nuevo más tarde.</p>';
            }
            if (categoryFiltersContainer) {
                categoryFiltersContainer.innerHTML = '<p>Hubo un error al cargar los filtros de categoría. Por favor, inténtalo de nuevo más tarde.</p>';
            }
            if (offersContainer) {
                offersContainer.innerHTML = '<p>Hubo un error al cargar las ofertas. Por favor, inténtalo de nuevo más tarde.</p>';
            }
        });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }

    const modal = document.getElementById('product-modal');
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (modal && closeButton) {
        productsContainer.addEventListener('click', function(e) {
            const card = e.target.closest('.product-item');
            if (card) {
                const productTitle = card.querySelector('.product-content h4').textContent;
                const product = products.find(p => p.Producto === productTitle);
                if (product) {
                    const precioOriginal = product.Precio ? parseFloat(product.Precio.replace('S/', '')) : 0;
                    const precioOferta = product.PrecioOferta ? parseFloat(product.PrecioOferta.replace('S/', '')) : precioOriginal;
                    const costo = product.Costo ? parseFloat(product.Costo.replace('S/', '')) : 0;

                    document.getElementById('modal-image').src = product.image ? product.image : 'images/imagen-no-disponible.jpg';
                    document.getElementById('modal-title').textContent = product.Producto;
                    document.getElementById('modal-description').innerHTML = `
                        <strong>Código:</strong> ${product.Codigo}<br>
                        <strong>Stock:</strong> ${product.Stock}<br>
                        <strong>Tipo:</strong> ${product.Tipo}<br>
                        <strong>Costo:</strong> S/ ${costo.toFixed(2)}<br>
                        <strong>Precio:</strong> S/ ${precioOferta.toFixed(2)}
                    `;
                    document.getElementById('modal-price').textContent = `Precio: S/ ${precioOferta.toFixed(2)}`;

                    const whatsappBtn = document.getElementById('modal-whatsapp-btn');
                    whatsappBtn.href = `https://wa.me/1234567890?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(product.Producto)}%20por%20S/${precioOferta.toFixed(2)}.`;

                    modal.style.display = "block";
                }
            }
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = "none";
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
});