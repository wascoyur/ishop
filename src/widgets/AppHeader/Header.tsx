import React, { useState } from "react";
import "./header-styles.scss";
import { CloseIcon } from "./CloseIcon.tsx";
import { BurgerMenu } from "./BurgerMenu.tsx";
import { Logo } from "./Logo.tsx";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="menu__wrapper">
      <div className="menu__bar">
        <Logo />
        <div className="menu-icon" onClick={toggleMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <BurgerMenu />}
        </div>
        <Navigation isMobileMenuOpen={isMobileMenuOpen} />
      </div>
    </div>
  );
};

type NavigationProps = {
  isMobileMenuOpen: boolean;
};

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen }) => {
  return (
    <ul
      className={`navigation ${isMobileMenuOpen ? "navigation--mobile" : ""}`}
    >
      <NavLink to={`/`}>Главная</NavLink>
      <NavLink to={`bucket`}>Корзина</NavLink>
      <NavLink to={`profile`}>Профиль</NavLink>
    </ul>
  );
};
