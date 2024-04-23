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





function alta() {
    console.log(`hola`);
    let nombre = (prompt(`Cual es el nombre del alumno?`));
    let apellido = (prompt(`Cual es el apellido del alumno?`));
    let edad = (prompt(`Cual es la edad del alumno?`));

    let nuevoAlumno = new Alumno(nombre, apellido, edad)
    console.log(nuevoAlumno);
    alert(`Felicidades! se ha dado de alta a ${nombre} ${apellido}`)
    return nuevoAlumno;
}


console.log('dentro');


