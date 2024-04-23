const profesores = [
    {usuario: "carlos",
    pass: "123"
    },
]


function ingresar() {
    let user =document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    let mensaje = document.getElementById("mensaje");


    profesores.forEach(function(datos){
        if(datos.usuario === user && datos.pass === password){
            
            console.log(user, password);
            localStorage.setItem("profe", user);
            window.location.href = "principal.html";
            }else{
            mensaje.style.color = "red";
            mensaje.innerHTML ="Datos Incorrectos";      
            }
    })
}

