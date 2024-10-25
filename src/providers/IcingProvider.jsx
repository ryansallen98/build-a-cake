import { useState } from "react";
import PropTypes from "prop-types";
import icings from "../constants/icings";
import { IcingContext } from "../context/IcingContext";

export const IcingProvider = ({ children }) => {
  const [icing, setIcing] = useState(icings[0].value);

  return (
    <IcingContext.Provider value={{ icing, setIcing }}>
      {children}
    </IcingContext.Provider>
  );
};

IcingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
