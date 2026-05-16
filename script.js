// Global variables
const cartStorageName = "carrito-ropas";

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
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit2.jpg"
    },
    {
        "id": 3,
        "nombre": "Top Denim Crop",
        "precio": 10000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit3.jpg"
    },
    {
        "id": 4,
        "nombre": "Polerón Lila Oversize",
        "precio": 10000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit4.jpg"
    },
    {
        "id": 5,
        "nombre": "Polera Estampada Kawaii",
        "precio": 10000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit5.jpg"
    },
    {
        "id": 6,
        "nombre": "Vestido Blanco Corto",
        "precio": 20000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit6.jpg"
    },
    {
        "id": 7,
        "nombre": "Jeans Rectos Celeste",
        "precio": 20000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit7.jpg"
    },
    {
        "id": 8,
        "nombre": "Chaqueta Varsity Negra",
        "precio": 20000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit8.jpg"
    },
    {
        "id": 9,
        "nombre": "Blazer Negro Elegante",
        "precio": 20000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit9.jpg"
    },
    {
        "id": 10,
        "nombre": "Top Rosado Blanco",
        "precio": 20000,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/outfit10.jpg"
    },
    {
        "id": 11,
        "nombre": "Black Dress",
        "precio": 19990,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/destacado1m.png",
        "destacado": true
    },
    {
        "id": 12,
        "nombre": "Urban Street",
        "precio": 24990,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/destacado2h.png",
        "destacado": true
    },
    {
        "id": 13,
        "nombre": "Sailor Dress",
        "precio": 19990,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/destacado3m.png",
        "destacado": true
    },
    {
        "id": 14,
        "nombre": "Oversize Seoul",
        "precio": 29990,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/destacado4h.png",
        "destacado": true
    },
    {
        "id": 15,
        "nombre": "Chaqueta amarilla",
        "precio": 24990,
        "descripcion": "",
        "tallas": ["S", "M", "L"],
        "imagen": "fotosRopa/destacado4h.png",
        "categoria": "mujer"
    }
]

/**
 * Formatea el precio para mostrarlo en pesos chilenos.
 *
 * @param {number} price El precio a formatear
 * @returns {string} El precio formateado
 */
function precioToString(price) {
    const price_number = price.toString();
    const total_digits = price_number.length;
    const modulo = total_digits % 3;

    let price_text = "$";

    if (modulo != 0) {
        price_text = price_text.concat(price_number.substring(0, modulo));
        price_text = price_text.concat(".");
    }

    const iterations = (total_digits - modulo) / 3
    for (let i = 0; i < iterations; i++) {
        price_text = price_text.concat(price_number.substring(modulo + i * 3, modulo + i * 3 + 3));
        if (i < iterations - 1) {
            price_text = price_text.concat(".");
        }
    }
    price_text = price_text.concat(" CLP");

    return price_text;
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
    const cart = JSON.parse( localStorage.getItem(cartStorageName) ) || [];

    let exists = false;
    for (const item_in_cart of cart) {
        // Si ya está en carrito, aumentar cantidad
        if (item_in_cart.id === product.id) {
            item_in_cart.cantidad += product.cantidad;
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
    localStorage.setItem(cartStorageName, JSON.stringify(cart));
}

/**
 * Asigna la cantidad total de elementos del carrito al ícono superior derecho.
 */
function setCartQuantity(cart_quantity_text) {
    // Se consigue el texto y se asigna el total de elementos del carrito
    const cart = JSON.parse( localStorage.getItem(cartStorageName) ) || [];
    cart_quantity_text.innerHTML = "(" + cart.length + ")";
}

// index.html
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay elementos de clase "galeria", salimos de la función prematuramente
    const galerias = document.getElementsByClassName("galeria");
    if (galerias.length < 2) return;

    // Conseguimos el contenedor de las tarjetas
    // y la tarjeta de plantilla
    const container_destacados = galerias[0];
    const original_item_destacado = container_destacados.firstElementChild;
    original_item_destacado.remove();

    const container = galerias[1];
    const original_item = container.children[0];
    original_item.remove();

    // Se consigue el texto de la cantidad de elementos del carrito
    const cart_quantity_text = document.getElementsByClassName("carrito")[0].children[0].children[1];
    setCartQuantity(cart_quantity_text);

    // Añadimos las tarjetas dinámicamente
    for (const element of db) {
        if (element.destacado === undefined) {
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
        } else {
            // Clonamos la tarjeta plantilla
            // y le asignamos los valores correspondientes
            const item = original_item_destacado.cloneNode(true);

            // Imagen
            item.children[1].children[0].src = element.imagen;

            // Se asigna el link del botón "Ver más"
            // al URL de detalles.html con el id del elemento como parámetro
            // para que la página de detalles muestre los datos de este elemento
            item.children[1].children[1].href = "detalles.html?id=" + element.id;

            // Nombre ropa
            item.children[2].innerHTML = element.nombre;

            // Precio
            item.children[3].innerHTML = precioToString(element.precio);

            // Se añade un callback al botón de "Agregar al carrito"
            item.children[4].addEventListener("click", function(event) {
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
            container_destacados.append(item);
        }
    }
});

// carrito.html
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay carrito-main, no estamos en carrito.html y salimos de la función prematuramente
    const carrito_main = document.getElementById("carrito-main");
    if (carrito_main === null) return;

    // Conseguimos el contenedor de las tarjetas
    // y la tarjeta de plantilla
    const container = document.getElementById("carrito-lista");
    const original_item = container.firstElementChild;
    original_item.remove();

    // Conseguimos el carrito desde la memoria
    const cart = JSON.parse(localStorage.getItem(cartStorageName)) || [];

    if (cart.length === 0) { // Si el carrito está vacío, se muestra mensaje acorde.
        container.parentElement.remove();

        carrito_main.innerHTML = "<h1>Carrito</h1><p>Tu carrito está vacío</p>"
    } else {

        // Se consigue el texto del precio total
        const precio_total_text = document.getElementById("resumen-precio-total").lastElementChild;

        // Precio total para el resumen
        let precio_total = 0;

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
            item_detalles.children[2].children[2].innerHTML = item_in_cart.cantidad;

            // Precio subtotal
            item_detalles.children[3].innerHTML = "Precio subtotal: " + precioToString(item_in_cart.precio * item_in_cart.cantidad);
            precio_total += item_in_cart.precio * item_in_cart.cantidad;

            // Se asignan listeners a los botones de cantidad
            const botones_cantidad = item_detalles.children[2];
            const cantidad_texto = botones_cantidad.children[2];
            // Boton -
            botones_cantidad.children[1].addEventListener("click", function() {
                let cantidad = parseInt(cantidad_texto.innerHTML);
                cantidad--;
                if (cantidad < 1) cantidad = 1;

                cantidad_texto.innerHTML = cantidad;
                item_in_cart.cantidad = cantidad;
                localStorage.setItem(cartStorageName, JSON.stringify(cart));

                // Se actualiza el subtotal
                item_detalles.children[3].innerHTML = "Precio subtotal: " + precioToString(cantidad * item_in_cart.precio);

                // Se actualiza el resumen total
                let nuevo_precio_total = 0;
                for (const item_in_cart of cart) {
                    nuevo_precio_total += item_in_cart.cantidad * item_in_cart.precio;
                }
                precio_total_text.innerHTML = precioToString(nuevo_precio_total);
            });

            // Boton +
            botones_cantidad.children[3].addEventListener("click", function() {
                let cantidad = parseInt(cantidad_texto.innerHTML);
                cantidad++;
                if (cantidad > 100) cantidad = 100;

                cantidad_texto.innerHTML = cantidad;
                item_in_cart.cantidad = cantidad;
                localStorage.setItem(cartStorageName, JSON.stringify(cart));

                // Se actualiza el subtotal
                item_detalles.children[3].innerHTML = "Precio subtotal: " + precioToString(cantidad * item_in_cart.precio);

                // Se actualiza el resumen total
                let nuevo_precio_total = 0;
                for (const item_in_cart of cart) {
                    nuevo_precio_total += item_in_cart.cantidad * item_in_cart.precio;
                }
                precio_total_text.innerHTML = precioToString(nuevo_precio_total);
            });
    
            container.append(item);
        }
    
        // Se consiguen los botones de "Quitar" para configurar su comportamiento
        const buttons_remove = Array.from(document.getElementsByClassName("remove-button"));
        buttons_remove.forEach((btn, index) => {
            // Se añade un callback al botón
            btn.addEventListener("click", function(event) {
                // Se elimina el elemento del carrito y se guarda en memoria
                const element_removed = cart.splice(index, 1);
                localStorage.setItem(cartStorageName, JSON.stringify(cart));

                // Se recarga la página
                location.reload();
            })
        })
    
        // Se consiguen los botones de "Comprar" para configurar su comportamiento
        const buttons_purchase = Array.from(document.getElementsByClassName("purchase-button"));
        buttons_purchase.forEach((btn, index) => {
            // Se añade un callback al botón
            btn.addEventListener("click", function(event) {
                // Se elimina el elemento del carrito y se guarda en memoria
                const element_removed = cart.splice(index, 1);
                localStorage.setItem(cartStorageName, JSON.stringify(cart));

                // Se recarga la página
                location.reload();
            })
        })

        // Se muestra el precio total del carrito
        precio_total_text.innerHTML = precioToString(precio_total);

        // Los botones de "Quitar todo" y "Comprar todo" se comportan igual:
        // Eliminan el carrito
        const button_remove_all = document.getElementsByClassName("remove-all-button")[0];
        button_remove_all.addEventListener("click", function() {
            localStorage.removeItem(cartStorageName);
            location.reload();
        })

        const button_purchase_all = document.getElementsByClassName("purchase-all-button")[0];
        button_purchase_all.addEventListener("click", function() {
            localStorage.removeItem(cartStorageName);
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

    // Botones de modificar cantidad
    const quantity_buttons = document.getElementById("quantity-buttons");
    // Se consigue el texto de la cantidad
    const quantity_text = quantity_buttons.children[1];

    // Boton -
    quantity_buttons.firstElementChild.addEventListener("click", function() {
        let quantity = parseInt(quantity_text.innerHTML);
        quantity--;
        if (quantity < 1) quantity = 1;

        quantity_text.innerHTML = quantity;
    });

    // Boton +
    quantity_buttons.lastElementChild.addEventListener("click", function() {
        let quantity = parseInt(quantity_text.innerHTML);
        quantity++;
        if (quantity > 100) quantity = 100;

        quantity_text.innerHTML = quantity;
    });

    // Se añade callback al botón "Agregar al carrito"
    detalles.children[8].addEventListener("click", function() {
        const item_to_push = {
            "id": element.id,
            "nombre": element.nombre,
            "precio": element.precio,
            "imagen": element.imagen,
            "cantidad": parseInt(quantity_text.innerHTML)
        }
        addToCart(item_to_push, cart_quantity_text);
    })
})

// Solo para debug
document.addEventListener("keydown", function(event) {
    if (event.key === "d") { // Elimina carrito
        localStorage.removeItem(cartStorageName);
    } else if (event.key === "c") { // Crea un carrito vacío
        localStorage.setItem(cartStorageName, JSON.stringify([]));
    } else if (event.key === "l") { // Muestra carrito en consola
        const cart = JSON.parse(localStorage.getItem(cartStorageName));
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