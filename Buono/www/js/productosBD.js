var productos = {
    addProduct:function(nombre,email,telefono){
        base_datos.bd.transaction( //variable, transaccion
            function(tx){
                tx.executeSql("INSERT INTO reserva(nombre, email, telefono) values (?1,?2,?3)",[nombre,email,telefono], //evita sql inyection
                function(tx,resultado){
                    alert("El reserva se añadio correctamente");
                },
                function(tx,error){
                    alert("El reserva no se añadio, revisa los parametros o la coneccion");
                }
                );
            },
            function(error){
                console.log("Tenemos un problema" + error.message)
            },
            function(){
                console.log("Todo va bien");
            }
        );
    },
    deleteProduct:function(id){
        base_datos.bd.transaction(
            function(tx){
                tx.executeSql("DELETE from reserva where id = ?1",[id],
                function(tx,resultado){
                    alert("El reserva se elimino correctamente");
                },
                function(tx,error){
                    alert("El reserva no se elimino, revisa los parametros o la coneccion");
                }
                );
            },
            function(error){
                console.log("Tenemos un problema" + error.message)
            },
            function(){
                console.log("Todo va bien");
            }
        );
    },
    updateProduct:function(id,nombre,email,telefono){
        base_datos.bd.transaction(
            function(tx){
                tx.executeSql("UPDATE reserva SET nombre=?1, email=?2, telefono=?3 where id=?4",[nombre,email,telefono,id],
                function(tx,resultado){
                    alert("El reserva se actualizó correctamente");
                },
                function(tx,error){
                    alert("El reserva no se actualizó, revisa los parametros o la coneccion");
                }
                );
            },
            function(error){
                console.log("Tenemos un problema" + error.message)
            },
            function(){
                console.log("Todo va bien");
            }
        );
    },
    loadProduct:function(mostrarProducto){
        base_datos.bd.transaction(
            function(tx){
                tx.executeSql("SELECT * FROM reserva",[],
                function(tx,resultado){
                    mostrarProducto(resultado)
                },
                function(tx,error){
                    alert("El reserva no se actualizó, revisa los parametros o la coneccion");
                }
                );
            },
            function(error){
                console.log("Tenemos un problema" + error.message)
            },
            function(){
                console.log("Todo va bien");
            }
        );
    }
}