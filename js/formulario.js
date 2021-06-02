const formulario = document.getElementById('contactForm');
const inputs = document.querySelectorAll('#contactForm input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false, 
	correo: false,
	telefono: false
}

const validarForm = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
        break
        case "email":
            validarCampo(expresiones.correo, e.target, 'email')
        break
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono')
        break
    }
}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`form-${campo}`).classList.remove('form-group-incorrect');
        document.getElementById(`form-${campo}`).classList.add('form-group-correct');
     //   document.querySelector(`#form-${campo} i`).classList.add('fa-check-circle');
      //  document.querySelector(`#form-${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#form-${campo} .form-input-error`).classList.remove('form-input-error-active');
        campos[campo] = true;
    } else {
        document.getElementById(`form-${campo}`).classList.add('form-group-incorrect');
        document.getElementById(`form-${campo}`).classList.remove('form-group-correct');
      //  document.querySelector(`#form-${campo} i`).classList.add('fa-times-circle');
      //  document.querySelector(`#form-${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#form-${campo} .form-input-error`).classList.add('form-input-error-active');
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm)
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.nombre && campos.correo && campos.telefono){
        formulario.reset();
        document.getElementById('form-enviar-exito').classList.add('form-enviar-exito-active')
        setTimeout(() => {
            document.getElementById('form-enviar-exito').classList.remove('form-enviar-exito-active')
        }, 5000);

        document.querySelectorAll('.form-group-correct').forEach((icono) => {
            icono.classList.remove('form-group-correct')
        });
    }
    else {
        document.getElementById('form-msj').classList.add('form-msj-active')
    }
})

