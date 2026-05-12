// "Colección" de "Base de datos" con las características de cada ropa
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

// index.html
document.addEventListener("DOMContentLoaded", function() {
    const galerias = document.getElementsByClassName("galeria");
    if (galerias.length === 0) return;

    const container = galerias[1];
    const original_item = container.children[0];
    original_item.remove();
    console.log(original_item);

    for (const element of db) {
        console.log(element.nombre);

        const item = original_item.cloneNode(true);
        item.children[0].children[0].src = element.imagen;
        item.children[1].innerHTML = element.nombre;
        const precio_number = element.precio.toString();
        let count = 0;
        const precio1 = precio_number.substring(count, precio_number.length % 3);
        count += precio_number.length % 3;
        const precio2 = precio_number.substring(count);
        item.children[2].innerHTML = "$" + precio1 + "." + precio2 + " CLP";

        item.children[3].addEventListener("click", function(event) {
            event.preventDefault();
            const cart = JSON.parse( localStorage.getItem("cart") ) || [];

            let exists = false;
            for (const item_in_cart of cart) {
                if (item_in_cart.id === element.id) {
                    item_in_cart.cantidad += 1;
                    exists = true;
                    break;
                }
            }
            
            if (!exists) {
                item_to_push = {
                    "id": element.id,
                    "nombre": element.nombre,
                    "precio": element.precio,
                    "descripcion": element.descripcion,
                    "tallas": element.tallas,
                    "imagen": element.imagen,
                    "cantidad": 0
                }
                cart.push(item_to_push)
                console.log(cart);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        })

        container.append(item);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "d") {
        localStorage.removeItem("cart");
    } else if (event.key === "c") {
        localStorage.setItem("cart", JSON.stringify([]));
    } else if (event.key === "l") {
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
    }
});
