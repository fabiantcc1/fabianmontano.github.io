// Ingreso anual deseado para el retiro calculado apartir del monto mensual deseado para vivir después del retiro
function ingresoAnualDeseado(montoMensual){
    const montoMensualNecesario = montoMensual * 12;
    
    return montoMensualNecesario;
}

function tiemposParaRetiro(edadActual, edadRetiro, edadExpectativa){
    const tiempo ={
        trabajo: edadRetiro - edadActual,
        retiro: edadExpectativa - edadRetiro
    }

    return tiempo;
}

function calcularMontosParaRetiro(){
    //Obtenemos los datos de los inputs de retiro
    const inputMontoMensual = document.getElementById('inputMontoMensual').value;
    const inputEdadRetiro = document.getElementById('inputEdadRetiro').value;
    const inputEdadActual = document.getElementById('inputEdadActual').value;
    const inputEdadExpectativa = document.getElementById('inputEdadExpectativa').value;

    //Obtenemos los textos donde se mostrará el error
    const textError = document.querySelector('.input-edad-expectativa');

    if (
        (inputMontoMensual.length == 0 || /^\s+$/.test(inputMontoMensual) || isNaN(inputMontoMensual)) ||
        (inputEdadRetiro.length == 0 || /^\s+$/.test(inputEdadRetiro) || isNaN(inputEdadRetiro)) ||
        (inputEdadActual.length == 0 || /^\s+$/.test(inputEdadActual) || isNaN(inputEdadActual)) ||
        (inputEdadExpectativa.length == 0 || /^\s+$/.test(inputEdadExpectativa) || isNaN(inputEdadExpectativa))
    ) {
        textError.classList.remove('error-input-oculto');
        textError.classList.add('error-input');
    }
    else {
        textError.classList.remove('error-input');
        textError.classList.add('error-input-oculto');
    
        const tiempos = tiemposParaRetiro(inputEdadActual, inputEdadRetiro, inputEdadExpectativa);
        
        const ingresoTotalParaRetiro = ingresoAnualDeseado(inputMontoMensual) * tiempos.retiro;
    
        const ingresoAnualParaRetiro = ingresoTotalParaRetiro / tiempos.trabajo;
    
        const montos = {
            total: ingresoTotalParaRetiro,
            anual: ingresoAnualParaRetiro,
            mensual: ingresoAnualParaRetiro / 12,
            quincenal: ingresoAnualParaRetiro / 24,
            semanal: ingresoAnualParaRetiro / 48
        }

        mostrarResultados(montos.total, montos.anual, montos.mensual, montos.quincenal, montos.semanal);
    }
}

function mostrarResultados(total, anual, mensual, quincenal, semanal) {
    //Outputs de los resultado
    const montoTotal = document.getElementById('montoTotal');
    const montoAnual = document.getElementById('montoAnual');
    const montoMensual = document.getElementById('montoMensual');
    const montoQuincenal = document.getElementById('montoQuincenal');
    const montoSemanal = document.getElementById('montoSemanal');

    const fc = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    });

    montoAnual.innerHTML = fc.format(anual);
    montoTotal.innerHTML = fc.format(total);
    montoMensual.innerHTML = fc.format(mensual);
    montoQuincenal.innerHTML = fc.format(quincenal);
    montoSemanal.innerHTML = fc.format(semanal);
}