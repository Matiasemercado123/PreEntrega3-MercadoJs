export const obtenerDoctores = async () => {
  try {
    // Verificar si ya hay datos en localStorage
    const doctoresGuardados = localStorage.getItem('doctores');
    if (doctoresGuardados) {
      return JSON.parse(doctoresGuardados);
    }

    // Si no hay datos en localStorage, obtenerlos del archivo JSON
    const respuesta = await fetch('./FrontEnd/productos.json');
    if (!respuesta.ok) throw new Error('Error al cargar el archivo JSON');
    const data = await respuesta.json();

    // Guardar los datos en localStorage
    localStorage.setItem('doctores', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error al cargar los doctores:', error);
    return [];
  }
};

