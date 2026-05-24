function Navbar({ onResetApp, onAddEntryClick }) {
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
                <button className="nav-button" onClick={onAddEntryClick}>
                    + Add Entry
                </button>

                <button className="reset-button" onClick={onResetApp}>
                    Reset
                </button>
            </div>
        </nav>
    );
}

export default Navbar;