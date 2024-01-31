import { useState, useEffect } from "react";
import io from "socket.io-client";
import LoginComponent from "./components/LoginComponent";
import ChatComponent from "./components/ChatComponent";

// Inicializa el socket conectándose al servidor de Socket.IO.
const socket = io("http://localhost:5170", {
  withCredentials: false,
  timeout: 2000, // Tiempo de espera para la conexión inicial de 2 segundos.
});

function App() {
  const [alias, setAlias] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Escucha el evento 'connectionSuccess' del servidor.
    socket.on("connectionSuccess", () => {
      setLoggedIn(true);
      setLoginError("");
    });

    // Escucha el evento 'error' para errores de conexión específicos de la aplicación.
    socket.on("error", (errorMessage) => {
      setLoginError(errorMessage);
      setLoggedIn(false);
    });

    // Escucha el evento 'connect_error' para errores generales de conexión.
    socket.on("connect_error", (error) => {
      alert("Error: Servidor caido, intenta mas tarde.");
      console.error("Error de conexión:", error);
    });

    // Limpieza de los listeners al desmontar el componente.
    return () => {
      socket.off("connectionSuccess");
      socket.off("error");
      socket.off("connect_error");
    };
  }, []);

  const handleLogin = (userAlias) => {
    setLoginError("");
    setAlias(userAlias);
    socket.emit("connectUser", { alias: userAlias });
  };

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
