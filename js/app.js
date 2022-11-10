// En app.js vamos a utilizar fetch, array  y API

const render = ({ nombre, empresa, puesto }) => {
    const contenido = document.querySelector('#contenido')

    contenido.innerHTML = `
        <p>Empleado: ${nombre}</p>
        <p>Empresa: ${empresa}</p>
        <p>Puesto: ${puesto}</p>
        <pre>
            A partir del día 15 de noviembre tenemos los siguientes productos disponibles
            en almacen:
        </pre>
    `
}

const renderArray = (empleados) => {
    const contenido = document.querySelector('#contenido')

    let html = ""

    empleados.forEach(empleado => {
        const { nombre, empresa, puesto } = empleado

        html += `
            <p>Empleado: ${nombre}</p>
            <p>Empresa: ${empresa}</p>
            <p>Puesto: ${puesto}</p>
            <hr/>
    `
    });


    contenido.innerHTML = html;
}

const renderAPI = (perfiles) => {
    const contenido = document.querySelector('#contenido')

    let html = ""

    perfiles.forEach(perfil => {
        const { author, post_url } = perfil

        html += `
            <p>Autor: ${author}</p>
            <a href="${post_url}" target="_blank">Ver Imagen</a>

            <hr/>
    `
    });
    contenido.innerHTML = html;
}

const obtenerDatosTXT = () => {
    fetch("data/data.txt")// petición http get al servidor pidiendo el archivo data/data.txt 
        .then((respuesta) => {
            console.log(respuesta)
            return respuesta.text()
        })
        .then((datos) => {
            console.log(datos)
        })
        .catch((error) => {
            console.log(error)
        })
}

const obtenerDatosJson = () => {
    fetch("data/data.json")// http get solicita / pide al servidor el archivo data/data.txt 
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((datos) => {
            // console.log(datos)
            render(datos)
        })
        .catch((error) => {
            console.log(error)
        })
}

const obtenerDatosArray = () => {
    fetch("data/datos.json")// http get servidor / pide al servidor el archivo data/datos.json 
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((datos) => {
            //console.log(datos)
            //render(datos)
            renderArray(datos)
        })
        .catch((error) => {
            console.log(error)
        })
}


const obtenerDatosAPI = () => {
    fetch("https://picsum.photos/list") // http get servidor pidiendo el archivo data/data.txt 
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((datos) => {
            console.log(datos)
            //render(datos)
            //renderArray(datos)
            renderAPI(datos)
        })
        .catch((error) => {
            console.log(error)
        })
}


const btnTxt = document.querySelector('#btnTxt');
const btnJson = document.querySelector('#btnJson');
const btnArray = document.querySelector('#btnArray');
const btnAPI = document.querySelector('#btnAPI');

btnTxt.addEventListener('click', obtenerDatosTXT);
btnJson.addEventListener('click', obtenerDatosJson);
btnArray.addEventListener('click', obtenerDatosArray);
btnAPI.addEventListener('click', obtenerDatosAPI);
