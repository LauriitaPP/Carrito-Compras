//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrar()


function registrar (){
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];  //reseteamos el array
        limpiarHTML()
    })
}



function agregarCurso(e){
    e.preventDefault();  //Así cuando presiones el boton de añadir al carrito, no te sube arriba
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
};


function eliminarCurso(e){
    // console.log(e.target.classList)
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id')

        //eliminar el array de articulosCarrito por el dataId
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        // console.log(articulosCarrito)

        //Llamo de nuevo a la funcion del html para que se borre del html tambien
        carritoHTML();
    }
}



//Leer el contenido del html que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        }


    //Revisa si un elemento ya existe en el carrito (función cantidades)
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe) { 
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso; //Retorna el objeto actualizado
            }else{
                return curso;  //Retorna los objetos que no son duplicados pero son importantes
            }
        })
        articulosCarrito = [ ...cursos]

    } else { 
        //Agrega elementos al array de carrito (puedes hacerlo con .push)
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}



//Muestra el carrito de compras en el html

function carritoHTML(){
    
    //limpiar html 
    limpiarHTML()

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${curso.imagen}" width="100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        //Agrega el html en el tbody

        contenedorCarrito.appendChild(row); //añade al final y no elimina los primeros
    })
}



//Elimina los cursos del tbody
function limpiarHTML(){

    //forma lenta de limpiar:
    // contenedorCarrito.innerHTML = '';

    //la mejor manera
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
