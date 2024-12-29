import { obtenerDoctores } from '../js/app1.js';

const especialidadSelect = document.getElementById('especialidad-select');
const doctorSelect = document.getElementById('doctor-select');
const turnoInput = document.getElementById('turno-input');
const asignarBtn = document.getElementById('asignar-btn');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const estadisticasOutput = document.getElementById('estadisticas-output');

// Recuperar datos desde localStorage
const obtenerDoctoresDesdeStorage = () => {
  const doctoresGuardados = localStorage.getItem('doctores');
  return doctoresGuardados ? JSON.parse(doctoresGuardados) : [];
};

// Llenar selectores dinámicamente
const llenarEspecialidades = (doctores) => {
  const especialidades = [...new Set(doctores.map(doc => doc.especialidad))];
  especialidades.forEach(especialidad => {
    const option = document.createElement('option');
    option.value = especialidad;
    option.textContent = especialidad;
    especialidadSelect.appendChild(option);
  });
};

const llenarDoctores = (doctores, especialidad) => {
  doctorSelect.innerHTML = '<option value="">Seleccione un doctor</option>';
  const filtrados = doctores.filter(doc => doc.especialidad === especialidad);
  filtrados.forEach(doctor => {
    const option = document.createElement('option');
    option.value = doctor.nombre + ' ' + doctor.apellido;
    option.textContent = `${doctor.nombre} ${doctor.apellido}`;
    doctorSelect.appendChild(option);
  });
  doctorSelect.disabled = false;
};

// Mostrar resultado con SweetAlert
const mostrarResultado = (mensaje, icono = 'success') => {
  Swal.fire({
    title: 'Resultado',
    text: mensaje,
    icon: icono,
    confirmButtonText: 'Aceptar',
    background: '#fefefe',
    customClass: {
      popup: 'shadow-lg',
    },
  });
};

// Inicializar el simulador
const iniciarSimulador = async () => {
  const doctores = await obtenerDoctores();
  if (doctores.length === 0) return;
  llenarEspecialidades(doctores);

  especialidadSelect.addEventListener('change', () => {
    const especialidad = especialidadSelect.value;
    llenarDoctores(doctores, especialidad);
  });

  asignarBtn.addEventListener('click', () => {
    const doctor = doctorSelect.value;
    const turno = turnoInput.value;
    const mensaje = doctor && turno
      ? `Turno reservado con ${doctor} a las ${turno}`
      : 'Por favor selecciona un doctor y un turno válido.';
    mostrarResultado(mensaje, doctor && turno ? 'success' : 'error');
  });

  reiniciarBtn.addEventListener('click', () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto reiniciará el simulador y eliminará los datos almacenados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reiniciar',
      cancelButtonText: 'Cancelar',
      background: '#fefefe',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('doctores');
        location.reload();
      }
    });
  });
};

// Ejecutar el simulador al cargar la página
document.addEventListener('DOMContentLoaded', iniciarSimulador);