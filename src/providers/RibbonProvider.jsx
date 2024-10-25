import { useState } from "react";
import PropTypes from "prop-types";
import { RibbonContext } from "../context/RibbonContext";
import ribbons from "../constants/ribbons";

export const RibbonProvider = ({ children }) => {
  const [ribbon, setRibbon] = useState({ upper: ribbons[9].value, lower: ribbons[8].value });

  return (
    <RibbonContext.Provider value={{ ribbon, setRibbon }}>
      {children}
    </RibbonContext.Provider>
  );
};

RibbonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
