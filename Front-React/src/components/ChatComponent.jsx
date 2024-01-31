import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MessageComponent from "./MessageComponent";
import UserListComponent from "./UserListComponent";

function ChatComponent({ alias, socket }) {
  // Estados para manejar usuarios, mensajes, mensaje actual, usuario seleccionado y nuevos mensajes
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessagesFrom, setNewMessagesFrom] = useState({});

  useEffect(() => {
    // Función para actualizar los mensajes y guardarlos en localStorage
    const updateMessagesAndSave = (newMessage) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        const allMessages =
          JSON.parse(localStorage.getItem("chatMessages")) || {};
        allMessages[alias] = updatedMessages;
        localStorage.setItem("chatMessages", JSON.stringify(allMessages));
        return updatedMessages;
      });
    };

    // Cargar mensajes guardados para el usuario actual al iniciar el componente
    const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const savedMessages = allMessages[alias] || [];
    setMessages(savedMessages);

    // Manejar la lista de usuarios conectados
    socket.on("usersList", (connectedUsers) => {
      setUsers(connectedUsers);
    });

    // Manejar mensajes enviados a todos los usuarios
    socket.on("messageFromServerToAll", (message) => {
      updateMessagesAndSave({ ...message, isPrivate: false });
    });

    // Manejar mensajes privados dirigidos a este usuario
    socket.on("privateMessage", (message) => {
      updateMessagesAndSave({ ...message, isPrivate: true });
      if (message.senderAlias !== alias) {
        setNewMessagesFrom((prev) => ({
          ...prev,
          [message.senderAlias]: true,
        }));
      }
    });

    // Mostrar alertas de error
    socket.on("error", (errorMessage) => {
      alert(errorMessage);
    });

    // Actualizar la lista de usuarios cuando uno se desconecta
    socket.on("userDisconnected", (userAlias) => {
      setUsers((users) => users.filter((user) => user !== userAlias));
    });

    // Limpiar listeners cuando el componente se desmonte
    return () => {
      socket.off("usersList");
      socket.off("messageFromServerToAll");
      socket.off("privateMessage");
      socket.off("error");
      socket.off("userDisconnected");
    };
  }, [socket, alias]);

  // Función para manejar la tecla Enter en el campo de entrada
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentMessage && selectedUser) {
      sendMessage();
    }
  };

  // Función para enviar mensajes
  const sendMessage = () => {
    if (selectedUser) {
      const messageData = {
        recipientAlias: selectedUser,
        message: currentMessage,
      };
      socket.emit("sendMessage", messageData);
      setCurrentMessage("");
    }
  };

  // Función para manejar la selección de un usuario
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewMessagesFrom((prev) => ({ ...prev, [user]: false }));
  };

  // JSX del componente
  return (
    <div className="flex h-screen bg-slate-300 max-w-7xl justify-between mx-auto">
      {/* Columna de Lista de Usuarios */}
      <div className="w-1/8 bg-slate-800 text-white h-screen overflow-auto p-4 border-r min-w-40 min-h-screen text-center">
        <UserListComponent
          users={users}
          onSelectUser={handleSelectUser}
          currentUserAlias={alias}
          newMessagesFrom={newMessagesFrom}
        />
      </div>

      {/* Columna de Mensajes */}
      <div className="flex-1 flex flex-col">
        {/* Área de Mensajes */}
        <div className="overflow-auto p-4 flex-1 w-full">
          {messages.map((msg) => (
            <MessageComponent
              key={msg.senderAlias + msg.timestamp}
              message={msg}
              isOwnMessage={msg.senderAlias === alias}
            />
          ))}
        </div>

        {/* Área de Entrada de Mensaje */}
        <div className="p-4 border-t bg-slate-800 flex">
          <input
            name="message"
            id="message"
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder={
              selectedUser
                ? `Escribir a ${selectedUser}`
                : "Seleccione un usuario para chatear"
            }
            className="flex-1 text-sm px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-slate-500"
            disabled={!selectedUser}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            disabled={!selectedUser || !currentMessage}
            className="ml-2 w-20 mt-2 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

ChatComponent.propTypes = {
  alias: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
};

export default ChatComponent;
