import React from "react";
import { Link, useLocation } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import ShikshaLogo from "./shiksha_logo_white.svg";

const Navbar = ({ menuItems, isMobileMenuOpen, setIsMobileMenuOpen, currentLanguage, switchLanguage }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const findMenuItem = (titleEn, titleHi) =>
    menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? titleEn : titleHi));

  const aboutMenu = findMenuItem("About", "के बारे में");
  const programsMenu = findMenuItem("Programs", "प्रोग्राम");
  const campaignsMenu = findMenuItem("Campaigns", "अभियान");
  const getInvolvedMenu = findMenuItem("Get Involved", "शामिल हो जाओ");
  const resourceCenterMenu = findMenuItem("Resource Center", "संसाधन केंद्र");

  const menuItemsWithChildren = [aboutMenu, programsMenu, campaignsMenu, getInvolvedMenu, resourceCenterMenu].filter(Boolean);
  const menuItemsWithoutChildren = menuItems.filter(
    (item) => !item.attributes.parent && !menuItemsWithChildren.includes(item)
  );

  const getChildren = (menuItem) => menuItems.filter((item) => item.attributes.parent === menuItem.id);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-navy-blue p-3 fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between flex-wrap relative">
        <div className="flex items-center">
          <Link to="/">
            <img src={ShikshaLogo} alt="logo" className="h-12 w-auto mr-2" />
          </Link>
        </div>
        <div className="block lg:hidden flex items-center">
        <div className="relative mx-2">
            <div className="flex items-center">
              <span className={`text-white ${currentLanguage === 'en' ? 'font-bold text-yellow-400' : ''}`}>EN</span>
              <button
                onClick={switchLanguage}
                className={`relative mx-2 w-12 h-6 bg-gray-300 rounded-full flex items-center ${currentLanguage === 'en' ? 'justify-start' : 'justify-end'} p-1 cursor-pointer`}
              >
                <div className="w-4 h-4 bg-navy-blue rounded-full"></div>
              </button>
              <span className={`text-white ${currentLanguage === 'hi' ? 'font-bold text-yellow-400' : ''}`}>HI</span>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
          
        </div>
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
            {menuItemsWithChildren.map((menuItem) => (
              <MenuDropdown
                key={menuItem.id}
                title={menuItem.attributes.title}
                items={getChildren(menuItem)}
                closeMenu={closeMenu}
                currentPath={currentPath}
              />
            ))}
            <div className="relative block text-left">
              {menuItemsWithoutChildren.map((item) => (
                <Link
                  key={item.attributes.meta.entity_id}
                  to={item.attributes.url}
                  className={`inline-flex justify-between w-full rounded-md shadow-sm bg-transparent px-4 py-2 text-sm font-medium ${currentPath === item.attributes.url ? 'text-[#f9a123]' : 'text-white'} hover:text-[#f9a123] focus:outline-none transition-all duration-200 ease-in-out`}
                >
                  {item.attributes.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative mx-2">
            <div className="flex items-center">
              <span className={`text-white ${currentLanguage === 'en' ? 'font-bold text-yellow-400' : ''}`}>EN</span>
              <button
                onClick={switchLanguage}
                className={`relative mx-2 w-12 h-6 bg-gray-300 rounded-full flex items-center ${currentLanguage === 'en' ? 'justify-start' : 'justify-end'} p-1 cursor-pointer`}
              >
                <div className="w-4 h-4 bg-navy-blue rounded-full"></div>
              </button>
              <span className={`text-white ${currentLanguage === 'hi' ? 'font-bold text-yellow-400' : ''}`}>HI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed w-72 right-0 top-0 bg-white h-full overflow-y-auto p-6 transition-all duration-500 ease-in-out shadow-lg z-50">
          <div className="flex justify-between items-center mb-4">
            <button onClick={closeMenu} className="text-navy-blue focus:outline-none">
              <svg className="h-6 w-6" fill="#000000" viewBox="0 0 311 311.07733" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                <path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/>
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {menuItemsWithChildren.map((menuItem) => (
              <MenuDropdown
                key={menuItem.id}
                title={menuItem.attributes.title}
                items={getChildren(menuItem)}
                closeMenu={closeMenu}
                currentPath={currentPath}
                isMobile={true}
              />
            ))}
            <div className="relative block text-left">
            {menuItemsWithoutChildren.map((item) => (
              <Link
                key={item.attributes.meta.entity_id}
                to={item.attributes.url}
                className={`inline-flex justify-between w-full rounded-md shadow-sm bg-transparent px-4 py-2 text-sm font-medium text-black  focus:outline-none transition-all duration-200 ease-in-out ${currentPath === item.attributes.url ? 'text-[#f9a123]' : 'text-navy-blue'} hover:text-[#f9a123]`}
                onClick={closeMenu}
              >
                {item.attributes.title}
              </Link>
            ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

