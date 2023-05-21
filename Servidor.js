const net = require('net');

module.exports = {
	getNumeroDePuerto,
	iniciarServidor,
	stopServidor
}

let server;

function iniciarServidor(){
	server = net.createServer((socket) => {
    socket.on('data', (data) => {
    	if(data == 'FECHA'){
    		const fechaActual = new Date();
				const anio = fechaActual.getFullYear();
				const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se agrega 1
				const dia = fechaActual.getDate();
				const fechaFormateada = dia + "-" + mes + "-" + anio;
				socket.write(fechaFormateada);
    	}
    	else if(data == 'HORA'){
    		const fechaActual = new Date();
  			const hora = fechaActual.getHours();
  			const minutos = fechaActual.getMinutes();
  			const horaFormateada = hora + ":" + minutos;
  			socket.write(horaFormateada);
    	}
    	else{
				socket.write('Respuesta del servidor');
			}
    });
  });

  server.listen(16050, '127.0.0.1')
};

function stopServidor(){
	server.close();
};

function getNumeroDePuerto(grupo,posicion){
	return (16000) + (10 * (grupo + posicion))
};