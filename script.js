// Global variables
const addToCartButtonClass = "boton";

/**
 * La colección de ropas
 */
const db = [
    {
        "id": 1,
        "nombre": "Jeans Baggy Azul",
        "precio": 30000,
        "descripcion": "Jeans estilo baggy con corte ancho, inspirado en tendencias coreanas. Cómodo, versátil y perfecto para outfits urbanos.",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit1.jpg"
    },
    {
        "id": 2,
        "nombre": "Suéter Beige Oversize",
        "precio": 10000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit2.jpg"
    },
    {
        "id": 3,
        "nombre": "Top Denim Crop",
        "precio": 10000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit3.jpg"
    },
    {
        "id": 4,
        "nombre": "Polerón Lila Oversize",
        "precio": 10000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit4.jpg"
    },
    {
        "id": 5,
        "nombre": "Polera Estampada Kawaii",
        "precio": 10000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit5.jpg"
    },
    {
        "id": 6,
        "nombre": "Vestido Blanco Corto",
        "precio": 20000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit6.jpg"
    },
    {
        "id": 7,
        "nombre": "Jeans Rectos Celeste",
        "precio": 20000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit7.jpg"
    },
    {
        "id": 8,
        "nombre": "Chaqueta Varsity Negra",
        "precio": 20000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit8.jpg"
    },
    {
        "id": 9,
        "nombre": "Blazer Negro Elegante",
        "precio": 20000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit9.jpg"
    },
    {
        "id": 10,
        "nombre": "Top Rosado Blanco",
        "precio": 20000,
        "descripcion": "DESCRIPCION",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit10.jpg"
    }
]

/**
 * Formatea el precio para mostrarlo en pesos chilenos.
 *
 * @param {number} precio El precio a formatear
 * @returns {string} El precio formateado
 */
function precioToString(precio) {
    const precio_number = precio.toString();
    let count = 0;
    const precio1 = precio_number.substring(count, precio_number.length % 3);
    count += precio_number.length % 3;
    const precio2 = precio_number.substring(count);
    return "$" + precio1 + "." + precio2 + " CLP";
}

/**
 * Función para añadir un producto al carrito de compras.
 * 
 * @param {Object} product 
 * @param {HTMLElement} cart_quantity_text 
 */
function addToCart(product, cart_quantity_text) {
    // Se obtiene el carrito desde la memoria
    // Si no existe, se pasa un arreglo vacío
    const cart = JSON.parse( localStorage.getItem("cart") ) || [];

    let exists = false;
    for (const item_in_cart of cart) {
        // Si ya está en carrito, aumentar cantidad
        if (item_in_cart.id === product.id) {
            item_in_cart.cantidad += 1;
            exists = true;
            break;
        }
    }
    
    // Si no existe el producto, añadirlo al carrito
    if (!exists) {
        cart.push(product)
        console.log(cart);

        // Actualiza la cantidad de elementos del carrito
        cart_quantity_text.innerHTML = "(" + cart.length + ")";
    }

    // Actualiza el carrito en la memoria
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Asigna la cantidad total de elementos del carrito al ícono superior derecho.
 */
function setCartQuantity(cart_quantity_text) {
    // Se consigue el texto y se asigna el total de elementos del carrito
    const cart = JSON.parse( localStorage.getItem("cart") ) || [];
    cart_quantity_text.innerHTML = "(" + cart.length + ")";
}

// index.html
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay elementos de clase "galeria", salimos de la función prematuramente
    const galerias = document.getElementsByClassName("galeria");
    if (galerias.length < 2) return;

    // Conseguimos el contenedor de las tarjetas
    // y la tarjeta de plantilla
    const container = galerias[1];
    const original_item = container.children[0];
    original_item.remove();

    // Se consigue el texto de la cantidad de elementos del carrito
    const cart_quantity_text = document.getElementsByClassName("carrito")[0].children[0].children[1];
    setCartQuantity(cart_quantity_text);

    // Añadimos las tarjetas dinámicamente
    for (const element of db) {

        // Clonamos la tarjeta plantilla
        // y le asignamos los valores correspondientes
        const item = original_item.cloneNode(true);

        // Imagen
        item.children[0].children[0].src = element.imagen;

        // Se asigna el link del botón "Ver más"
        // al URL de detalles.html con el id del elemento como parámetro
        // para que la página de detalles muestre los datos de este elemento
        item.children[0].children[1].href = "detalles.html?id=" + element.id;

        // Nombre ropa
        item.children[1].innerHTML = element.nombre;

        // Precio
        item.children[2].innerHTML = precioToString(element.precio);

        // Se añade un callback al botón de "Agregar al carrito"
        item.children[3].addEventListener("click", function(event) {
            // event.preventDefault();

            // Creamos el objeto con los datos importantes
            // para insertarlo en el carrito
            // TODO: agregar talla y diferenciarlo de otro elemento
            // del mismo tipo en el carrito
            const item_to_push = {
                "id": element.id,
                "nombre": element.nombre,
                "precio": element.precio,
                "imagen": element.imagen,
                "cantidad": 1
            }
            addToCart(item_to_push, cart_quantity_text);
        })

        // Se añade la nueva tarjeta al contenedor/galería
        container.append(item);
    }
});

// carrito.html
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay carrito-main, no estamos en carrito.html y salimos de la función prematuramente
    const carrito_main = document.getElementsByClassName("carrito-main");
    if (carrito_main.length === 0) return;

    // Conseguimos el contenedor de las tarjetas
    // y la tarjeta de plantilla
    const container = carrito_main[0].children[0]
    const original_item = container.children[0];
    original_item.remove();

    // Conseguimos el carrito desde la memoria
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) { // Si el carrito está vacío, se muestra mensaje acorde.
        container.remove();

        carrito_main[0].innerHTML = "Tu carrito está vacío"
    } else {  
        // Por cada elemento del carrito, se crea una tarjeta      
        for (const item_in_cart of cart) {
            const item = original_item.cloneNode(true);
    
            // Imagen
            const item_image = item.children[0];
            item_image.children[0].src = item_in_cart.imagen;
    
            const item_detalles = item.children[1];
    
            // Nombre ropa
            item_detalles.children[0].innerHTML = item_in_cart.nombre;
    
            // Precio
            item_detalles.children[1].innerHTML = precioToString(item_in_cart.precio);
    
            // Cantidad
            item_detalles.children[2].innerHTML = "Cantidad: " + item_in_cart.cantidad;
    
            container.append(item);
        }
    
        // Se consiguen los botones de "Quitar" para configurar su comportamiento
        const buttons_remove = Array.from(document.getElementsByClassName("remove-button"));
        buttons_remove.forEach((btn, index) => {
            // Se añade un callback al botón
            btn.addEventListener("click", function(event) {
                // Se elimina el elemento del carrito y se guarda en memoria
                const element_removed = cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));

                // Se recarga la página
                location.reload();
            })
        })

        // Los botones de "Quitar todo" y "Comprar todo" se comportan igual:
        // Eliminan el carrito
        const button_remove_all = document.getElementsByClassName("remove-all-button")[0];
        button_remove_all.addEventListener("click", function() {
            localStorage.removeItem("cart");
            location.reload();
        })

        const button_purchase_all = document.getElementsByClassName("purchase-all-button")[0];
        button_purchase_all.addEventListener("click", function() {
            localStorage.removeItem("cart");
            location.reload();
        })
    }
});

// detalles.html
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay "section-detalles", no estamos en detalles.html y salímos prematuramente
    const container = document.getElementById("section-detalles");
    if (container === null) return;

    const cart_quantity_text = document.getElementsByClassName("carrito")[0].children[0].children[1];
    setCartQuantity(cart_quantity_text);

    // Se consiguen el parámetro "id" del URL
    const urlParams = new URLSearchParams(location.search);
    const element_id = urlParams.get("id");

    // Se busca el elemento en la colección de ropas
    let element = null;
    for (const element_db of db) {
        if (element_db.id == element_id) {
            element = element_db;
            break;
        }
    }
    if (element === null) return;

    // Se asignan las características correspondientes

    // Imagen
    const image = container.children[0].children[0];
    image.src = element.imagen;

    // Detalles
    const detalles = container.children[1];

    // Título
    detalles.children[0].innerHTML = element.nombre;

    // Precio
    detalles.children[1].innerHTML = precioToString(element.precio);

    // Descripción
    detalles.children[2].innerHTML = element.descripcion;

    // Tallas
    let talla_text = "<strong>Tallas disponibles:</strong>";
    let count = 0;
    for (const talla of element.tallas) {
        talla_text = talla_text.concat(talla);
        if (count !== element.tallas.length - 1) {
        talla_text = talla_text.concat(" · ");
        }
        count += 1;
    }

    // Color

    // Material

    // Envío

    // Se añade callback al botón "Agregar al carrito"
    detalles.children[7].addEventListener("click", function() {
        const item_to_push = {
            "id": element.id,
            "nombre": element.nombre,
            "precio": element.precio,
            "imagen": element.imagen,
            "cantidad": 1
        }
        addToCart(item_to_push, cart_quantity_text);
    })
})

// Solo para debug
document.addEventListener("keydown", function(event) {
    if (event.key === "d") { // Elimina carrito
        localStorage.removeItem("cart");
    } else if (event.key === "c") { // Crea un carrito vacío
        localStorage.setItem("cart", JSON.stringify([]));
    } else if (event.key === "l") { // Muestra carrito en consola
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log("Carrito");
        console.log(cart);
    }
});

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink");
const userPanel = document.getElementById("userPanel");

if (usuarioActivo && userName && logoutBtn && loginLink && userPanel) {
    userName.textContent = "Hola, " + usuarioActivo.name + " 💖";
    userPanel.style.display = "flex";
    loginLink.style.display = "none";
}

logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.reload();
});