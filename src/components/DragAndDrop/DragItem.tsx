import React from "react";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { Box, BoxProps } from "@chakra-ui/react";

interface DragItemProps extends Omit<BoxProps, "id"> {
  id: UniqueIdentifier;
  children: React.ReactNode;
}

const DragItem: React.FC<DragItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const transformCSS = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  const style = {
    transform: transformCSS,
    willChange: "transform",
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      sx={{ touchAction: "none" }}
      userSelect="none"
      marginY={2}
      padding={1}
      cursor={transform ? "grabbing" : "grab"}
      // borderWidth={1}
      // borderColor="gray.200"
      // borderRadius="md"
    >
      {children}
    </Box>
  );
};

export default DragItem;
