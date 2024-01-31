import PropTypes from "prop-types";

// MessageComponent es un componente que representa un mensaje individual en el chat.
function MessageComponent({ message, isOwnMessage }) {
  // Renderiza el mensaje en un div.
  // La apariencia del mensaje cambia según si es un mensaje propio o de otro usuario.
  return (
    <div
      className={`max-w-80 my-2 p-4 rounded-lg shadow ${
        isOwnMessage
        ? "bg-gray-200 text-gray-900 mr-auto" // Estilos para los mensajes de otros usuarios.
        : "bg-slate-800 text-white ml-auto" // Estilos para los mensajes propios.
      }`}
    >
      {/* Muestra el alias del remitente */}
      <p className="text-xs">{message.senderAlias} Dice:</p>

      {/* Muestra el contenido del mensaje */}
      <p className="text-md break-words font-bold text-left px-2">
        {message.message}
      </p>

      {/* Muestra la marca de tiempo del mensaje */}
      <p className="text-xs text-right">{message.timestamp}</p>
    </div>
  );
}

// PropTypes para validar las props del componente.
MessageComponent.propTypes = {
  message: PropTypes.shape({
    senderAlias: PropTypes.string.isRequired, // Alias del remitente del mensaje.
    message: PropTypes.string.isRequired, // Contenido del mensaje.
    timestamp: PropTypes.string.isRequired, // Marca de tiempo del mensaje.
    recipientAlias: PropTypes.string.isRequired, // Alias del destinatario del mensaje.
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired, // Indica si el mensaje es del usuario actual.
};

export default MessageComponent;
