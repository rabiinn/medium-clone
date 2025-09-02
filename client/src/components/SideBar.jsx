import { Link } from 'react-router-dom';
import { sidebarLinks } from './SidebarLinks.js';

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div
        className={`hidden md:flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-10 transition-all duration-300
        ${isOpen ? 'w-52' : 'w-0'} overflow-hidden`}
      >
        {isOpen && (
          <div className="flex flex-col gap-4 p-4">
            {sidebarLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <div className="flex items-center gap-2">
                  <Icon size={20} />
                  <span>{label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-52 bg-white shadow-lg z-40 transition-transform duration-300 md:hidden ${
          isOpen ? 'w-52' : 'w-0'
        }`}
      >
        <div className="flex flex-col gap-4 p-4 pt-16">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}>
              <div className="flex items-center gap-2">
                <Icon size={20} />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
