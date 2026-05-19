function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-group">
        <div className="logo-dot"></div>

        <div>
          <p className="logo-title">Tummy Tracker</p>
          <p className="logo-subtitle">
            Pet wellness dashboard
          </p>
        </div>
      </div>

      <button className="nav-button">
        + Add Entry
      </button>
    </nav>
  );
}

export default Navbar;