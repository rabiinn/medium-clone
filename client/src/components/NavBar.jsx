import { Bell, Pen, Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <nav className="fixed top-0 w-screen flex items-center justify-between px-6 py-4 bg-white shadow">
        <div>
          <button
            className="flex items-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
            <span className="text-xl font-bold">Medium</span>
          </button>
        </div>

        <div className="flex-1 mx-8">
          <input
            type="search"
            placeholder="Search"
            className="w-full max-w-md px-4 py-2 shadow-inner rounded-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/write">
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
              <Pen className="w-5 h-5" />
              <span>Write</span>
            </button>
          </Link>

          <Link to="notifications">
            <button className="text-gray-700 hover:text-blue-600">
              <Bell />
            </button>
          </Link>
        </div>
      </nav>

      <div className="flex flex-row">
        <div>
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <main
          className={`transition-all duration-300 flex-1 p-4 pt-20 ${isOpen ? 'md:ml-52' : 'md:ml-16'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NavBar;
