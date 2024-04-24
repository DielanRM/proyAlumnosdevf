let bienvenida = document.getElementById("bienvenida");
let prof = localStorage.getItem("profe");


bienvenida.innerHTML = `Bienvenido Prof.   ${prof}`;

/*Abre ventana de alumnado
function alumnado() {
    window.location.href = "alumnado.html";
}*/

class Alumno{
    constructor(nombre, apellido, edad){
        this.nombre = nombre,
        this.apellido = apellido,
        this.edad = edad,
        this.calificaciones = [],
        this.materias = []
    }
    agregarMateria(materia){
        this.materias.push(materia)
    }
    agregarCalificacion(materia, calificacion){
        const datos = {materia, calificacion}
        this.calificaciones.push(datos)
    }
}

class Grupo{
    constructor(nombre){
        this.nombre = nombre,
        this.alumnado = []
    }
    
    pop(){//elimina y  muestra el ultimo elemento de nuestra pila
        if(this.isEmpty()){//si el metodo esta vacio isEmpty nos ayudara mas tarde para saber si la pila esta vacia
            return 'la pila esta vacia';
        }
        return this.alumnado.pop();
    }
    peek(){// retorna unicamente el valor
        return this.alumnado[this.alumnado.length - 1];//esto es para conocer el tamano de mi pila y poder consultar asi el numero de la posicion
    //  [0, 1, 2, 3, 4] este arreglo tiene tamano de 5 pero en la posicioon 4 encontramos el valor 4
    }
    size(){
        return this.alumnado.length;
    }
    isEmpty(){
        return this.alumnado.length === 0;
    }
}


//VARIABLES GLOBALES
var alumnos = [];
var grupos = [];



function alta() {
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));
    let edad = (prompt(`Cual es la edad del alumno?`));

    let nuevoAlumno = new Alumno(nombre, apellido, edad)
    console.log(nuevoAlumno);
    alert(`Felicidades! se ha dado de alta a ${nombre} ${apellido}`)
    alumnos.push(nuevoAlumno);
    return nuevoAlumno;
}


function asignarMaterias() {
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));

    //Corrobora la existencia del alumno
    let existe = alumnos.some(alumnoNombre => alumnoNombre.nombre === nombre && alumnoNombre.apellido === apellido);

    if (existe) {
        do {
            //encuentra el index
            let index = alumnos.findIndex(indice => indice.nombre === nombre && indice.apellido === apellido)

            //Asigna la materia
            let materia = (prompt(`Cual materia cursara el alumno ${alumnos[index].nombre} ${alumnos[index].apellido}?`));
            alumnos[index].agregarMateria(materia)
            console.log(alumnos[index]);

            var res = (prompt(`Desea asignar mas materias a este alumno? escriba Si, de lo contrario escriba No`)).toLowerCase();
        } while (res == 'si');

    } else {
        alert(`El alumno no esta dado de alta`)
    }
}


function asignarCalificaciones() {
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));

    console.log("calificaciones");
    //Corrobora la existencia del alumno
    let existe = alumnos.some(alumnoNombre => alumnoNombre.nombre === nombre && alumnoNombre.apellido === apellido);

    if (existe) {
        do {
            //encuentra el index
            let index = alumnos.findIndex(indice => indice.nombre === nombre && indice.apellido === apellido)
            console.log("aqui esta el indice", index);

            //Asigna la materia y su calificacion
            let materia = (prompt(`Que materia calificara?`));
            let calificacion = (prompt(`Que calificacion obtuvo el alumno?`));
            alumnos[index].agregarCalificacion(materia, calificacion)

            console.log(alumnos[index]);

            var res = (prompt(`Desea asignar mas calificaciones a este alumno? escriba Si, de lo contrario escriba No`)).toLowerCase();
        } while (res == 'si');

    } else {
        alert(`El alumno no esta dado de alta`)
    }
}


function crearGrupo() {
    let nombreGrupo = (prompt(`Cual sera el nombre del grupo?`))
    let nuevoGrupo = new Grupo(nombreGrupo)

    do {
        let nombre = (prompt(`Cual es el nombre del alumno que será añadido?`));
        let apellido = (prompt(`Cual es el apellido del alumno?`));

        //Corrobora la existencia del alumno
        let existe = alumnos.some(alumnoNombre => alumnoNombre.nombre === nombre && alumnoNombre.apellido === apellido);
        if (existe) {
            //encuentra el index
            let index = alumnos.findIndex(indice => indice.nombre === nombre && indice.apellido === apellido)
            var alumnoAnadir = alumnos[index]

            //Asigna al grupo
            console.log(nuevoGrupo);
            nuevoGrupo.alumnado.push(alumnoAnadir)
            grupos.push(nuevoGrupo)

            var res = (prompt(`Desea asignar mas alumnos a este grupo? escriba Si, de lo contrario escriba No`)).toLowerCase();
        }else{
            alert('No se encontro el Alumno en la base de datos')
        }
    } while (res == 'si');
    return nuevoGrupo
}