import { useState } from "react";
import PropTypes from "prop-types";
import { InscriptionTextContext } from "../context/InscriptionTextContext";

export const InscriptionTextProvider = ({ children }) => {
  const [inscriptionText, setInscriptionText] = useState('');

  return (
    <InscriptionTextContext.Provider value={{ inscriptionText, setInscriptionText }}>
      {children}
    </InscriptionTextContext.Provider>
  );
};

InscriptionTextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
