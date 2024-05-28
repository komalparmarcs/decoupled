import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuDropdown = ({ title, items, closeMenu, isMobile, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Adjust the delay time as needed (in milliseconds)
  };
  
  const handlePanelMouseEnter = () => {
    clearTimeout(timeoutId);
  };
  
  const handlePanelMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Adjust the delay time as needed (in milliseconds)
  };
  
  const handleItemClick = () => {
    setIsOpen(false);
    closeMenu();
  };
  
  const handleMenuIconClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  
  return (
    <div
      className="relative block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <a
          href="#"
          className={`inline-flex justify-between w-full rounded-md shadow-sm bg-transparent px-4 py-2 text-sm font-medium ${isMobile ? 'text-black' : 'text-white'} ${isOpen ? 'hover:text-[#f9a123]' : ''} focus:outline-none transition-all duration-200 ease-in-out`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          onClick={handleMenuIconClick}
        >
          {title}
          <svg
            className={`${
              isOpen ? "ml-2 h-5 w-3 transform rotate-180" : "ml-2 h-5 w-3"
            } ${isMobile ? 'ml-auto' : ''}`}
            viewBox="0 0 256 256"
            fill={isMobile ? '#000000' : '#ffffff'}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
          </svg>
        </a>
      </div>
  
      {isOpen && items && items.length > 0 && (
        <div
          className={`origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-transform duration-300 transform ${
            isMobile ? 'translate-x-0' : ''
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handlePanelMouseLeave}
        >
          <div className="py-1" role="none">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.attributes.url}
                className={`block px-4 py-2 text-sm ${currentPath === item.attributes.url ? 'text-[#f9a123]' : (isMobile ? 'text-black' : 'text-gray-700')} hover:text-navy-blue border-b border-gray-200`}
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${item.id}`}
                onClick={handleItemClick}
              >
                {item.attributes.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );  
};

export default MenuDropdown;
