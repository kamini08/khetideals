// import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleTranslate from "./GoogleTranslate";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import "./Navbar1.css";
// import { LoginForm } from "../auth/login-form";
// import { DialogTitle } from "@radix-ui/react-dialog";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

const Navbar = () => {
  // const { data: session };
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-header">
          <img src="/images/logo27.jpg" alt="Logo" className="logo" />
          <a href="/" className="brand">
            KHETIDEALS
          </a>
        </div>

        <ul className="nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>

          <li className="nav-item">
            <a href="/#platform-steps" className="nav-link">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="/#footer-top" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            {/* <a href="/auth/login" className="nav-link"> */}
            {/* <Dialog>
                <DialogTitle>Log in</DialogTitle>
                <DialogContent>
                  <LoginForm />
                </DialogContent>
              </Dialog> */}
            <LoginButton
              // mode="modal"
              asChild
            >
              <Button variant="link" size="lg" className="nav-link pb-3">
                Sign in
              </Button>
            </LoginButton>
            {/* </a> */}
          </li>
        </ul>
        <GoogleTranslate />
      </nav>
    </header>
  );
};

export default Navbar;
