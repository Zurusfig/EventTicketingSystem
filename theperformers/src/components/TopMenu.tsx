"use client"
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function TopMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-bg-alternate-color text-text-alternate-color border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-bg-alternate-color text-text-alternate-color">
        <div className="flex h-16 items-center justify-between">
          
          <div className="font-primary flex-shrink-0 font-bold text-2xl">
              TP
          </div>

          {/* 2. Desktop Menu Links */}
          <div className="font-primary text-text-alternate hidden md:flex md:items-center md:space-x-8">
            <button className="cursor-pointer rounded-full bg-lime-color text-text-color px-6 py-2 hover:bg-lime-color/90 hover:scale-105 transition-all duration-300">
              Log In
            </button>
          </div>

          {/* 3. Mobile Menu Button (Hamburger Icon) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-text-muted hover:bg-surface hover:text-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-blue"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <CloseIcon className="cursor-pointer block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="cursor-pointer block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {/* This uses the 'isMobileMenuOpen' state to conditionally apply 'block' or 'hidden' */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        {/* Mobile Log In Button */}
        <div className="px-4 py-4 flex justify-center">
          <button className="cursor-pointer rounded-full bg-lime-color text-text-color px-6 py-2 hover:bg-lime-color/90 hover:scale-105 transition-all duration-300">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
}
