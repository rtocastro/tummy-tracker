import logo from "../assets/tummy-tracker-logo.png";

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img
          src={logo}
          alt="Tummy Tracker Logo"
          className="splash-logo"
        />
      </div>
    </div>
  );
}

export default SplashScreen;