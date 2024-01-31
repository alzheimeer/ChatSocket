import { useState } from "react";
import PropTypes from "prop-types";

// El componente LoginComponent maneja el formulario de inicio de sesión.
function LoginComponent({ onLogin, errorMessage }) {
  // Estado para almacenar el alias ingresado por el usuario.
  const [alias, setAlias] = useState("");

  // Función que se ejecuta cuando se envía el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario.
    onLogin(alias); // Llama a la función onLogin pasada como prop con el alias ingresado.
  };

  // JSX del componente
  return (
    // Formulario para el inicio de sesión.
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-slate-300"
    >
      {/* Título del formulario */}
      <h1 className="text-sky-700 text-xl pb-8">BIENVENIDO A CHAT&</h1>

      {/* Campo de entrada para el alias del usuario */}
      <input
        name="alias"
        id="alias"
        type="text"
        value={alias}
        onChange={(e) => setAlias(e.target.value)} // Actualiza el estado alias con el valor ingresado.
        placeholder="Ingrese su alias/usuario"
        className="hover:rotate-3 duration-200 px-4 py-2 border rounded shadow-lg focus:ring-blue-500 focus:ring-2 focus:outline-none"
        required
      />

      {/* Botón para enviar el formulario */}
      <button
        className="mt-4 py-0.5 px-1.5 font-bold transition-colors bg-sky-500 text-white rounded hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        type="submit"
      >
        Ingresar
      </button>

      {/* Mensaje de error si existe */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

// PropTypes para validar las props del componente
LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired, // Función para manejar el inicio de sesión.
  errorMessage: PropTypes.string, // Mensaje de error para mostrar si hay alguno.
};

export default LoginComponent;
