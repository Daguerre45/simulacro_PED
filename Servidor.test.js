const net = require('net');
const { 
	getNumeroDePuerto,
	iniciarServidor,
	stopServidor
} = require('./Servidor')

beforeAll(()=>{
	iniciarServidor();
});

afterAll(() => {
	stopServidor();
});

test("Numero de Puerto", ()=> {
	grupo = 4
	posicion = 1
	resultado = (16000) + (10 * (grupo + posicion))
	expect(getNumeroDePuerto(grupo,posicion)).toBe(resultado)
});

test("El servidor responde", (done)=> {
	const client = net.createConnection({ port:16050 }, () =>{
		client.write('HOLA');
	});

	client.on('data',(data) => {
		expect(data.toString()).toBe('Respuesta del servidor')
		client.end()
		done()
	});
});

test("El servidor responde HORA", (done)=> {
	const client = net.createConnection({ port:16050 }, () =>{
		client.write('HORA');
	});

	client.on('data',(data) => {
		const fechaActual = new Date();
  		const hora = fechaActual.getHours();
  		const minutos = fechaActual.getMinutes();
  		resultado = hora + ":" + minutos;
		expect(data.toString()).toBe(resultado)
		client.end()
		done()
	});
});

test("El servidor responde FECHA", (done)=> {
	const client = net.createConnection({ port:16050 }, () =>{
		client.write('FECHA');
	});

	client.on('data',(data) => {
		const fechaActual = new Date();
		const anio = fechaActual.getFullYear();
		const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se agrega 1
		const dia = fechaActual.getDate();
		const fechaFormateada = dia + "-" + mes + "-" + anio;
		expect(data.toString()).toBe(fechaFormateada)
		client.end()
		done()
	});
});
