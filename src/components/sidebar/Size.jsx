import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { SizeContext } from "../../context/SizeContext";
import sizes from "../../constants/sizes";

export default function Size() {
  const { size, setSize } = useContext(SizeContext);

  const handleSize = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  return (
    <ToggleButtonGroup value={size} exclusive onChange={handleSize} fullWidth>
      {sizes.map((size) => (
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
