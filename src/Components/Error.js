import React from 'react';
import { NavLink } from 'reactstrap';


const Error = () => {
  return (
    <div>
      <h1>
        Error! The page you are looking for does not exist!
      </h1>
      <h4>
        <NavLink href="/">Click here to return to the Home Page</NavLink>
      </h4>

    </div>
  );
};

export default Error;
