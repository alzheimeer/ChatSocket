import { useState, useEffect } from "react";
import io from "socket.io-client";
import LoginComponent from "./components/LoginComponent";
import ChatComponent from "./components/ChatComponent";

// Inicializa el socket conectándose al servidor de Socket.IO.
const socket = io("http://localhost:5170");

function App() {
  // Estados para manejar el alias del usuario, el estado de inicio de sesión y los errores de inicio de sesión.
  const [alias, setAlias] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Escucha el evento 'connectionSuccess' del servidor.
    socket.on("connectionSuccess", () => {
      setLoggedIn(true); // Marca al usuario como logueado.
      setLoginError(""); // Limpia cualquier mensaje de error previo.
    });

    // Escucha el evento 'error' para errores de conexión.
    socket.on("error", (errorMessage) => {
      setLoginError(errorMessage); // Configura el mensaje de error.
      setLoggedIn(false); // Asegura que el usuario no esté marcado como logueado.
    });

    // Limpieza de los listeners al desmontar el componente.
    return () => {
      socket.off("error");
      socket.off("connectionSuccess");
    };
  }, []);

  // Maneja el intento de inicio de sesión.
  const handleLogin = (userAlias) => {
    setLoginError(""); // Limpia el mensaje de error cuando se intenta un nuevo inicio de sesión.
    setAlias(userAlias); // Establece el alias del usuario.
    socket.emit("connectUser", { alias: userAlias }); // Emite el evento de inicio de sesión al servidor.
  };

  // Renderiza el componente de inicio de sesión o el componente del chat según el estado de inicio de sesión.
  return (
    <div className="bg-slate-200">
      {!loggedIn ? (
        <LoginComponent onLogin={handleLogin} errorMessage={loginError} />
      ) : (
        <ChatComponent alias={alias} socket={socket} />
      )}
    </div>
  );
}

export default App;
