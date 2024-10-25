import { useState } from "react";
import PropTypes from "prop-types";
import sparklers from "../constants/sparklers";
import { SparklerContext } from "../context/SparklerContext";

export const SparklerProvider = ({ children }) => {
  const [sparkler, setSparkler] = useState(sparklers[0].value);

  return (
    <SparklerContext.Provider value={{ sparkler, setSparkler }}>
      {children}
    </SparklerContext.Provider>
  );
};

SparklerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};