import { useState } from "react";
import PropTypes from "prop-types";
import { InscriptionContext } from "../context/InscriptionContext";

export const InscriptionProvider = ({ children }) => {
  const [inscription, setInscription] = useState(false);

  return (
    <InscriptionContext.Provider value={{ inscription, setInscription }}>
      {children}
    </InscriptionContext.Provider>
  );
};

InscriptionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
