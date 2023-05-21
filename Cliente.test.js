const { sendMessage } = require('./Cliente');
const { 
  iniciarServidor,
  stopServidor
} = require('./Servidor')

beforeAll(()=>{
  iniciarServidor();
});

afterAll(() => {
  stopServidor();
});

test('Cliente envia mensaje y recibe respuesta', (done) => {
  sendMessage('Hola, servidor!', (response) => {
    expect(response).toBe('Respuesta del servidor');
    done();
  });
});

test('FECHA', (done) => {
  resultado = "21-5-2023"
  sendMessage('FECHA', (response) =>{
    expect(response).toBe(resultado);
    done();
  });
});

test('HORA', (done) => {
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  resultado = hora + ":" + minutos;
  sendMessage('HORA', (response) =>{
    expect(response).toBe(resultado);
    done();
  });
});
