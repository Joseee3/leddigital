// categories.js

document.addEventListener('DOMContentLoaded', function () {
    const featuredCategoriesContainer = document.getElementById('featured-categories');

    // Mapeo de categorías a imágenes
    const categoryImages = {
        "Acrilicos": "images/categorias/acrilicos.jpg",
        "Perfiles": "images/categorias/perfiles.jpg",
        "Cintas": "images/categorias/cintas.jpg",
        // Agrega más categorías y sus imágenes aquí
    };

    // Función para renderizar categorías destacadas
    function renderFeaturedCategories(categories) {
        featuredCategoriesContainer.innerHTML = ''; // Limpiar contenido existente

        categories.forEach(categoria => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');

            const imageSrc = categoryImages[categoria] || 'images/categorias/default.jpg'; // Imagen por defecto si no hay mapeo

            categoryCard.innerHTML = `
                <img src="${imageSrc}" alt="${categoria}">
                <div class="category-overlay">
                    <h3>${categoria}</h3>
                </div>
            `;
            featuredCategoriesContainer.appendChild(categoryCard);
        });
    }

    // Exportar la función para usar en otros archivos si usas módulos
    window.renderFeaturedCategories = renderFeaturedCategories;
});// categories.js

document.addEventListener('DOMContentLoaded', function () {
    const featuredCategoriesContainer = document.getElementById('featured-categories');

    // Mapeo de categorías a imágenes
    const categoryImages = {
        "Acrilicos": "images/categorias/acrilicos.jpg",
        "Perfiles": "images/categorias/perfiles.jpg",
        "Cintas": "images/categorias/cintas.jpg",
        // Agrega más categorías y sus imágenes aquí
    };

    // Función para renderizar categorías destacadas
    function renderFeaturedCategories(categories) {
        featuredCategoriesContainer.innerHTML = ''; // Limpiar contenido existente

        categories.forEach(categoria => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');

            const imageSrc = categoryImages[categoria] || 'images/categorias/default.jpg'; // Imagen por defecto si no hay mapeo

            categoryCard.innerHTML = `
                <img src="${imageSrc}" alt="${categoria}">
                <div class="category-overlay">
                    <h3>${categoria}</h3>
                </div>
            `;
            featuredCategoriesContainer.appendChild(categoryCard);
        });
    }

    // Exportar la función para usar en otros archivos si usas módulos
    window.renderFeaturedCategories = renderFeaturedCategories;
});