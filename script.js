
var name_regiones = [];
var name_provincias = [];
var name_comunas= [];
for (let index = 0; index < regiones.length; index++) {
    name_regiones[index] = regiones[index].name;
}
let listoption = document.getElementById('region');
for (let index = 0; index < regiones.length; index++) {
    let element = document.createElement('option');
    element.value=regiones[index].code;
    element.text=name_regiones[index];
    listoption.appendChild(element);
}

function secondselect(){
    document.getElementById("provincia").style.display = "block";
    document.getElementById("labelprov").style.display = "block";
    var codigo = document.getElementById('region').value;
    for (let index = 0; index < regiones.length; index++) {
        if(regiones[index].code == codigo){
            name_provincias=[];
            for (let index2 = 0; index2 < regiones[index].provinces.length; index2++) {
                name_provincias[index2] = regiones[index].provinces[index2];
            }
            let listoption2 = document.getElementById('provincia');
            document.getElementById('provincia').required = true;
            while (listoption2.firstChild) {
                listoption2.removeChild(listoption2.firstChild);
            }
            let selectchoise = document.createElement('option');
            selectchoise.disabled="disabled";
            selectchoise.selected="selected";
            selectchoise.text="Selecciona una Provincia";
            listoption2.appendChild(selectchoise);
            
            for (let index3 = 0; index3 < name_provincias.length; index3++) {
                let element2 = document.createElement('option');
                element2.value=name_provincias[index3].code;
                element2.text=name_provincias[index3].name;
                listoption2.appendChild(element2);
            }
        }
    }
}

function thirdselect(){
    document.getElementById("comuna").style.display = "block";
    document.getElementById("labelcomuna").style.display = "block";

    var codigoprovincia = document.getElementById('provincia').value;
    for (let index = 0; index < name_provincias.length; index++) {
        if(name_provincias[index].code == codigoprovincia){
            name_comunas=[];
            for (let index2 = 0; index2 < name_provincias[index].townships.length; index2++) {
                name_comunas[index2]=name_provincias[index].townships[index2];
            }
            let listoption3 = document.getElementById('comuna');
            while (listoption3.firstChild) {
                listoption3.removeChild(listoption3.firstChild);
            }
            let selectchoise2 = document.createElement('option');
            selectchoise2.disabled="disabled";
            selectchoise2.selected="selected";
            selectchoise2.text="Selecciona una Comuna";
            listoption3.appendChild(selectchoise2);
            for (let index3 = 0; index3 < name_comunas.length; index3++) {
                let element3 = document.createElement('option');
                element3.value=name_comunas[index3].code;
                element3.text=name_comunas[index3].name;
                listoption3.appendChild(element3);
            }
        }
        
    }
}

$('.page-alert').hide();
function alertas(id,delay){

    var alert = $('#alert-' + id);
    var timeOut;
    alert.appendTo('.page-alerts');
    alert.slideDown();
    //Autocerrado de Alerta
    var delay = delay;
    if(delay != undefined)
    {
        delay = parseInt(delay);
        clearTimeout(timeOut);
        timeOut = window.setTimeout(function() {
                alert.slideUp();
            }, delay);
    }
    //Cerrando Alerta Manual
    $('.page-alert .close').click(function(e) {
        e.preventDefault();
        $(this).closest('.page-alert').slideUp();
    });
}

// Example starter JavaScript for disabling form submissions if there are invalid fields

(function() {
'use strict';

window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

 /*   var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }
    , false);
    });
*/

//class
class Incidence {
    constructor(displayName, region, province, township, magnitude){
        this.displayName = displayName;
        this.region = region;
        this.province = province;
        this.township = township;
        this.magnitude = magnitude;
    }
}

//DOM Events
document.getElementById('form_incidencia')
    .addEventListener('submit',function(e){
        e.preventDefault();
        const n_register = document.getElementById('displayName').value;
        const n_region = document.getElementById('region').value;
        const n_province = document.getElementById('provincia').value;
        const n_township = document.getElementById('comuna').value;
        const n_magnitude = document.getElementById('magnitude').value;
        if ( n_register != '' && n_region != '' && n_province != '' && n_township != '' && n_magnitude != '' && n_township != 'Selecciona una Comuna') {
            let incidencia = new Incidence(n_register, n_region, n_province, n_township, n_magnitude);
            agregar(incidencia);
            alertas(1,3000);
            document.getElementById("provincia").style.display = "none";
            document.getElementById("labelprov").style.display = "none";
            document.getElementById("comuna").style.display = "none";
            document.getElementById("labelcomuna").style.display = "none";
            //document.getElementById("form_incidencia").reset()
    
    }
    }
);
    


  
  
//Carga de Incidencias    
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open('GET', 'https://testsebita.herokuapp.com/api/incidence', true);
req.onreadystatechange = function (aEvt) {
if (req.readyState == 4) {
    if(req.status == 200){
    let add_incidence = document.getElementById('test');
    for (let index = 0; index < req.response.incidences.length; index++) {
        var element = req.response.incidences[index];
        let add_element = document.createElement('div');
        add_element.className='form-group card text-center';
        for (let index1 = 0; index1 < regiones.length; index1++) {//hasta 15
                if (element.region==regiones[index1].code) {// Si el codigo almacenado es = al regiones.code 
                    for (let index2 = 0; index2 < regiones[index1].provinces.length; index2++) {
                        if (element.province==regiones[index1].provinces[index2].code) {// Si el codigo almacenado es = al regiones.province.code 
                            for (let index3 = 0; index3 < regiones[index1].provinces[index2].townships.length; index3++) {
                                if (element.township==regiones[index1].provinces[index2].townships[index3].code) {
                                    add_element.innerHTML = `
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <strong>Nombre del Registro </strong>: ${element.displayName}  <strong>Magnitud </strong>: ${element.magnitude}<br>
                                                <strong>Región </strong>: ${regiones[index1].name}
                                                <strong>Provincia </strong>: ${regiones[index1].provinces[index2].name}
                                                <strong>Comuna </strong>: ${regiones[index1].provinces[index2].townships[index3].name}
                                            </div>
                                            <div class="col-md-3" style="padding: 10px;">
                                                <button class="btn btn-sm btn-outline-warning">Modificar</button>
                                                <button onclick="borrar('${element._id}',this)" class="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>`;
                                    add_incidence.appendChild(add_element);
                                }
                            }
                        }   
                    }
                }
            }
        }
    }
    else
    alert("Error loading page\n");
}
};
req.send(null);

function agregar(incidencia){
    fetch('https://testsebita.herokuapp.com/api/incidence',{
        method: 'POST',
        body: JSON.stringify(incidencia),
        headers: {
            'Accept': 'application/json, text/plain , */* ',
            'Content-Type':'application/json'
        }})
    .then(function(response){
        let add_incidence = document.getElementById('test');
        return response.json();
    })
    /*.then(function(data){
        console.log('data = ',data);
    })*/
    .catch(function(err){
        console.log(err);
    })
}
function borrar(id,e){
    fetch('https://testsebita.herokuapp.com/api/incidence/'+id,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }})
    .then(function(response){
        alertas(2,3000)
        e.parentElement.parentElement.parentElement.parentElement.remove();
        //return response.json();
    })
    /*.then(function(data){
        console.log('data = ',data);
    })*/
    
    .catch(function(err){
        console.log(err);
    })
}