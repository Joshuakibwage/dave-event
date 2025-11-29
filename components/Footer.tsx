"use client";
import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t border-neutral-900">
      <div className="flex justify-center items-center py-4 text-neutral-400">
            &copy; {new Date().getFullYear()} Dev Event
      </div>
    </footer>
  )
}

export default Footer
