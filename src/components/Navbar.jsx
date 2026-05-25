import AuthPanel from "./AuthPanel";

function Navbar({
  user,
  onResetApp,
  onLogMealClick,
  onAddPetClick,
}) {
  return (
    <nav className="navbar">
      <div className="logo-group">
        <div className="logo-dot"></div>

        <div>
          <p className="logo-title">Tummy Tracker</p>
          <p className="logo-subtitle">Pet wellness dashboard</p>
        </div>
      </div>

      <div className="nav-actions">
        <button className="nav-button" onClick={onLogMealClick}>
          + Log Meal
        </button>

        <button className="nav-button" onClick={onAddPetClick}>
          + Add Pet
        </button>

        <button className="reset-button" onClick={onResetApp}>
          Reset
        </button>

        <AuthPanel user={user} compact />
      </div>
    </nav>
  );
}

export default Navbar;