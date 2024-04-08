import { useState } from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";

export default function NavbarComponent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar onMenuOpenChange={setIsOpen} isMenuOpen={isOpen}>
      <NavbarContent justify="left">
        <NavbarMenuToggle></NavbarMenuToggle>
        <NavbarItem isActive={location.pathname === "/"}>
          <Link href="/" color="foreground">
            Tracker
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/projects"}>
          <Link href="/projects" color="foreground">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/users"}>
          <Link href="/users" color="foreground">
            Users
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="left">
        {location.pathname !== "/login" && (
          <Button
            as={Link}
            color="primary"
            href="/login"
            variant="flat"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Button>
        )}
      </NavbarContent>
      <NavbarMenu className="dark">
        <NavbarItem>Tracker</NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
