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

//-----------------------------------------------------------------//
fetch('./stock.json')
  .then((resinicial) => resinicial.json())

  .then((res) => {
    const stockProductos = res;

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
  })

  .catch((e) => {
    console.log(e);
  });

//------------------------------------------------------------------------------------//

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

//----Librerias-----

function manejeElClick() {
  Swal.fire({
    title: 'Felicitaciones por su compra',
    text: 'Queres comprar mas?',
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
}

// async function averSiSale(){
//   const res = await fetch('./stock.json')
//   const stockProductos = await res.json()

//   stockProductos.forEach((producto) => {
//     const div = document.createElement('div');
//     div.classList.add('producto');
//     div.innerHTML = `
//     <img src=${producto.img} alt="" class="img-fluid" width="250px">
//     <h6>${producto.nombre}</h6>
//     <p class="precioProducto">Precio:$ ${producto.precio}</p>
//     <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

//     `;

//     contenedorProductos.appendChild(div);

//     const boton = document.getElementById(`agregar${producto.id}`);

//     boton.addEventListener('click', () => {
//       agregarAlCarrito(producto.id);
//     });
//   });

//   const agregarAlCarrito = (prodId) => {
//     const existe = carrito.some((prod) => prod.id === prodId);

//     if (existe) {
//       const prod = carrito.map((prod) => {
//         if (prod.id === prodId) {
//           prod.cantidad++;
//         }
//       });
//     } else {
//       const item = stockProductos.find((prod) => prod.id === prodId);
//       carrito.push(item);
//     }
//     actualizarCarrito();
//   };
// }
