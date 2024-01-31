import PropTypes from "prop-types";

// UserListComponent muestra la lista de usuarios conectados en el chat.
function UserListComponent({
  users,
  onSelectUser,
  currentUserAlias,
  newMessagesFrom,
}) {
  // Renderiza la lista de usuarios.
  return (
    <div className="  h-full px-2 py-4">
      {/* Muestra un saludo al usuario actual */}
      <h3 className="text-lg font-semibold mb-2">Bienvenido:</h3>
      <h4 className="mb-8">{currentUserAlias}</h4>

      {/* Encabezado para la lista de usuarios conectados */}
      <h4 className="text-xl font-medium mb-2 text-justify">
        Usuarios Conectados:
      </h4>

      {/* Lista de usuarios */}
      <ul>
        {users
          // Filtra para no mostrar el propio alias del usuario actual.
          .filter((user) => user !== currentUserAlias)
          .map((user) => (
            // Cada usuario en la lista es un botón clickeable.
            <li key={user}>
              <button
                onClick={() => onSelectUser(user)}
                className="hover:text-red-900 text-center w-full text-black-500 hover:underline"
              >
                {user}
                {/* Muestra una notificación si hay un nuevo mensaje del usuario */}
                {newMessagesFrom[user] && (
                  <span className="text-red-500 ml-2 text-xs">
                    NUEVO MENSAJE
                  </span>
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

// PropTypes para validar las props del componente.
UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de usuarios conectados.
  onSelectUser: PropTypes.func.isRequired, // Función para manejar la selección de un usuario.
  currentUserAlias: PropTypes.string.isRequired, // Alias del usuario actual.
  newMessagesFrom: PropTypes.object.isRequired, // Objeto para llevar seguimiento de nuevos mensajes.
};

export default UserListComponent;
