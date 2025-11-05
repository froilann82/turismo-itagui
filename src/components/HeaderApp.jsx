import logo from "../assets/logo.png";
import "../styles/HeaderApp.css";

export default function HeaderApp() {
  const handleNotificationClick = () => {
    console.log("Mostrar notificaciones (a implementar)");
  };

  return (
    <header className="header-app">
      <div className="header-logo-container">
        <img src={logo} alt="Alcaldía de Itagüí" className="header-logo" />
        <span className="header-title">Alcaldía de Itagüí</span>
      </div>

      <button
        className="header-notification"
        onClick={handleNotificationClick}
        aria-label="Notificaciones"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
          alt="Notificaciones"
          className="notification-icon"
        />
      </button>
    </header>
  );
}
