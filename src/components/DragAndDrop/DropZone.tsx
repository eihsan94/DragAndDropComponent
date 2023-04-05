import React, { useMemo } from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";

interface DropZoneProps {
  id: UniqueIdentifier;
  isOver: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const DropZone: React.FC<DropZoneProps> = ({ id, isOver, children, style }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Box
      ref={setNodeRef}
      borderWidth={2}
      borderColor={isOver ? "green.500" : "gray.200"}
      borderRadius="md"
      p={4}
      minW="250px"
      minHeight="250px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{
        transition: "border-color 200ms ease",
        borderColor: isOver ? "green.500" : "gray.200",
        ...style,
      }}>
      {children}
    </Box>
  );
};

export default DropZone;
