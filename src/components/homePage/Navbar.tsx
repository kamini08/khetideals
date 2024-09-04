import "./Navbar.css";
const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            {/* <img src={logo} alt="Logo" className="logo" /> */}

            <a href="index.html" className="brand">
              KHETIDEALS
            </a>
          </div>

          <ul className="nav">
            <li className="nav-item active">
              <a href="index.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#our" className="nav-link">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="#footer" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
