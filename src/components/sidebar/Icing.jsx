import { useContext } from "react";
import ColorPicker from "./tools/ColorPicker";
import { IcingContext } from "../../context/IcingContext";
import icings from "../../constants/icings";

export default function Icing() {
  const { icing, setIcing } = useContext(IcingContext);

  const handleIcing = (event, newIcing) => {
    setIcing(newIcing);
  };

  return <ColorPicker value={icing} onChange={handleIcing} colors={icings}/>;
}
