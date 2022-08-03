//---------PRODUCTOS-----------------
const stockProductos = [
  {
    id: 1,
    nombre: 'VEUVE CLICQUOT RICH',
    precio: 20000,
    cantidad: 1,
    img: `imagenes/todofotos/otros1.jpg`,
  },
  {
    id: 2,
    nombre: ' VEUVE CLICQUOT ROSE',
    precio: 30000,
    cantidad: 1,
    img: `imagenes/todofotos/otros2.jpg`,
  },
  {
    id: 3,
    nombre: 'GANCIA AMERICANO',
    precio: 4500,
    cantidad: 1,
    img: `imagenes/todofotos/otros44.jpg`,
  },
  {
    id: 4,
    nombre: 'HINKS AGUA TONICA',
    precio: 200,
    cantidad: 1,
    img: `imagenes/todofotos/otros3.png`,
  },
  {
    id: 5,
    nombre: 'LOUIS ROEDERER',
    precio: 4500,
    cantidad: 1,
    img: `imagenes/todofotos/otros6.jpg`,
  },
  {
    id: 6,
    nombre: 'GIN LARIOS',
    precio: 4500,
    cantidad: 1,
    img: `imagenes/todofotos/otros4.jpg`,
  },
  {
    id: 7,
    nombre: 'SKYY RASPBERRY',
    precio: 1000,
    cantidad: 1,
    img: `imagenes/todofotos/vodka4.jpg`,
  },
  {
    id: 8,
    nombre: 'SKYY APRICOT',
    precio: 2500,
    cantidad: 1,
    img: `imagenes/todofotos/vodka1.jpg`,
  },
  {
    id: 9,
    nombre: 'SMIRNOFF RASPBERRY',
    precio: 800,
    cantidad: 1,
    img: `imagenes/todofotos/vodka6.jpg`,
  },
  {
    id: 10,
    nombre: 'WOKKA SAKI',
    precio: 800,
    cantidad: 1,
    img: `imagenes/todofotos/vodka5.jpg`,
  },
  {
    id: 11,
    nombre: 'DANZKA GRAPEFRUIT',
    precio: 800,
    cantidad: 1,
    img: `imagenes/todofotos/vodka3.jpg`,
  },
  {
    id: 12,
    nombre: 'VODKA SERNOVA',
    precio: 800,
    cantidad: 1,
    img: `imagenes/todofotos/vodka2.jpg`,
  },
  {
    id: 13,
    nombre: 'ALMA NEGRA BLEND',
    precio: 3740,
    cantidad: 1,
    img: `imagenes/todofotos/vino1.jpg`,
  },
  {
    id: 14,
    nombre: 'ALCHIMIA CABERNET SAUVIGNON',
    precio: 500,
    cantidad: 1,
    img: `imagenes/todofotos/vino2.jpg`,
  },
  {
    id: 15,
    nombre: 'FINCA IRAL LAS PINTADAS',
    precio: 1.19,
    cantidad: 1,
    img: `imagenes/todofotos/vino6.jpg`,
  },
  {
    id: 16,
    nombre: 'FINCA IRAL WINEMAKER',
    precio: 2.3,
    cantidad: 1,
    img: `imagenes/todofotos/vino3.jpg`,
  },
  {
    id: 17,
    nombre: 'FINCA IRAL CHARDONNAY',
    precio: 860,
    cantidad: 1,
    img: `imagenes/todofotos/vino4.jpg`,
  },
  {
    id: 18,
    nombre: 'FINCA IRAL CABERNET',
    precio: 1.01,
    cantidad: 1,
    img: `imagenes/todofotos/vino5.jpg`,
  },
  {
    id: 19,
    nombre: 'PATAGONIA',
    precio: 200,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza1.png`,
  },
  {
    id: 20,
    nombre: 'MILLER',
    precio: 250,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza3.jpg`,
  },
  {
    id: 21,
    nombre: 'SCHNEIDER',
    precio: 300,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza1.png`,
  },
  {
    id: 22,
    nombre: 'SALTA CAUTIVA ROJA',
    precio: 200,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza4.png`,
  },
  {
    id: 23,
    nombre: 'STRAUSS CLASSIC',
    precio: 250,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza5.png`,
  },
  {
    id: 24,
    nombre: 'ALMIRANTE BOUCHARD',
    precio: 300,
    cantidad: 1,
    img: `./imagenes/todofotos/cerveza6.png`,
  },
];

//---------FIN PRODUCTOS-----------------

//---------CONSTANTES-----------------
let carrito = [];

const contenedorCarrito = document.getElementById('carrito-contenedor');

const contenedorProductos = document.getElementById('contenedor-productos');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

//-------------GETITEM-------//

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});
//--------BOTON VACIAR-----------//
botonVaciar.addEventListener('click', () => {
  carrito.length = 0;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
});

//---------FOREACH-----------------
stockProductos.forEach((producto) => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
  <img src=${producto.img} alt="" class="img-fluid" width="250px">
  <h6>${producto.nombre}</h6>
  <p class="precioProducto">Precio:$ ${producto.precio}</p>
  <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  
  `;

  contenedorProductos.appendChild(div);

  const boton = document.getElementById(`agregar${producto.id}`);

  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
  });
});

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = '';

  carrito.forEach((prod) => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>Precio:$${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>

  `;

    contenedorCarrito.appendChild(div);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  });
  console.log(carrito);
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
};

//---------FUNCIONES AGREGAR Y ELIMINAR-----------------

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
};

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

//----Librerias-----

function manejeElClick() {
  Swal.fire({
    title: 'Felicitaciones por su compra',
    text: 'Queres comprar mas?',
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
}
