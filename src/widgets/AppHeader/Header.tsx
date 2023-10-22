import React, { useState } from "react";
import "./header-styles.scss";
import { CloseIcon } from "./CloseIcon.tsx";
import { BurgerMenu } from "./BurgerMenu.tsx";
import { Logo } from "./Logo.tsx";
import { NavLink } from "react-router-dom";
import { useProfileStore } from "../../app/state.ts";

export const AppHeader = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  useProfileStore();
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
  const isUserAuth = useProfileStore((state) => state.isUserAuth);
  return (
    <ul
      className={`navigation ${isMobileMenuOpen ? "navigation--mobile" : ""}`}
    >
      <NavLink to={`/`}>Главная</NavLink>
      {isUserAuth() && <NavLink to={`products`}>Управление товарами</NavLink>}
      {isUserAuth() && (
        <NavLink to={`categories`}>Управление категориями</NavLink>
      )}
      <NavLink to={`bucket`}>Корзина</NavLink>
      <NavLink to={`profile`}>Профиль</NavLink>
    </ul>
  );
};
