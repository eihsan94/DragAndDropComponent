import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { DragAndDrop } from "./components/DragAndDrop";
import { Box, Card, ChakraProvider, CSSReset } from "@chakra-ui/react";

const App = () => {
  const items = [
    {
      id: "1",
      content: (
        <Card p="1em" shadow={"2xl"}>
          Item 1
        </Card>
      ),
      dropZoneId: "home",
    },
    {
      id: "2",
      content: (
        <Card p="1em" shadow={"2xl"}>
          Item 2
        </Card>
      ),
      dropZoneId: "home",
    },
    {
      id: "3",
      content: (
        <Card p="1em" shadow={"2xl"}>
          Item 3
        </Card>
      ),
      dropZoneId: "home",
    },
  ];

  const dropZoneItems = [
    { id: "dropzone1", content: "Dropzone 1" },
    { id: "dropzone2", content: "Dropzone 2" },
  ];

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <ChakraProvider>
        <CSSReset />
        <Box p={5}>
          <DragAndDrop items={items} dropZoneItems={dropZoneItems} />
        </Box>
      </ChakraProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
