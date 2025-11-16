"use client";
import { useState } from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TopMenu() {

  const { data: session } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log(session);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-bg-alternate-color text-text-alternate-color border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-bg-alternate-color text-text-alternate-color">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="cursor-pointer font-primary flex-shrink-0 font-black text-4xl mx-2">
            TP
          </Link>


          {/* 2. Desktop Menu Links (hidden on small screens) */}
          <div className="hidden md:flex justify-between font-primary md:items-center md:space-x-8 w-[80%] mx-2">
            <div className="flex justify-between space-x-8">
              <TopMenuItem text="Events" pageRoute="/events" />
              <TopMenuItem text="Request Tickets" pageRoute="/request-tickets" />
            </div>
            <div>
              <TopMenuItem text="My Tickets" pageRoute="/my-tickets" />
            </div>
          </div>

          {/* 2. Desktop Menu Links */}
          <div className="font-primary text-text-alternate hidden md:flex md:items-center md:space-x-8 mx-2">
            {session ? (
              <Link href="/profile">
                <button className="text-sm md:text-lg cursor-pointer rounded-full bg-navy-color mx-2 px-6 py-2 hover:scale-105 transition-all duration-300">
                  <div className="text-nowrap text-gradient-primary font-black text-stroke-navy-color">{session.user?.name}</div>
                </button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <button className="text-nowrap text-sm md:text-md cursor-pointer rounded-full bg-lime-color text-navy-color px-6 py-2 hover:bg-lime-color/90 hover:scale-105 transition-all duration-300">
                  Log In
                </button>
              </Link>
            )}
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
                <CloseIcon
                  className="cursor-pointer block h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <MenuIcon
                  className="cursor-pointer block h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out transform ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
        id="mobile-menu"
      >
        {/* Mobile Menu Links */}
        <div className="px-4 pt-4 pb-2 space-y-2 font-primary">
          <div className="block w-full text-left">
            <TopMenuItem text="Events" pageRoute="/events" />
          </div>
          <div className="block w-full text-left">
            <TopMenuItem text="Request Tickets" pageRoute="/request-tickets" />
          </div>
          <div className="block w-full text-left">
            <TopMenuItem text="My Tickets" pageRoute="/my-tickets" />
          </div>
        </div>

        {/* Mobile Log In Button */}
        <div className="px-4 py-4 flex justify-center">
          {session ? (
              <Link href="/profile">
              <button className="text-sm md:text-lg cursor-pointer rounded-full bg-navy-color mx-2 px-6 py-2 hover:scale-105 transition-all duration-300">
                <div className="text-nowrap text-gradient-primary font-black text-stroke-navy-color">{session.user?.name}</div>
              </button>
            </Link>
            ) : (
              <Link href="/api/auth/signin">
                <button className="text-nowrap text-sm md:text-md cursor-pointer rounded-full bg-lime-color text-navy-color px-6 py-2 hover:bg-lime-color/90 hover:scale-105 transition-all duration-300">
                  Log In
                </button>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}
