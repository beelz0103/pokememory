import React, { useState, useEffect } from "react";
import poke from "../assets/poke.gif";

const Loader = ({ show }) => {
  return (
    show && (
      <div className="loader">
        <img src={poke} alt="loader" />
      </div>
    )
  );
};

export default Loader;
