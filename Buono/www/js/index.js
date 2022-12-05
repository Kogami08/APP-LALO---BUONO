var cursor ={
    id: -1,
    nombre: "",
    email: "",
    telefono: -1
}
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    base_datos.createDB();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $("#lstProducts")

    //Agregamos al inicio de todo que utilice la funcion y entre al ul o lista para solo mandar a imprimir
    base_datosReserva.createDB();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $("#lstProductsEspecial")
}

        //ACONTINUACION SE ENCUENTRAN TODAS LAS FUNCIONES QUE SON REQUERIDAS

function addProducto(){
    var nombre = $('#txtName').val();
    var email = $('#txtEmail').val();
    var telefono = $('#txtTelefono').val();
    
    //POR ESTA PARTE ESTA LA COMPROBACION
    
    if(nombre == null || nombre==""){
        alert("Favor de agregar el nombre");
    }else if(email == null || email==""){
        alert("Favor de agregar el email");
    }else if (telefono < 0 || telefono==null){
        alert("Ingresa cantidad valida");
    }else{
        productos.addProduct(nombre,email,telefono);
        $('#txtName').val("");
        $('#txtEmail').val("");
        $('#txtTelefono').val("");
        
    }
}


    function mostrarProducto(resultado){ //recibe resultado
        var length = resultado.rows.length; //tamaño maximo
        var lstProducts = $('#lstProducts');
        lstProducts.empty();
        
        for (var i=0; i<length; i++){
            var item = resultado.rows.item(i); //cursores
            console.log(item);
            var a = $('<a />');
            var h3 = $('<h3 />').text("Nombre del persona: "); //concatena con "." en su propiedad texto y lo asigna
            var h2 = $('<h2 />').text("Email de la persona: ");
            var h4 = $('<h4 />').text("Telefono: ");
            var p = $('<p />').text("Id:");
            
            var span1 = $('<span />').text(item.nombre); //propiedad item recorre los valores / .nombre -> nombre de la columna
            span1.attr("name","nombre");
            
            var span4 = $('<span />').text(item.email); 
            span4.attr("name","email");

            var span2 = $('<span />').text(item.telefono);
            span2.attr("name","telefono");
            
            var span3 = $('<span />').text(item.id); 
            span3.attr("name","id");
            
            h3.append(span1);
            h2.append(span4); //concatena
            h4.append(span2);
            p.append(span3);
            
            a.append(h4);
            a.append(h3);
            a.append(h2);
            a.append(p);
            
            var lista= $('<li/>');
            lista.attr("data-filter",item.nombre); //filtro "item.nombre" individual
            lista.append(a);
            lstProducts.append(lista);
        }
        lstProducts.listview("refresh");
        lstProducts.on("tap","li", function(){
            cursor.id = $(this).find("[name='id']").text();
            cursor.nombre = $(this).find("[name='nombre']").text();
            cursor.email = $(this).find("[name='email']").text();
            cursor.telefono = $(this).find("[name='telefono']").text();
            $("#popupUpdateDelete").popup("open");
        });
    }


$(document).on("pagebeforeshow", "#loadpage", function(){ //evento
    productos.loadProduct(mostrarProducto);
});



function deleteProduct(){
    var respuesta = confirm("deseas eliminar el producto?");
    alert(cursor.id);
    if(respuesta){
        productos.deleteProduct(cursor.id);
        productos.loadProduct(mostrarProducto);
    }
    $("#popupUpdateDelete").popup("close");
}
//
$(document).on("pagebeforeshow", "#updatedialog", function(){ //evento
    $("#txtNewName").val(cursor.nombre);
    $("#txtNewEmail").val(cursor.email);
    $("#txtNewTelefono").val(cursor.telefono);
});





function updateProduct(){
    var nuevonombre = $("#txtNewName").val();
    var nuevoemail = $("#txtNewEmail").val();
    var nuevotelefono = $("#txtNewTelefono").val();
    productos.updateProduct(cursor.id, nuevonombre,nuevoemail, nuevotelefono);
    $("#updatedialog").dialog("close");
}
//ACA TERMINAN LAS FUNCIONES DE LOADPAGE Y ADDPAGE





//INICIAMOS AHORA loadPageEspecial y AddpageEspecial
function addProductoEspecial(){
    var nombre = $('#txtNameEs').val();
    var telefono = $('#txtTelefonoEs').val();
    
    //POR ESTA PARTE ESTA LA COMPROBACION o validaciones de campos
    
    if(nombre == null || nombre==""){
        alert("Favor de agregar el nombre");
    }else if (telefono < 0 || telefono==null){
        alert("Ingresa un numero valido");
    }else{
        productosEspecial.addProduct(nombre,telefono);
        
        $('#txtNameEs').val("");
        $('#txtTelefonoEs').val("");
        
    }
    
    // aqui terminamos nuestras validaciones
}


    function mostrarProductoEspecial(resultado){ //recibe resultado
        var length = resultado.rows.length; //tamaño maximo
        var lstProductsEspecial = $('#lstProductsEspecial');
        lstProductsEspecial.empty();
        
        for (var i=0; i<length; i++){
            var item = resultado.rows.item(i); //cursores
            console.log(item);
            var a = $('<a />');
            var h3 = $('<h3 />').text("Nombre del persona: "); //concatena con "." en su propiedad texto y lo asigna
            var h4 = $('<h4 />').text("Telefono: ");
            var p = $('<p />').text("Id:");
            
            var span1 = $('<span />').text(item.nombre); //propiedad item recorre los valores / .nombre -> nombre de la columna
            span1.attr("name","nombre");
            
            var span2 = $('<span />').text(item.telefono);
            span2.attr("name","telefono");
            
            var span3 = $('<span />').text(item.id); 
            span3.attr("name","id");
            
            h3.append(span1); //concatena
            h4.append(span2);
            p.append(span3);
            
            a.append(h4);
            a.append(h3);
            a.append(p);
            
            var lista= $('<li/>');
            lista.attr("data-filter",item.nombre); //filtro "item.nombre" individual
            lista.append(a);
            lstProductsEspecial.append(lista);
        }
        lstProductsEspecial.listview("refresh");
        lstProductsEspecial.on("tap","li", function(){
            cursor.id = $(this).find("[name='id']").text();
            cursor.nombre = $(this).find("[name='nombre']").text();
            cursor.telefono = $(this).find("[name='telefono']").text();
            $("#popupUpdateDeleteEspecial").popup("open");
        });
    }


$(document).on("pagebeforeshow", "#loadespecial", function(){ //evento
    productosEspecial.loadProduct(mostrarProductoEspecial);
});



function deleteProductEspecial(){
    var respuesta = confirm("deseas eliminar el cliente?");
    alert(cursor.id);
    if(respuesta){
        productosEspecial.deleteProduct(cursor.id);
        productosEspecial.loadProduct(mostrarProductoEspecial);
    }
    $("#popupUpdateDeleteEspecial").popup("close");
}



//
$(document).on("pagebeforeshow", "#updatedialogEspecial", function(){ //evento
    $("#txtNewNameEs").val(cursor.nombre);
    $("#txtNewTelefonoEs").val(cursor.telefono);
});


function updateProductEspecial(){
    var nuevonombre = $("#txtNewNameEs").val();
    var nuevotelefono = $("#txtNewTelefonoEs").val();
    productosEspecial.updateProduct(cursor.id, nuevonombre, nuevotelefono);
    $("#updatedialogEspecial").dialog("close");
}