import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MessageComponent from "./MessageComponent";
import UserListComponent from "./UserListComponent";
import styles from "./ChatComponent.module.css";

function ChatComponent({ alias, socket }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Estado para manejar el usuario seleccionado

  useEffect(() => {
    socket.on("usersList", (connectedUsers) => {
      setUsers(connectedUsers);
    });

    socket.on("messageFromServerToAll", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, isPrivate: false },
      ]);
    });

    // Escuchar mensajes privados dirigidos a este usuario
    socket.on("privateMessage", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, isPrivate: true },
      ]);
    });

    // Escuchar errores
    socket.on("error", (errorMessage) => {
      alert(errorMessage); // Mostrar el error al usuario de alguna manera
    });

    // Asegúrate de limpiar este efecto para evitar problemas de memoria
    return () => {
      socket.off("usersList");
      socket.off("messageFromServerToAll");
      socket.off("privateMessage");
      socket.off("error");
    };
  }, [socket]);

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

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userList}>
        <UserListComponent
          users={users}
          onSelectUser={setSelectedUser}
          currentUserAlias={alias}
        />
      </div>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <MessageComponent
            key={index}
            message={msg}
            isOwnMessage={msg.senderAlias === alias}
          />
        ))}
      </div>
      <div className={styles.chatBox}>
        <input
          type="text"
          className={styles.inputMessage}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={
            selectedUser
              ? `Escribir a ${selectedUser}`
              : "Seleccione un usuario para chatear"
          }
          disabled={!selectedUser}
        />
        <button
          onClick={sendMessage}
          disabled={!selectedUser || !currentMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

ChatComponent.propTypes = {
  alias: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
};

export default ChatComponent;