function enviarFormulario() {
    var nombre, apellido, correo, telefono, mensaje, error;

    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    correo = document.getElementById('correo').value;
    telefono = document.getElementById('telefono').value;
    mensaje = document.getElementById('mensaje').value;
    expresion = /\w+@\w+\.+[a-z]/;

    if(nombre === null || nombre === ''
        ||apellido === null || apellido === ''
        ||correo === null || correo === ''
        ||telefono === null || telefono === ''
        ||mensaje === null || mensaje === '') {
        alert("Todos los campos son obligatorios");
        return false;
    }
    
    else if (nombre.length > 30) {
        alert("El nombre es muy largo");
        return false;
    }

    else if(!expresion.test(correo)) {
        alert("El correo no es válido");
        return false;
    }

    else if(isNaN(telefono)) {
        alert("El telefono ingresado no es válido");
        return false;
    }

}
