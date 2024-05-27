//hay que intentar hacer que los z-index sean dinámicos para que si se ponen mas páginas
//no haya que ir cambiandolos uno a uno

//también hay que hacer añadir la función esta dinámicamente
//#checkbox-page1:checked ~ .book #page1{
//    transform: rotateY(-180deg);
//    z-index: 2;
//}


const menuArray = {
    1: "quienesSomos.html",
    2: "misionVisionYValores.html",
    3: "nuestroLogo.html",
    4: "variaciones.html",
    5: "logoEjemplosDeUso.html",
    6: "nuestraPaletaDeColores.html",
    7: "nuestrasTipografias.html",
    8: "tipografiasEjemplosDeUso.html",
    9: "contactoYRecursos.html"
};

document.addEventListener("DOMContentLoaded", function () {

    const book = document.querySelector(".book");
    const checkBoxPage1 = document.getElementById("checkbox-page2");
    checkBoxPage1.addEventListener("click", function () {
        setTimeout(function () {
            const trigger = document.querySelector(".trigger");
            trigger.style.transition = "transform 3s";
            trigger.style.transform = "scale(1.5) translateX(50%)";

            setTimeout(function () {
                book.style.display = "none";
                const manual = document.getElementById("manual");
                manual.classList.toggle("active");
                manual.style.display = "flex";
                manual.style.zIndex = "10";
            }, 2800);

        }, 1500);

    })

    const rutaAlArchivo = 'json/apartadoMenu.json';

    fetch(rutaAlArchivo)
        .then(response => response.json())
        .then(data => {
            const result = parseMenuJSON(JSON.stringify(data));

            if (result) {
                // Obtener el contenedor donde se agregarán los elementos
                const contenedor = document.getElementById('apartados-menu');
                let contador = 1;
                // Procede a trabajar con los datos según tu necesidad
                result.forEach((item) => {
                    const apartado = item.key;
                    const detalles = item.value;

                    // Crear elemento li
                    const liElement = document.createElement('li');
                    liElement.classList.add('mb-1');

                    // Crear botón colapsable
                    const buttonElement = document.createElement('h6');
                    buttonElement.classList.add('align-items-center');
                    buttonElement.textContent = apartado;

                    // Crear contenedor colapsable
                    const collapseElement = document.createElement('div');

                    // Crear lista dentro del contenedor colapsable
                    const ulElement = document.createElement('ul');
                    ulElement.classList.add('list-unstyled', 'fw-normal', 'pb-1', 'small', 'apartado');

                    detalles.forEach(([nombre, indice]) => {
                        // Crear elemento li para cada detalle
                        const liDetalleElement = document.createElement('li');

                        // Crear elemento a
                        const aDetalleElement = document.createElement('a');
                        aDetalleElement.href = '#section' + indice;
                        aDetalleElement.classList.add('link-dark', 'rounded', 'd-flex');

                        // Crear elemento p para el nombre
                        const nombreDetalleElement = document.createElement('p');
                        nombreDetalleElement.classList.add('texto');
                        nombreDetalleElement.textContent = nombre;

                        // Crear elemento p para el índice
                        const indiceDetalleElement = document.createElement('p');
                        indiceDetalleElement.classList.add('indice');
                        indiceDetalleElement.textContent = indice;

                        // Agregar los elementos al árbol DOM
                        aDetalleElement.appendChild(nombreDetalleElement);
                        aDetalleElement.appendChild(indiceDetalleElement);
                        liDetalleElement.appendChild(aDetalleElement);
                        ulElement.appendChild(liDetalleElement);

                        //Creamos las páginas por cada apartado
                        const contenedor = document.querySelector('.contenedor');
                        const sectionApartado = document.createElement('section');
                        sectionApartado.id = 'section' + indice;
                        sectionApartado.classList.add('contenido');

                        const contentSection = document.createElement('div');
                        contentSection.classList.add('content');
                        sectionApartado.appendChild(contentSection);


                        const footerSection = document.createElement('div');
                        footerSection.classList.add('footer');
                        const footerTitleText = document.createElement('p');
                        footerTitleText.textContent = apartado;
                        const footerIndex = document.createElement('p');
                        footerIndex.textContent = indice;
                        footerSection.appendChild(footerTitleText);
                        footerSection.appendChild(footerIndex);

                        sectionApartado.appendChild(footerSection);

                        contenedor.appendChild(sectionApartado);

                        //Cargamos el contenido de cada section llamando a la página correspondiente
                        const pagePath = "pages/" + menuArray[contador];

                        
                        $(function () {
                            const sectionSelector = '#section' + indice + ' .content';
                            $(sectionSelector).load(pagePath);
                        });

                        contador++;
                    });

                    // Agregar los elementos al árbol DOM
                    collapseElement.appendChild(ulElement);
                    liElement.appendChild(buttonElement);
                    liElement.appendChild(collapseElement);
                    contenedor.appendChild(liElement);
                });
            } else {
                console.log("Error al obtener la información del menú.");
            }
        })
        .catch(error => console.error("Error al cargar el archivo:", error));

    function parseMenuJSON(jsonString) {
        try {
            const menuData = JSON.parse(jsonString);
            const resultArray = [];

            for (const apartado in menuData.apartados_menu) {
                const nombres = Object.entries(menuData.apartados_menu[apartado]);
                resultArray.push({
                    key: apartado,
                    value: nombres.map(([nombre, indice]) => [nombre, indice]),
                });
            }

            return resultArray;
        } catch (error) {
            console.error("Error al parsear el JSON:", error);
            return null;
        }
    }

    

});