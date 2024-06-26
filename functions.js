let bienvenida = document.getElementById("bienvenida");
let prof = localStorage.getItem("profe");
let show = document.getElementById("opciones");


bienvenida.innerHTML = `Bienvenido Prof.   ${prof}`;

//Abre ventana de alumnado grupos
// function grupos() {
//     window.location.href = "alumnado.html";
// }

class Alumno{
    constructor(nombre, apellido, edad){
        this.nombre = nombre,
        this.apellido = apellido,
        this.edad = edad,
        this.calificaciones = [],
        this.calificacionNumeros = [],
        this.promedio = 0,
        this.materias = []
    }
    agregarMateria(materia){
        this.materias.push(materia)
    }
    agregarCalificacion(materia, calificacion){
        const datos = {materia, calificacion}
        this.calificaciones.push(datos)
        this.calificacionNumeros.push(calificacion)
    }

    calculaPromedio(arreglo){
        var promedio = arreglo.reduce((previo, calificacionActual)=> 
        previo + calificacionActual,0)/arreglo.length;
        return promedio;
    }    

    agregaPromedio(prom){
        this.promedio = prom;
    }

    
}


//============================================   PRUEBA de metodos de alumno======================================
//  let nuevoAlumno = new Alumno("pepe", "ruiz", "15")
//  let nuevoAlumno2 = new Alumno("Ana", "perez", "15")
//    nuevoAlumno.agregarCalificacion("mate", 10)
//    nuevoAlumno.agregarCalificacion("esp", 5)
//    console.log("este es el alumno",nuevoAlumno);
//   nuevoAlumno.calculaPromedio()

class Grupo{
    constructor(nombre){
        this.nombre = nombre,
        this.alumnado = []
    }

    buscaNombre(nombre){
        let busqueda;
        busqueda = this.alumnado.filter(names => names.nombre == nombre)
        //console.log(busqueda);
        return busqueda;
    }

    buscaApellido(apellido){
        let busqueda;
        busqueda = this.alumnado.filter(names => names.apellido == apellido)
        //console.log(busqueda);
        return busqueda;
    }
}

/*=========================================Prueba de metodos del grupo=====================================
let grupoPrueba = new Grupo("E")
console.log(grupoPrueba);
grupoPrueba.alumnado.push(nuevoAlumno)
grupoPrueba.alumnado.push(nuevoAlumno2)
console.log(grupoPrueba);
grupoPrueba.buscaNombre("Ana")*/

//VARIABLES GLOBALES
var alumnos = [];
var grupos = [];

function alta() {
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));
    let edad = (prompt(`Cual es la edad del alumno?`));

    let nuevoAlumno = new Alumno(nombre, apellido, edad)
    console.log(nuevoAlumno);
    show.innerHTML = `Felicidades! se ha dado de alta a ${nombre} ${apellido}`;
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
            let calif = parseFloat(calificacion)

            alumnos[index].agregarCalificacion(materia, calif)

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

function promediar() {
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));

    //Corrobora la existencia del alumno
    let existe = alumnos.some(alumnoNombre => alumnoNombre.nombre === nombre && alumnoNombre.apellido === apellido);
    let index = alumnos.findIndex(indice => indice.nombre === nombre && indice.apellido === apellido)

    if (existe) {
        var arregloCalif = alumnos[index].calificacionNumeros;
        var prom = alumnos[index].calculaPromedio(arregloCalif);
        show.innerHTML = `El promedio de ${nombre} ${apellido} es de: ${prom}`;
        return prom;
    } else {
        alert(`El alumno no esta dado de alta`)
    }
}

function buscaNombre() {
    let nombredGrupo = (prompt(`Cual es el nombre del Grupo?`));
    let nombreABuscar = document.getElementById("buscarNombre").value
    let existe = grupos.some(grupoNombre => grupoNombre.nombre === nombredGrupo);

    if (existe) {
        let index = grupos.findIndex(indice => indice.nombre === nombredGrupo)
        var selogro = grupos[index].buscaNombre(nombreABuscar);
        let indice = selogro.findIndex(alumnoName => alumnoName.nombre === nombreABuscar)

        show.innerHTML = `GRUPO ${nombredGrupo} <br><br>El alumno ${selogro[indice].nombre} ${selogro[indice].apellido} se encuntra en este grupo`;
    } else {
        alert(`Este grupo no existe`)
    }
}

function buscaApellido() {
    let nombredGrupo = (prompt(`Cual es el nombre del Grupo?`));
    let apellidoABuscar = document.getElementById("buscarApellido").value
    let existe = grupos.some(grupoNombre => grupoNombre.nombre === nombredGrupo);

    if (existe) {
        let index = grupos.findIndex(indice => indice.nombre === nombredGrupo)
        var selogro = grupos[index].buscaApellido(apellidoABuscar);
        let indice = selogro.findIndex(alumnoName => alumnoName.apellido === apellidoABuscar)

        show.innerHTML = `GRUPO ${nombredGrupo} <br><br>El alumno ${selogro[indice].nombre} ${selogro[indice].apellido} se encuntra en este grupo`;
    } else {
        alert(`Este grupo no existe`)
    }
}

function grupoProm() {
    let nombredGrupo = (prompt(`De que Grupo desea ver la lista?`));
    let existe = grupos.some(grupoNombre => grupoNombre.nombre === nombredGrupo);
    let index = grupos.findIndex(indice => indice.nombre === nombredGrupo)

    if (existe) {

        var size = grupos[index].alumnado.length;
        var sumaProms = 0 //se va acumulando el promedios de cada alumno dentro del grupo

        for (let i = 0; i < size; i++) {// calcula el promedio individual de cada alumno dentro del grupo

            var calificacionesAlumn = grupos[index].alumnado[i].calificacionNumeros
            var promi = grupos[index].alumnado[i].calculaPromedio(calificacionesAlumn)
            sumaProms = sumaProms + promi;
        }

        let promedioGrupal = sumaProms / size
        show.innerHTML = `El promedio del Grupo ${nombredGrupo} es de: ${promedioGrupal}`;
        return promedioGrupal

    } else {
        alert(`Este grupo no existe`)
    }
}

function listaAlumnos() {
    let nombredGrupo = (prompt(`De que Grupo desea ver la lista?`));
    let existe = grupos.some(grupoNombre => grupoNombre.nombre === nombredGrupo);
    let index = grupos.findIndex(indice => indice.nombre === nombredGrupo)

    if (existe) {
        var size = grupos[index].alumnado.length;

        for (let i = 0; i < size; i++) {
            var alumno = grupos[index].alumnado[i];
            var calificacionesAlumn = alumno.calificacionNumeros;
            var promedioAlumn = alumno.calculaPromedio(calificacionesAlumn);
            alumno.agregaPromedio(promedioAlumn);
        }

        // Ordenar alumnado por promedio
        grupos[index].alumnado.sort((a, b) => a.promedio - b.promedio);

        // Mostrar lista ordenada
        var lista = document.getElementById("opciones");
        lista.innerHTML = ""; // Limpiar la lista antes de mostrar los resultados

        grupos[index].alumnado.forEach(alumno => {
            let item = document.createElement("p");
            item.textContent = `Nombre: ${alumno.nombre} ${alumno.apellido}, Promedio: ${alumno.promedio}`;
            lista.appendChild(item);
        });
        
    } else {
        alert(`Este grupo no existe`)
    }
}

function listaDesc() {
    let nombredGrupo = (prompt(`De que Grupo desea ver la lista?`));
    let existe = grupos.some(grupoNombre => grupoNombre.nombre === nombredGrupo);
    let index = grupos.findIndex(indice => indice.nombre === nombredGrupo)

    if (existe) {
        var size = grupos[index].alumnado.length;

        for (let i = 0; i < size; i++) {
            var alumno = grupos[index].alumnado[i];
            var calificacionesAlumn = alumno.calificacionNumeros;
            var promedioAlumn = alumno.calculaPromedio(calificacionesAlumn);
            alumno.agregaPromedio(promedioAlumn);
        }

        // Ordenar alumnado por promedio
        grupos[index].alumnado.sort((a, b) => b.promedio - a.promedio );

        // Mostrar lista ordenada
        var lista = document.getElementById("opciones");
        lista.innerHTML = ""; // Limpiar la lista antes de mostrar los resultados

        grupos[index].alumnado.forEach(alumno => {
            let item = document.createElement("p");
            item.textContent = `Nombre: ${alumno.nombre} ${alumno.apellido}, Promedio: ${alumno.promedio}`;
            lista.appendChild(item);
        });
        
    } else {
        alert(`Este grupo no existe`)
    }
}