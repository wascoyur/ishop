import React, { useState } from "react";
import "./header-styles.scss"; // Импортируем стили
import { CloseIcon } from "./CloseIcon.tsx";
import { BurgerMenu } from "./BurgerMenu.tsx";
import { Logo } from "./Logo.tsx";

export const AppHeader = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="background">
      <div className="menu__wrapper">
        <div className="menu__bar">
          <Logo />
          <div className="menu-icon" onClick={toggleMenu}>
            {isMobileMenuOpen ? <CloseIcon /> : <BurgerMenu />}
          </div>
          <Navigation isMobileMenuOpen={isMobileMenuOpen} />
        </div>
      </div>
    </div>
  );
};

type NavigationProps = {
  isMobileMenuOpen: boolean;
};

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen }) => {
  const menuItems = () => {
    const items = ["главная", "профиль", "корзина"];
    return items.map((i, index) => (
      <li key={index}>
        <a>{i}</a>
      </li>
    ));
  };

  return (
    <ul
      className={`navigation ${isMobileMenuOpen ? "navigation--mobile" : ""}`}
    >
      {menuItems()}
    </ul>
  );
};
