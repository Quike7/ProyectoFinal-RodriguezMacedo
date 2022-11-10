// Usaremos local storage para que no se borren los productos cuando vuelva/regrese  el usuario, o navegue por otras 
// páginas del sitio, para ello deberás almacenaremos la información de la  navegación del usuario: LocalStorage
document.addEventListener('DOMContentLoaded', () => {



// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Laptop Acer',
        precio: 16000,
        imagen: 'images/laptop1.jpg'
    },

    {
        id: 2,
        nombre: 'Laptop HP',
        precio:  18000,
        imagen: 'images/laptop2.jpg'
    },

    {
        id: 3,
        nombre: 'MacBook Air',
        precio: 21000,
        imagen: 'images/laptop3.jpg'
    },

    {
        id: 4,
        nombre: 'Lenovo Gaming',
        precio: 32000,
        imagen: 'images/laptop4.jpg'
    },

    {
        id: 5,
        nombre: 'ASUS Vivobook',
        precio: 19000,
        imagen: 'images/laptop5.jpg'
    },

    {
        id: 6,
        nombre: 'DELL Bundle',
        precio: 19000,
        imagen: 'images/laptop6.jpg'
    },

    {
        id: 7,
        nombre: 'Tablet Acer',
        precio: 10000,
        imagen: 'images/tablet1.jpg'
    },

    {
        id: 8,
        nombre: 'Tablet HP',
        precio: 11000,
        imagen: 'images/tablet2.jpg'
    },

    {
        id: 9,
        nombre: 'iPad Pro',
        precio: 14000,
        imagen: 'images/tablet3.jpg'
    },

    {
        id: 10,
        nombre: 'Tablet SAMSUNG Galaxy',
        precio: 24000,
        imagen: 'images/tablet4.jpg'
    },

    {
        id: 11,
        nombre: 'Tablet lenovo',
        precio: 23000,
        imagen: 'images/tablet5.jpg'
    },

    {
        id: 12,
        nombre: 'Tablet HUAWEI',
        precio: 13000,
        imagen: 'images/tablet6.jpg'
    },

    {
        id: 13,
        nombre: 'Acer Sospiro A60',
        precio: 3000,
        imagen: 'images/smartphone1.jpg'
    },

    {
        id: 14,
        nombre: 'HP Elite x3',
        precio: 12000,
        imagen: 'images/smartphone2.jpg'
    },

    {
        id: 15,
        nombre: 'iPhone 13 Pro',
        precio: 20000,
        imagen: 'images/smartphone3.jpg'
    },

    {
        id: 16,
        nombre: 'MotoROLA E6i',
        precio: 3000,
        imagen: 'images/smartphone4.jpg'
    },

    {        
        id: 17,
        nombre: 'Smartphone Xiaomi',
        precio: 5000,
        imagen: 'images/smartphone5.jpg'
    },

    {         
        id: 18,
        nombre: 'HUAWEI nova 9',
        precio: 7000,
        imagen: 'images/smartphone6.jpg'
    }



];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage; // local storege




            // Funciones

            /* Dibuja / pinta todos los productos a partir de la base de datos. No confundir con el carrito */
             function renderizarProductos() {
                baseDeDatos.forEach((info) => {
                    // Estructura
                    const miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-4');
                    // Body
                    const miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');
                    // Titulo
                    const miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info.nombre;
                    // Imagen
                    const miNodoImagen = document.createElement('img');
                    miNodoImagen.classList.add('img-fluid');
                    miNodoImagen.setAttribute('src', info.imagen);
                    // Precio
                    const miNodoPrecio = document.createElement('p');
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = `${info.precio}${divisa}`;
                    // Boton 
                    const miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info.id);
                    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                    // Insertamos
                    miNodoCardBody.appendChild(miNodoImagen);
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    DOMitems.appendChild(miNodo);
                });
            }

            /*  Evento para añadir un producto al carrito de la compra */
            function anyadirProductoAlCarrito(evento) {
                // Anyadimos el Nodo a nuestro carrito
                carrito.push(evento.target.getAttribute('marcador'))
                // Actualizamos el carrito 
                renderizarCarrito();
                // Usamaos LocalStorage para guardar / Actualizamos el LocalStorage
                guardarCarritoEnLocalStorage();
            }

            /*  Dibuja / pinta todos los productos guardados en el carrito */
            function renderizarCarrito() {
                // Vaciamos todo el html
                DOMcarrito.textContent = '';
                // Quitamos los duplicados
                const carritoSinDuplicados = [...new Set(carrito)];
                // Generamos los Nodos a partir de carrito
                carritoSinDuplicados.forEach((item) => {
                    // Obtenemos el item que necesitamos de la variable base de datos
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        // ¿Coincide las id? Solo puede existir un caso
                        return itemBaseDatos.id === parseInt(item);
                    });
                    // Cuenta el número de veces que se repite el producto
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                        // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    // Creamos el nodo del item del carrito
                    const miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
                    // Boton de borrar
                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', borrarItemCarrito);
                    // Mezclamos nodos
                    miNodo.appendChild(miBoton);
                    DOMcarrito.appendChild(miNodo);
                });
                // Renderizamos el precio total en el HTML
                DOMtotal.textContent = calcularTotal();
            }

            /* Evento para borrar un elemento del carrito */
            function borrarItemCarrito(evento) {
                // Obtenemos el producto ID que hay en el boton pulsado
                const id = evento.target.dataset.item;
                // Borramos todos los productos
                carrito = carrito.filter((carritoId) => {
                    return carritoId !== id;
                });
                // volvemos a renderizar
                renderizarCarrito();
                // Usamaos LocalStorage para guardar / Actualizamos el LocalStorage
                guardarCarritoEnLocalStorage();

            }

            /* Calcula el precio total teniendo en cuenta los productos repetidos */
            function calcularTotal() {
                // Recorremos el array del carrito 
                return carrito.reduce((total, item) => {
                    // De cada elemento obtenemos su precio
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    // Los sumamos al total
                    return total + miItem[0].precio;
                }, 0).toFixed(2);
            }

            // toFixed() devuelve una representación de cadena de numObj que no usa notación exponencial y tiene exactamente dígitos dígitos después del decimal. 
            // El número se redondea si es necesario, y la parte fraccional se rellena con ceros si es necesario para que tenga la longitud especificada.
            // Si numObj es mayor que 1e+21, este metodo llama a Number.prototype.toString() y retorna una cadena de notacion exponencial.


            /*  Vacia el carrito y vuelve a dibujarlo / pintarlo */
            function vaciarCarrito() {
                // Limpiamos los productos guardados
                carrito = [];
                // Renderizamos los cambios
                renderizarCarrito();
                // Usamaos LocalStorage para Borrar LocalStorage .clear
                localStorage.clear();

            }
               // En la siguiente funtion Usamaos LocalStorage para guardar el carrito en LocalStorage 
            function guardarCarritoEnLocalStorage () {
                miLocalStorage.setItem('carrito', JSON.stringify(carrito));
            }
              // En la siguiente funtion Usamaos LocalStorage para cargar el carrito previamente guardado en LocalStorage 
            function cargarCarritoDeLocalStorage () {
                // ¿Existe un carrito previo guardado en LocalStorage?
                if (miLocalStorage.getItem('carrito') !== null) {
                    // Carga la información
                    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
                }
            }

            // Eventos
            DOMbotonVaciar.addEventListener('click', vaciarCarrito);

            // Inicio
            // Usamaos LocalStorage para cargar el carrito 
            cargarCarritoDeLocalStorage(); 
            renderizarProductos();
            renderizarCarrito();
        });