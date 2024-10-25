import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { FillingContext } from "../../context/FillingContext";
import fillings from "../../constants/fillings";
import { Stack } from "@mui/system";

export default function Filling() {
  const { filling, setFilling } = useContext(FillingContext);

  const handleChange = (event) => {
    setFilling(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select value={filling} onChange={handleChange}>
        {fillings.map((filling) => (
          <MenuItem key={filling.value} value={filling.value}>
            {filling.text}
            <Stack marginLeft={"auto"}>
              {filling.subText ? (
                <Typography variant="caption" color="warning">
                  {filling.subText}
                </Typography>
              ) : null}
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
