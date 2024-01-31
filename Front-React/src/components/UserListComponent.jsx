import PropTypes from "prop-types";

function UserListComponent({ users, onSelectUser, currentUserAlias }) {
  return (
    <div className="user-list">
      <h3>Bienvenido: {currentUserAlias}</h3>
      <h4>Usuarios Conectados:</h4>
      <ul>
        {users
          .filter((user) => user !== currentUserAlias)
          .map((user, index) => (
            <li
              key={index}
              onClick={() => onSelectUser(user)}
              style={{ cursor: "pointer" }}
            >
              {user}
            </li>
          ))}
      </ul>
    </div>
  );
}

UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectUser: PropTypes.func.isRequired,
  currentUserAlias: PropTypes.string.isRequired,
};

export default UserListComponent;
