import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo } from '../../../assets/common';
import { NavbarLinks } from '../../../data/NavbarLinks';
import ProfileDropdown from '../../core/Auth/ProfileDropDown';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='w-full px-4 lg:px-12 pt-4 bg-[#F4F4F4] fixed z-50 border-b-[2px] border-gray-300'>
      <div className='flex h-16 items-center justify-between px-4 lg:px-8'>
        {/* Logo */}
        <Link to='/' className='mb-6'>
          <img src={logo} width={160} height={42} loading='lazy' alt='logo' />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:block'>
          <ul className='flex font-gilroy gap-x-10'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#5B9CF9] font-semibold border-b-2 border-[#5B9CF9] text-xl'
                      : 'text-black font-semibold text-xl hover:text-[#5B9CF9] hover:border-b-2 hover:border-[#5B9CF9] transition-all delay-50'
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className='hidden lg:flex gap-6 text-lg font-gilroy'>
          {token === null ? (
            <>
              <Link to='/login'>
                <button className='bg-[#5B9CF9] px-4 py-2 hover:bg-[#5B9CF9]/80 transition-all text-white rounded-md font-semibold'>
                  Login
                </button>
              </Link>
              <Link to='/signup'>
                <button className='bg-[#5B9CF9] px-4 py-2 hover:bg-[#5B9CF9]/80 transition-all text-white rounded-md font-semibold'>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className='lg:hidden text-gray-700 hover:text-[#5B9CF9]' onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b'>
          <img src={logo} width={140} height={36} alt='logo' />
          <button onClick={toggleMenu} className='text-gray-700 hover:text-[#5B9CF9]'>
            <X size={28} />
          </button>
        </div>

        <nav className='px-6 py-4'>
          <ul className='flex flex-col space-y-4 font-gilroy'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#5B9CF9] font-semibold text-lg block'
                      : 'text-black font-semibold text-lg hover:text-[#5B9CF9] transition-all block'
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
            {/* Mobile Auth Buttons */}
            {token === null ? (
              <div className='flex flex-col space-y-3 pt-4'>
                <Link
                  to='/login'
                  onClick={handleLinkClick}
                  className='bg-[#5B9CF9] px-4 py-2 text-white rounded-md font-semibold text-center'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  onClick={handleLinkClick}
                  className='bg-[#5B9CF9] px-4 py-2 text-white rounded-md font-semibold text-center'
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <ProfileDropdown />
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
