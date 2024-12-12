// Variables y datos iniciales
let turnos = JSON.parse(localStorage.getItem("turnos")) || [
  { hora: "14:00", estado: "disponible" },
  { hora: "16:00", estado: "disponible" },
  { hora: "18:00", estado: "disponible" },
  { hora: "20:00", estado: "disponible" },
];

// Elementos del DOM
const turnosList = document.getElementById("turnos-list");
const inputHora = document.getElementById("input-hora");
const btnReservar = document.getElementById("btn-reservar");
const btnEstadisticas = document.getElementById("btn-estadisticas");
const btnReiniciar = document.getElementById("btn-reiniciar");
const estadisticasOutput = document.getElementById("estadisticas-output");

// Funciones
function renderizarTurnos() {
  turnosList.innerHTML = "";
  turnos.forEach((turno) => {
    const li = document.createElement("li");
    li.textContent = `${turno.hora} - ${turno.estado}`;
    li.className = turno.estado === "disponible" ? "disponible" : "reservado";
    turnosList.appendChild(li);
  });
}

function guardarEnStorage() {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}

function reservarTurno() {
  const hora = inputHora.value.trim();
  const turno = turnos.find((t) => t.hora === hora);

  if (turno && turno.estado === "disponible") {
    turno.estado = "reservado";
    guardarEnStorage();
    renderizarTurnos();
    inputHora.value = "";
  } else {
    alert("❌ Turno no disponible o ya reservado.");
  }
}

function mostrarEstadisticas() {
  const totalTurnos = turnos.length;
  const turnosReservados = turnos.filter((t) => t.estado === "reservado").length;
  const turnosDisponibles = totalTurnos - turnosReservados;

  estadisticasOutput.innerHTML = `
    <p>Total Turnos: ${totalTurnos}</p>
    <p>Turnos Reservados: ${turnosReservados}</p>
    <p>Turnos Disponibles: ${turnosDisponibles}</p>
  `;
}

function reiniciarSimulador() {
  turnos = [
    { hora: "14:00", estado: "disponible" },
    { hora: "16:00", estado: "disponible" },
    { hora: "18:00", estado: "disponible" },
    { hora: "20:00", estado: "disponible" },
  ];
  guardarEnStorage();
  renderizarTurnos();
  estadisticasOutput.innerHTML = "";
  inputHora.value = "";
  alert("🔄 Simulador reiniciado con éxito.");
}

// Eventos
btnReservar.addEventListener("click", reservarTurno);
btnEstadisticas.addEventListener("click", mostrarEstadisticas);
btnReiniciar.addEventListener("click", reiniciarSimulador);

// Render inicial
renderizarTurnos();
