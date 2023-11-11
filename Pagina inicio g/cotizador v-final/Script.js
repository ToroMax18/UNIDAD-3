document.addEventListener('DOMContentLoaded', function () {
    // Manejadores de eventos para radio botones
    var secciones = document.querySelectorAll('.linea');
    secciones.forEach(function (seccion) {
      var opcionesRadio = seccion.querySelectorAll('input[type="radio"]');
      opcionesRadio.forEach(function (opcion) {
        opcion.addEventListener('change', function () {
          actualizarResumen(seccion);
        });
      });

      // Manejador de eventos para combos
      var combos = seccion.querySelectorAll('select');
      combos.forEach(function (combo) {
        combo.addEventListener('change', function () {
          actualizarResumen(seccion);
        });
      });
    });

    // Manejador de eventos para el botón "Calcular Total"
    var botonCalcularTotal = document.getElementById('calcularTotal');
    botonCalcularTotal.addEventListener('click', calcularTotal);

    // Manejador de eventos para el botón "Volver a Cotizar"
    var botonVolverACotizar = document.getElementById('volverACotizar');
    botonVolverACotizar.addEventListener('click', reiniciarCotizador);

    // Manejador de eventos para el botón "Mostrar Resumen"
    var botonMostrarResumen = document.getElementById('mostrarResumen');
    botonMostrarResumen.addEventListener('click', mostrarResumen);
  });

  function actualizarResumen(seccion) {
    var resumen = seccion.querySelector('.resumen');
    resumen.innerHTML = ''; // Limpiar resumen

    var opcionesSeleccionadas = seccion.querySelectorAll('input[type="radio"]:checked, select');
    opcionesSeleccionadas.forEach(function (opcion) {
      var textoOpcion = opcion.value;
      var li = document.createElement('li');
      li.textContent = textoOpcion;
      resumen.appendChild(li);
    });
  }

  function calcularTotal() {
    var secciones = document.querySelectorAll('.linea');
    var total = 0;

    secciones.forEach(function (seccion) {
      var opcionesSeleccionadas = seccion.querySelectorAll('input[type="radio"]:checked, select');
      opcionesSeleccionadas.forEach(function (opcion) {
        total += parseFloat(opcion.value) || 0; // Sumar el valor numérico, si es un número
      });
    });

    // Calcular el IVA (por ejemplo, 16%)
    var iva = total * 0.16;

    // Agregar el IVA a la sección de resumen
    var spanIva = document.getElementById('iva');
    spanIva.textContent = iva.toFixed(2);

    // Sumar el IVA al total
    total += iva;

    // Agregar el total a la sección de resumen
    var spanTotal = document.getElementById('total');
    spanTotal.textContent = total.toFixed(2); // Mostrar el total con dos decimales
  }

  function reiniciarCotizador() {
    var secciones = document.querySelectorAll('.linea');
    secciones.forEach(function (seccion) {
      var opcionesRadio = seccion.querySelectorAll('input[type="radio"]');
      opcionesRadio.forEach(function (opcion) {
        opcion.checked = false;
      });

      var combos = seccion.querySelectorAll('select');
      combos.forEach(function (combo) {
        combo.selectedIndex = 0;
      });

      // Ocultar los combos que se muestran al seleccionar radio botones
      var combosAdicionales = seccion.querySelectorAll('#menuDesplegable9, #menuDesplegable10, #menuDesplegable11, #menuDesplegable12, #menuDesplegable13, #menuDesplegable14, #menuDesplegable15');
      combosAdicionales.forEach(function (combo) {
        combo.style.display = 'none';
      });
    });

    // Limpiar la sección de resumen
    var resumen = document.getElementById('resumen');
    resumen.innerHTML = '';

    // Restablecer los totales
    var spanIva = document.getElementById('iva');
    spanIva.textContent = '0';

    var spanTotal = document.getElementById('total');
    spanTotal.textContent = '0';
  }

  function mostrarResumen() {
    var secciones = document.querySelectorAll('.linea');
    var mensaje = "Resumen de la Cotización:\n\n";

    secciones.forEach(function (seccion) {
      var opcionesSeleccionadas = seccion.querySelectorAll('input[type="radio"]:checked, select');
      opcionesSeleccionadas.forEach(function (opcion) {
        mensaje += opcion.value + "\n";
      });
    });

    alert(mensaje);
  }