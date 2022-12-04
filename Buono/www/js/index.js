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
}

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
        reservas.addProduct(nombre,email,telefono);
        
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
            var h3 = $('<h3 />').text("Email de la persona: ");
            var h4 = $('<h4 />').text("Telefono");
            var p = $('<p />').text("Id:");
            
            var span1 = $('<span />').text(item.nombre); //propiedad item recorre los valores / .nombre -> nombre de la columna
            span1.attr("name","nombre");
            
            var span4 = $('<span />').text(item.email); //propiedad item recorre los valores / .nombre -> nombre de la columna
            span1.attr("name","email");

            var span2 = $('<span />').text(item.telefono);
            span2.attr("name","telefono");
            
            var span3 = $('<span />').text(item.id); 
            span3.attr("name","id");
            
            h3.append(span1);
            h3.append(span4); //concatena
            h4.append(span2);
            p.append(span3);
            
            a.append(h4);
            a.append(h3);
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
    reservas.loadProduct(mostrarProducto);
});

function deleteProduct(){
    var respuesta = confirm("deseas eliminar el producto?");
    alert(cursor.id);
    if(respuesta){
        reservas.deleteProduct(cursor.id);
        reservas.loadProduct(mostrarProducto);
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
    reservas.updateProduct(cursor.id, nuevonombre, nuevoemail, nuevotelefono);
    $("#updatedialog").dialog("close");
}