import React from "react";
import { Link } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import ShikshaLogo from "./shiksha_logo_white.svg";

const Navbar = ({ menuItems, isMobileMenuOpen, setIsMobileMenuOpen, currentLanguage, switchLanguage }) => {
  const aboutMenu = menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? "About" : "के बारे में"));
  const programsMenu = menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? "Programs" : "प्रोग्राम"));
  const campaignsMenu = menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? "Campaigns" : "अभियान"));
  const getInvolvedMenu = menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? "Get Involved" : "शामिल हो जाओ"));
  const resourceCenterMenu = menuItems.find((item) => item.attributes.title === (currentLanguage === 'en' ? "Resource Center" : "संसाधन केंद्र"));

  const aboutMenuChildren = aboutMenu && menuItems.filter((item) => item.attributes.parent === aboutMenu.id);
  const programsMenuChildren = programsMenu && menuItems.filter((item) => item.attributes.parent === programsMenu.id);
  const campaignsMenuChildren = campaignsMenu && menuItems.filter((item) => item.attributes.parent === campaignsMenu.id);
  const getInvolvedMenuChildren = getInvolvedMenu && menuItems.filter((item) => item.attributes.parent === getInvolvedMenu.id);
  const resourceCenterMenuChildren = resourceCenterMenu && menuItems.filter((item) => item.attributes.parent === resourceCenterMenu.id);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-navy-blue p-3 relative z-10">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center">
          <Link to="/">
            <img src={ShikshaLogo} alt="logo" className="h-12 w-auto mr-2" />
          </Link>
        </div>
        <div className="block lg:hidden">
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
            {aboutMenu && aboutMenuChildren.length > 0 && (
              <MenuDropdown title={aboutMenu.attributes.title} items={aboutMenuChildren} closeMenu={closeMenu} />
            )}
            {programsMenu && programsMenuChildren.length > 0 && (
              <MenuDropdown title={programsMenu.attributes.title} items={programsMenuChildren} closeMenu={closeMenu} />
            )}
            {campaignsMenu && campaignsMenuChildren.length > 0 && (
              <MenuDropdown title={campaignsMenu.attributes.title} items={campaignsMenuChildren} closeMenu={closeMenu} />
            )}
            {getInvolvedMenu && getInvolvedMenuChildren.length > 0 && (
              <MenuDropdown title={getInvolvedMenu.attributes.title} items={getInvolvedMenuChildren} closeMenu={closeMenu} />
            )}
            {resourceCenterMenu && resourceCenterMenuChildren.length > 0 && (
              <MenuDropdown title={resourceCenterMenu.attributes.title} items={resourceCenterMenuChildren} closeMenu={closeMenu} />
            )}
          </div>
          <button onClick={switchLanguage} className="text-white mx-2 hover:text-[#f9a123]">
            {currentLanguage === 'en' ? "Switch to Hindi" : "Switch to English"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed w-72 right-0 top-0 bg-white h-full overflow-y-auto p-6 transition-all duration-500 ease-in-out shadow-lg z-50">
          <div className="flex justify-between items-center mb-4">
            {/* <Link to="/">
              <img src={ShikshaLogo} alt="logo" className="h-12 w-auto mr-2" />
            </Link> */}
            <button onClick={closeMenu} className="text-navy-blue focus:outline-none">
              <svg className="h-6 w-6"  fill="#000000" viewBox="0 0 311 311.07733" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                <path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/>
              </svg>
              {/* <svg viewBox="0 0 311 311.07733"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg> */}
            </button>
          </div>
          <div className="space-y-4">
            {aboutMenu && aboutMenuChildren.length > 0 && (
              <MenuDropdown title={aboutMenu.attributes.title} items={aboutMenuChildren} closeMenu={closeMenu} isMobile={true} />
            )}
            {programsMenu && programsMenuChildren.length > 0 && (
              <MenuDropdown title={programsMenu.attributes.title} items={programsMenuChildren} closeMenu={closeMenu} isMobile={true} />
            )}
            {campaignsMenu && campaignsMenuChildren.length > 0 && (
              <MenuDropdown title={campaignsMenu.attributes.title} items={campaignsMenuChildren} closeMenu={closeMenu} isMobile={true} />
            )}
            {getInvolvedMenu && getInvolvedMenuChildren.length > 0 && (
              <MenuDropdown title={getInvolvedMenu.attributes.title} items={getInvolvedMenuChildren} closeMenu={closeMenu} isMobile={true} />
            )}
            {resourceCenterMenu && resourceCenterMenuChildren.length > 0 && (
              <MenuDropdown title={resourceCenterMenu.attributes.title} items={resourceCenterMenuChildren} closeMenu={closeMenu} isMobile={true} />
            )}
          </div>
          <button onClick={switchLanguage} className="text-navy-blue w-full mt-4 hover:text-[#f9a123]">
            {currentLanguage === 'en' ? "Switch to Hindi" : "Switch to English"}
          </button>
        </div>
       )}
    </nav>
  );
};

export default Navbar;
