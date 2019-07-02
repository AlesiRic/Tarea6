var mongoose=require('mongoose');
var schema=require('./modelo');

mongoose.connect('mongodb://localhost:27017/Libros');

var Libro=mongoose.model('Libro',schema,'Libros');

function insertar(){
    var libro=new Libro({
        title:'Harry Potter y las reliquias de la muerte',
        author:'J. K. Rowling',
        body:'Harry y sus amigos intentan derrotar a Voldemort',
        comments:[{body:'AAA',date:Date.now()}],
        meta:{votes:9,fabs:5}
    });
    Libro.create(libro,function(error){
        if(error){
            console.log(error);
            process.exit(1);
        }
        console.log("Saved Book!");
    });
}

function actualizar(){
    Libro.updateOne({title:'Harry Potter y las reliquias de la muerte'},
        {$push:{author:'Joanne Rowling'}}
    ).catch(function(error,affected,resp){
        console.log(error);
    });
}

function eliminar(){
    Libro.deleteOne({title:'Harry Potter y las reliquias de la muerte'})
    .catch(function(error,affected,resp){
        console.log(error);
    });
}

function verTodos(){
    Libro.find({},"",function(err,docs){
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    });
}

function verUno(){
    Libro.findOne({ title: 'Harry Potter y las reliquias de la muerte' }, function (err, doc) {
        if(err){
            console.log(err);
        }else{
            console.log(doc);
        }
    });

}

module.exports.insertar=insertar;
module.exports.actualizar=actualizar;
module.exports.eliminar=eliminar;
module.exports.verTodos=verTodos;
module.exports.verUno=verUno;
