import { useState } from "react";
import PropTypes from "prop-types";

function LoginComponent({ onLogin }) {
  const [alias, setAlias] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(alias);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Ingrese su alias/usuario"
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;
