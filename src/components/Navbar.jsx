import AuthPanel from "./AuthPanel";
import StatusRotator from "./StatusRotator";

function Navbar({
  user,
  pets,
  entries,
  onResetApp,
  onLogMealClick,
  onAddPetClick,
  onMedicationClick,
}) {
  return (
    <nav className="navbar">
      <div className="logo-group">
        <div className="logo-dot"></div>

        <div>
          <p className="logo-title">Tummy Tracker</p>
          <p className="logo-subtitle">Pet wellness dashboard</p>
        </div>
        <StatusRotator pets={pets} entries={entries} />
      </div>
      <br />

      <div className="nav-actions">
        <button className="nav-button" onClick={onLogMealClick}>
          + Log Meal
        </button>

        <button className="nav-button" onClick={onMedicationClick}>
          + Medication
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