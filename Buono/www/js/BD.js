var base_datos = {
    bd:null,
    createDB: function(){
        //compara en que esta creando la base de datos 
        if(window.cordova.platformId === 'browser'){
            this.bd = window.openDatabase('reserva.db','1.0','Inventario', 1000);
        }else{
            this.bd = window.sqlitePlugin.openDatabase({
                name:'reserva.db',
                location:'default'
            });
        }
        this.bd.transaction(
            function(tx){
                    // crea la base de datos, si no
                    tx.executeSql('CREATE TABLE IF NOT EXISTS reserva(id integer primary key, nombre text,email text, telefono integer)',[],
                    function(tx,resultado){
                        alert("la base de datos ha sido creada");
                    },
                    function(tx,error){
                        alert("no se creo la base de datos, verifica la funcion");
                    }
                );
            }
        );
    },
    function(error){
        console.log("no funciono"+ error.message);
    },
    function(){
        console.log("servicio funcionando");
    }
}