import { useState } from "react";
import PropTypes from "prop-types";
import fillings from "../constants/fillings";
import { FillingContext } from "../context/FillingContext";

export const FillingProvider = ({ children }) => {
  const [filling, setFilling] = useState(fillings[0].value);

  return (
    <FillingContext.Provider value={{ filling, setFilling }}>
      {children}
    </FillingContext.Provider>
  );
};

FillingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};