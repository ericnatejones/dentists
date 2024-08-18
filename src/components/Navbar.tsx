'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>            
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Dente
            </Link>
          </div>

          {/* Login & Mobile Menu Button */}
          <div className="flex justify-between space-x-10 items-center">
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 hidden md:block">
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center space-y-1"
            >
              <span className="block w-6 h-0.5 bg-gray-700 rounded"></span>
              <span className="block w-4 h-0.5 bg-gray-700 rounded"></span>
              <span className="block w-6 h-0.5 bg-gray-700 rounded"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/services" className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600">
              Services
            </Link>
            <Link href="/about" className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600">
              About Us
            </Link>
            <Link href="/appointments" className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600">
              Appointments
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/login" className="block text-gray-700 hover:bg-gray-100 hover:text-blue-600">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
