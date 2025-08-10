import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


const SidebarLayout = ({onLogout}) => {
    const [isOpen, setIsOpen ] = useState(false);

    return (
        <div className="flex h-screen">
            <div className={`fixed inset-y-0 left-0 bg-white w-64 shadow-lg transform transtion-transform duration-300 ease-in-out z-50
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={() => setIsOpen(false)}>✖</button>
                </div>
                
                <nav className="p-4 space-y-4">

                    <Link to="/" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}> Home </Link>
                    <Link to="/about" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}> About</Link>
                    <Link to="/profile:username" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}> Profile</Link>
                    <Link to="/settings" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}> Settings</Link>
                    <Link to="/login" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>Login</Link>
                    <Link to="/register" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>Register</Link>
                    <button onClick={onLogout}>Sign out</button>


                </nav>
            </div>


            {
                isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40">  </div>
                 )
            }

            <div className="flex-1 flex flex-col ">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                            <button 
                                className="text-2xl"
                                onClick={() => setIsOpen(true)}
                            >
                                ☰
                            </button>
                            <h1 className="text-xl font-bold ">Medium</h1>
                    </div>
                </header>
                <main className="p-6 flex-1 overflow-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default SidebarLayout;