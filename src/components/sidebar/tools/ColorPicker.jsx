import {
  Box,
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";

const ToggleButtonGroup = styled((props) => (
  <MuiToggleButtonGroup exclusive {...props} />
))(() => ({
  flexWrap: "wrap",
  gap: 8,
}));

const ToggleButton = styled((props) => (
  <MuiToggleButton {...props} />
))(({ theme }) => ({
  borderRadius: "100% !important",
  border: "1px solid !important",
  borderColor: theme.palette.divider + "!important",
  padding: theme.spacing(0.5),
}));

export default function ColorPicker({ colors, value, onChange }) {
  return (
    <ToggleButtonGroup value={value} onChange={onChange}>
      {colors.map((icing) => (
        <Tooltip key={icing.value} title={icing.text} arrow>
          <Box>
            <ToggleButton value={icing.value}>
              <Box
                width={25}
                height={25}
                bgcolor={icing.value}
                borderRadius={"100%"}
              />
            </ToggleButton>
          </Box>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
};
