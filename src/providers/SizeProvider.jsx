import { useState } from "react";
import { SizeContext } from "../context/SizeContext";
import PropTypes from "prop-types";
import sizes from "../constants/sizes";

export const SizeProvider = ({ children }) => {
  const [size, setSize] = useState(sizes[0].value);

  return (
    <SizeContext.Provider value={{ size, setSize }}>
      {children}
    </SizeContext.Provider>
  );
};

SizeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
