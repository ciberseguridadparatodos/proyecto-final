let carrito = [];
let total = 0;
let iva = 0;
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function mostrarVentana(id) {
  document.querySelectorAll('.container').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function validarLogin() {
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
  
  if (usuario === 'admin' && contrasena === 'admin' || usuarioEncontrado) {
    document.getElementById('navbar').style.display = 'flex';
    mostrarVentana('principal');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

function registrarUsuario() {
  const nuevoUsuario = document.getElementById('nuevoUsuario').value;
  const nuevoContrasena = document.getElementById('nuevoContrasena').value;
  if (nuevoUsuario && nuevoContrasena) {
    usuarios.push({ usuario: nuevoUsuario, contrasena: nuevoContrasena });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario registrado exitosamente');
    mostrarVentana('login');
  } else {
    alert('Por favor, completa todos los campos');
  }
}

function agregarAlCarrito(producto, precio, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    carrito.push({ producto, precio });
    total += precio;
  }
  iva = total * 0.13; 
  mostrarCarrito();
  mostrarPopup();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} - ¢${item.precio}`;
    listaCarrito.appendChild(li);
  });
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  iva = 0;
  mostrarCarrito();
}

function confirmarPedido() {
  const listaPedido = document.getElementById('listaPedido');
  listaPedido.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} - ¢${item.precio}`;
    listaPedido.appendChild(li);
  });
  const totalPedido = total + iva;
  document.getElementById('totalPedido').textContent = `Total: ¢${totalPedido}`;
  document.getElementById('ivaPedido').textContent = `IVA (13%): ¢${iva}`;
  mostrarMontoTotal(); // Añadido para mostrar el monto total antes de confirmar
}

function mostrarPopup() {
  document.getElementById('popupProducto').classList.add('active');
}

function cerrarPopup() {
  document.getElementById('popupProducto').classList.remove('active');
}

function mostrarFormularioTarjeta() {
  const tipoPago = document.getElementById('tipoPago').value;
  if (tipoPago === 'tarjeta') {
    document.getElementById('formularioTarjeta').style.display = 'block';
  } else {
    document.getElementById('formularioTarjeta').style.display = 'none';
  }
  mostrarMontoTotal(); // Añadido para recalcular el monto total
}

function mostrarMontoTotal() {
  const tipoPago = document.getElementById('tipoPago').value;
  let montoFinal = total + iva;

  if (tipoPago === 'tarjeta') {
    montoFinal += total * 0.02; 
  }

  document.getElementById('montoTotal').textContent = `Monto a Pagar: ¢${montoFinal}`;
  document.getElementById('ivaTotal').textContent = `IVA (13%): ¢${iva}`;
  document.getElementById('recojoEnTienda').textContent = tipoPago === 'efectivo' ? 'Opción de entrega: Recoger en tienda' : 'Opción de entrega: Enviar a domicilio';
}

function procesarPago() {
  const tipoPago = document.getElementById('tipoPago').value;
  let montoFinal = total + iva;

  if (tipoPago === 'tarjeta') {
    montoFinal += total * 0.02; 
  }

  alert('Pago procesado exitosamente por un monto de: ¢' + montoFinal);
  carrito = [];
  total = 0;
  iva = 0;
  mostrarCarrito();
  mostrarMontoTotal(); // Resetea el monto total después del pago
}
