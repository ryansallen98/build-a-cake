import { useState } from "react";
import PropTypes from "prop-types";
import candles from "../constants/candles";
import { CandleContext } from "../context/CandleContext";

export const CandleProvider = ({ children }) => {
  const [candle, setCandle] = useState(candles[0].value);

  return (
    <CandleContext.Provider value={{ candle, setCandle }}>
      {children}
    </CandleContext.Provider>
  );
};

CandleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};