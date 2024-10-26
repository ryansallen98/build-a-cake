import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { CandleContext } from "../../context/CandleContext";
import candles from "../../constants/candles";

export default function Candles() {
  const { candle, setCandle } = useContext(CandleContext);

  const handleCandles = (event, newCandle) => {
    if (newCandle !== null) {
      setCandle(newCandle);
    }
  };

  return (
    <ToggleButtonGroup value={candle} exclusive onChange={handleCandles} fullWidth>
      {candles.map((size) => (
        <ToggleButton key={size.value} value={size.value}>
          <Stack>
            <Typography variant="subtitle1">{size.text}</Typography>
            <Typography variant="caption">{size.subText}</Typography>
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
