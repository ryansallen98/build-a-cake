import { useState } from "react";
import PropTypes from "prop-types";
import { InscriptionColorContext } from "../context/InscriptionColorContext";
import icings from "../constants/icings";

export const InscriptionColorProvider = ({ children }) => {
  const [inscriptionColor, setInscriptionColor] = useState(icings[0].value);

  return (
    <InscriptionColorContext.Provider value={{ inscriptionColor, setInscriptionColor }}>
      {children}
    </InscriptionColorContext.Provider>
  );
};

InscriptionColorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
