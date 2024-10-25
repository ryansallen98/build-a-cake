import { Stack } from "@mui/material";
import Canvas from "./components/Canvas";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <Stack direction={'row'} overflow={'hidden'} width={'100%'} height={'100dvh'}>
      <Sidebar />
      <Canvas />
    </Stack>
  );
}

export default App;
