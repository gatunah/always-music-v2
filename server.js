const chalk = require("chalk");
const { Pool } = require("pg");

//CONFIG BD
const config = {
  user: "postgres",
  host: "localhost",
  database: "escuela_a_m",
  password: "admin",
  port: 5432,
};

const pool = new Pool(config);

//VALIDACION ARGS
const validateArgs = (args, lengthEsperado) => {
  if (args.length !== lengthEsperado) {
    throw new Error(`Número incorrecto de argumentos. Se esperaban ${lengthEsperado} y se recibieron ${args.length}`);
  }
};

//AGREGAR
const nuevo = async (args) => {
  validateArgs(args, 4);
  const [rut, nombre, curso, nivel] = args;

  try {
    const consulta = {
      text: "INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4)",
      values: [rut, nombre, curso, nivel],
    };
    await pool.query(consulta);
    console.log(chalk.white.bgGreen.bold(`Estudiante ${nombre} agregado con éxito`));
  } catch (e) {
    console.error(chalk.white.bgRed.bold(`Hubo un error al ingresar datos: ${e.message}`));
  }
};

//EDITAR
const editar = async (args) => {
  validateArgs(args, 4);
  const [rut, nombre, curso, nivel] = args;

  try {
    const consulta = {
      text: "UPDATE estudiante SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4",
      values: [nombre, curso, nivel, rut],
    };
    const result = await pool.query(consulta);
    if (result.rowCount === 0) {
      console.log(chalk.white.bgBlueBright.bold(`No hay estudiante con RUT ${rut}`));
    } else {
      console.log(chalk.white.bgGreen.bold(`Estudiante ${nombre} editado con éxito`));
    }
  } catch (e) {
    console.error(chalk.white.bgRed.bold(`Hubo un error al editar datos del estudiante: ${e.message}`));
  }
};

//BUSCAR POR RUT
const buscarPorRut = async (args) => {
  validateArgs(args, 1);
  const [rut] = args;

  try {
    const consulta = {
      text: "SELECT * FROM estudiante WHERE rut = $1",
      values: [rut],
      rowMode: "array", // ARRAY FORMAT
    };
    const result = await pool.query(consulta);
    if (result.rows.length === 0) {
      console.log(chalk.white.bgBlueBright.bold(`No se encontró estudiante con rut: ${rut}.`));
    } else {
      console.log(chalk.white.bgGreen.bold(`Estudiante encontrado:`));
      console.log(result.rows); 
    }
  } catch (e) {
    console.error(chalk.white.bgRed.bold(`Hubo un error al buscar al estudiante: ${e.message}`));
  }
};

//LISTAR - MOSTRAR TODOS
const listarEstudiantes = async () => {
  try {
    const result = await pool.query({
      text: "SELECT rut, nombre, curso, nivel FROM estudiante",
      rowMode: "array",
    });
    if (result.rows.length === 0) {
      console.log(chalk.white.bgBlueBright.bold(`No hay estudiantes registrados`));
    } else {
      console.log(chalk.white.bgGreen.bold(`Registros:`));
      console.log(result.rows); 
    }
  } catch (e) {
    console.error(chalk.white.bgRed.bold(`Hubo un error al buscar: ${e.message}`));
  }
};

//ELIMINAR
const eliminar = async (args) => {
  validateArgs(args, 1);
  const [rut] = args;

  try {
    const consulta = {
      text: "DELETE FROM estudiante WHERE rut = $1",
      values: [rut],
    };
    const result = await pool.query(consulta);
    if (result.rowCount === 0) {
      console.log(chalk.white.bgBlueBright.bold(`No hay estudiante con RUT ${rut}`));
    } else {
      console.log(chalk.white.bgGreen.bold(`Registro de estudiante con RUT ${rut} eliminado`));
    }
  } catch (e) {
    console.error(chalk.white.bgRed.bold(`Hubo un error al eliminar: ${e.message}`));
  }
};

//MAIN
const main = async () => {
  const args = process.argv.slice(2);
  const option = args[0]; // OPCION
  const argsFunction = args.slice(1); // ARGS

  try {
    switch (option) {
      case 'nuevo':
        await nuevo(argsFunction);
        break;
      case 'editar':
        await editar(argsFunction);
        break;
      case 'rut':
        await buscarPorRut(argsFunction);
        break;
      case 'consulta':
        await listarEstudiantes();
        break;
      case 'eliminar':
        await eliminar(argsFunction);
        break;
      default:
        console.log(chalk.bgMagenta.bold(`Opción "${option}" no válida.`));
        console.log(chalk.bgMagenta.bold(`Opciones válidas: nuevo, editar, rut, consulta, eliminar`));
    }
  } catch (e) {
    console.error(chalk.red.bold(`Error: ${e.message}`));
  } finally {
    await pool.end();
  }
};

main();
