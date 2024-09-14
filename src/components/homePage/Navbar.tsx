import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header className="header">
    <nav className="navbar">
      <div className="navbar-header">
        <img src="/images/logo27.jpg" alt="Logo" className="logo" />
        <a href="index.html" className="brand">
          KHETIDEALS
        </a>
      </div>

      <ul className="nav">
      <Link href="/" >
        <li className="nav-item">
          <a href="index.html" className="nav-link">
            Home
          </a>
        </li>
        </Link>
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
      <GoogleTranslate />
    </nav>
  </header>
  );
};

export default Navbar;