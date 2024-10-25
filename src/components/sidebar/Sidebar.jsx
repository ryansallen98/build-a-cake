import { Stack, Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordion";
import Size from "./Size";
import Filling from "./Filling";
import Icing from "./Icing";
import Ribbons from "./Ribbons";

export default function Sidebar() {
  return (
    <Stack
      height={"100dvh"}
      minWidth={"360px"}
      maxWidth={"360px"}
      boxShadow={"3.5px 0px 5.5px 0px rgba(0,0,0,0.1)"}
      position={"relative"}
      zIndex={2}
      overflow={"auto"}
    >
      <Stack
        px={4}
        py={2}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"primary.main"}
        color={"primary.contrastText"}
      >
        <Typography variant="h5">BuildACake</Typography>
      </Stack>

      <Accordion defaultExpanded>
        <AccordionSummary>Size</AccordionSummary>
        <AccordionDetails>
            <Size />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Filling</AccordionSummary>
        <AccordionDetails>
          <Filling />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Icing</AccordionSummary>
        <AccordionDetails>
          <Icing />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Ribbons</AccordionSummary>
        <AccordionDetails>
          <Ribbons />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Candles</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Sparklers</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Inscription</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Stack>
  );
}
