//---=================---VARIABLES GLOBALES---===================------//

let personas = [];

let formularioNombre;
let formularioApellido;
let formularioEdad;
let formularioEmail;
let mensaje;
let formulario;
let domProbando;

//---=================---CONSTRUCTOR---===================------//

class Persona {
  constructor(nombre, apellido, edad, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.email = email;
  }
}

//---=================---FUNCIONES---===================------//

function iniciarElementos() {
  formulario = document.getElementById('formulario');
  formularioNombre = document.getElementById('formularioNombre');
  formularioApellido = document.getElementById('formularioApellido');
  formularioEdad = document.getElementById('formularioEdad');
  formularioEmail = document.getElementById('formularioEmail');
  domProbando = document.getElementsByClassName('domProbando');
}

iniciarElementos();

/*function agregarPersonas() {
  personas.forEach((element) => {
    let domProbando = document.querySelector('.domProbando');
    let mensaje = document.createElement('h3');

    mensaje.innerHTML = `
    <h3>Hola ${element.nombre} ${element.apellido}, te vamos a estar enviando una notificacion a ${element.email}.
    Tenes ${element.edad} anios gaga </h3>
    `;

    domProbando.append(mensaje);
    console.log(personas.length);
    personas.pop();
  });
}
*/
//---=================---ON SUBMIT---===================------//

formulario.onsubmit = (event) => {
  event.preventDefault();
  let nuevaPersona = new Persona(formularioNombre.value, formularioApellido.value, formularioEdad.value, formularioEmail.value);
  personas.push(nuevaPersona);

  formulario.reset();
  console.log(nuevaPersona);
};

function enviarFormulario() {
  Toastify({
    text: `Hola ${formularioNombre.value}, pronto te vamos a notificar`,
    duration: 5000,
    gravity: 'bottom',
    position: 'right',
  }).showToast();
}
