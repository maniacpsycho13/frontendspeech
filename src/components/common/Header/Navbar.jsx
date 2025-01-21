import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo } from '../../../assets/common';
import { NavbarLinks } from '../../../data/NavbarLinks';
import ProfileDropdown from '../../core/Auth/ProfileDropDown';

const Navbar = () => {
  const [token, setToken] = useState(null);

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

  return (
    <div className='w-full px-12 pt-4 bg-[#F4F4F4] fixed z-50 border-b-[2px] border-gray-300'>
      <div className='flex h-14 items-center justify-between bg-[#F4F4F4] px-8 '>

        <Link to="/" className=''>
          <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
        </Link>
        <nav>
          <ul className='flex gap-x-8 z-[120]'>
            {NavbarLinks.map((link, index) => (
              <li key={index} className='flex'>
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-[#5B9CF9] font-semibold text-lg' 
                      : 'text-black font-semibold text-lg'
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className='flex gap-8'>
          {
            token === null && (
              <>
                <Link to="/login">
                  <button className='bg-[#5B9CF9] px-[16px] py-[8px] text-black rounded-md font-semibold'>
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className='bg-[#5B9CF9] px-[16px] py-[8px] text-black rounded-md font-semibold'>
                    Sign Up
                  </button>
                </Link>
              </>
            )
          }
          {
            token !== null && (
              <div className='pt-2'>
                <ProfileDropdown />
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default Navbar;
