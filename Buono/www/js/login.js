function registrar(){
   
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    //agregaremos una validacion para que no queden espacios vacios

    if (username == null || username == ""){
        alert("Inserte un usuario");
    } else if (email == null || email == ""){
        alert("Agregar un email por favor")
    } else if (pass == null || pass == ""){
        alert("Inserte por favor una contraseña")
    } else {
        var user = {
            email: email,
            username: username,
            password: pass,
        };
    
        var json = JSON.stringify(user);
        localStorage.setItem(username, json);
        console.log('Usuario agregado exitosamente')
        location.href='../login.html';
        
    }
}

function iniciar() {

var username = document.getElementById('username').value;
var pass = document.getElementById('password').value;

var user = localStorage.getItem(username);
var data = JSON.parse(user);
console.log(data)

if(user == null || user==""){
    alert('usuario incorrecto')
}else if(pass == null || pass == ""){
    alert('contraseña incorrecta')
}else{
    alert('iniciando');
    location.href='../Restaurante.html';
}
}