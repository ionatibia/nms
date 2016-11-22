require("./model.js");
var mongoose = require("mongoose");
var Dato = mongoose.model('Dato');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org');

client.on('connect', function () {
    client.subscribe('led');
    client.publish('led', 'Hello mqtt');
});

client.on('message', function (topic, message) {
    var men = message.toString();
    if(men.indexOf('**') != -1){
      var datoArray = men.split('**');
      var dato = new Dato({'nombre':datoArray[0],'valor':datoArray[1]})
      dato.save(function (err) {
        if(err){
          client.publish("led","error "+err);
        }else{
          var str = "Guardado valor "+dato.valor+ " de "+dato.nombre;
          client.publish("led",str);
        }
      })
    }
    console.log(men)
    if(men == 'status'){
      Dato.find(function (err,data) {
        if(err){
          client.publish("led","error "+err);
        }else{
          client.publish("led",JSON.stringify(data))
        }
      })
    }
    //client.end();
});



mongoose.connect("mongodb://localhost:27017/mqtt",function(error,db){
        if(!error){
         console.log("We are connected");   
        }
        else{
         console.dir(error);            
        }
});
