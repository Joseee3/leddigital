document.addEventListener('DOMContentLoaded', function () {
    // Contenedores principales
    const productsContainer = document.getElementById('products-container');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const featuredCategoriesContainer = document.getElementById('featured-categories');
    const offersContainer = document.getElementById('offers-container');
    const searchInput = document.getElementById('search-input');
    let products = [];
    let filteredProducts = [];

    // Categorías destacadas
    const categoriasDestacadas = ["Cintas", "Neon", "Acrilicos", "Wall Panel"];

    // Mapeo de categorías a imágenes para index.html
    const categoryImages = {
        "Cintas": "images/categorias/cintas.jpg",
        "Neon": "images/categorias/neon.jpg",
        "Acrilicos": "images/categorias/acrilico.JPG",
        "Wall Panel": "images/categorias/wall_panel.jpg",
        // Añade más categorías si es necesario
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
                const precioOferta = product.PrecioOferta ? parseFloat(product.PrecioOferta.replace('S/', '')) : null;
                const imagePath = product.image ? product.image : 'images/imagen-no-disponible.jpg';

                productElement.innerHTML = `
                    <div class="image-container">
                        <a href="product-details.html?id=${product.Codigo}">
                            <img src="${imagePath}" alt="${product.Producto}" onerror="this.src='images/imagen-no-disponible.jpg';">
                        </a>
                    </div>
                    <div class="product-content">
                        <h4>${product.Producto}</h4>
                        <div class="rating">
                            ${generarEstrellas(product.rating)}
                        </div>
                        ${precioOferta ? `
                            <p style="text-decoration: line-through; color: grey;">S/ ${precio.toFixed(2)}</p>
                            <p style="color: red;">S/ ${precioOferta.toFixed(2)}</p>
                        ` : `
                            <p style="color: black">S/ ${precio.toFixed(2)}</p>
                        `}
                        <a href="https://wa.link/ggb69o" class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            } catch (error) {
                console.error(`Error al renderizar el producto ${product.Producto}:`, error);
            }
        });

        // Agregar botón para ver más productos solo si estamos en index.html y hay más productos
        if (max !== null && productsToRender.length > max) {
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
                    <div class="image-container product-card">
                        <a href="product-details.html?id=${product.Codigo}">
                            <img src="${imagePath}" alt="${product.Producto}" onerror="this.src='images/imagen-no-disponible.jpg';">
                            <span class="offer-badge">Oferta</span>
                        </a>
                    </div>
                    <div class="product-content">
                        <h4>${product.Producto}</h4>
                        <div class="rating">
                            ${generarEstrellas(product.rating)}
                        </div>
                        <p class="precio-original">S/ ${precioOriginal.toFixed(2)}</p>
                        <p class="precio-oferta">S/ ${precioOferta.toFixed(2)}</p>
                        <a href="https://wa.link/ggb69o" class="whatsapp-btn" target="_blank">Consultar en WhatsApp</a>
                    </div>
                `;
                offersContainer.appendChild(offerElement);
            } catch (error) {
                console.error(`Error al renderizar la oferta para el producto ${product.Producto}:`, error);
            }
        });
    }

    // Función para renderizar categorías destacadas
    function renderFeaturedCategories() {
        if (!featuredCategoriesContainer) return;
        featuredCategoriesContainer.innerHTML = '';

        categoriasDestacadas.forEach(categoria => {
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

            // Agrega un listener para manejar el clic y redirigir a la categoría correspondiente
            categoryCard.addEventListener('click', function() {
                // Guardar la categoría seleccionada en localStorage
                localStorage.setItem('selectedCategory', categoria);
                window.location.href = `products.html`;
            });

            featuredCategoriesContainer.appendChild(categoryCard);
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

    // Función para aplicar búsqueda y filtros
    function applyFilters() {
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase();

        let selectedCategories = [];
        const activeButtons = categoryFiltersContainer ? categoryFiltersContainer.querySelectorAll('.filter-btn.active') : null;
        selectedCategories = activeButtons ? Array.from(activeButtons).map(btn => btn.innerText) : [];

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

                // Renderizar categorías destacadas
                renderFeaturedCategories();
            } else if (isProductsPage) {
                renderProducts(filteredProducts);
                const uniqueCategories = getUniqueCategories(products);
                createCategoryFilters(uniqueCategories);

                // Aplicar filtro de categoría si está almacenado en localStorage
                const selectedCategory = localStorage.getItem('selectedCategory');
                if (selectedCategory) {
                    const button = Array.from(categoryFiltersContainer.querySelectorAll('.filter-btn'))
                        .find(btn => btn.innerText.toLowerCase() === selectedCategory.toLowerCase());

                    if (button) {
                        button.click(); // Simular clic en el botón de la categoría
                        localStorage.removeItem('selectedCategory'); // Limpiar después de aplicar el filtro
                    }
                }
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
});