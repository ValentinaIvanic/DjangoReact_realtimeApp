
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RealTimePolls</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button onClick={() => navigate('/addPoll')}>Dodaj Anketu</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/polls">Ankete</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
