import { useContext } from "react";
import ColorPicker from "./tools/ColorPicker";
import { RibbonContext } from "../../context/RibbonContext";
import ribbons from "../../constants/ribbons";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

export default function Ribbons() {
  const { ribbon, setRibbon } = useContext(RibbonContext);

  const handleUpperRibbon = (event, newRibbons) => {
    setRibbon({...ribbon, upper: newRibbons});
  };

  const handleLowerRibbon = (event, newRibbons) => {
    setRibbon({...ribbon, lower: newRibbons});
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="caption">Upper Ribbon</Typography>
        <ColorPicker
          value={ribbon.upper}
          onChange={handleUpperRibbon}
          colors={ribbons}
        />
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="caption">Lower Ribbon</Typography>
        <ColorPicker
          value={ribbon.lower}
          onChange={handleLowerRibbon}
          colors={ribbons}
        />
      </Stack>
    </Stack>
  );
}
