import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex w-full flex-row h-16 bg-black text-white justify-around text-xl items-center font-semibold">
      <NavLink to={'/'}>BXP</NavLink >
      <NavLink to={'/'}>Task 1</NavLink >
      <NavLink to={'/myTickets'}>Tickets</NavLink>
      <a href='https://github.com/Varis0282' target='_blank' rel='noreferrer'>Github</a>
    </div>
  );
}

export default Navbar;