import PropTypes from "prop-types";

function MessageComponent({ message, isOwnMessage }) {
  // Proporciona un valor predeterminado o maneja el caso de alias indefinido
  const senderAlias = message.senderAlias || "Desconocido";
  
  const messageStyle = isOwnMessage
    ? {
        backgroundColor: "blue",
        color: "white",
        textAlign: "right",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
      }
    : {
        backgroundColor: "gray",
        color: "white",
        textAlign: "left",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
      };


   return (
     <div style={messageStyle}>
       <p className="usuario">Usuario: {message.senderAlias}</p>
       <p>{` ${message.message}`}</p>
       <p className="fecha">{message.timestamp}</p>
     </div>
   );
}

MessageComponent.propTypes = {
  message: PropTypes.shape({
    senderAlias: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    recipientAlias: PropTypes.string.isRequired,
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
};

export default MessageComponent;
