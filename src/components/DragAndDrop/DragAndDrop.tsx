import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import DragItem from "./DragItem";
import DropZone from "./DropZone";

interface DragItemProps {
  id: UniqueIdentifier;
  content: JSX.Element | string;
  dropZoneId: UniqueIdentifier;
}
interface DragAndDropProps {
  items: DragItemProps[];
  dropZoneItems: { id: UniqueIdentifier; content: JSX.Element | string }[];
}

export const DragAndDrop: React.FC<DragAndDropProps> = React.memo(
  ({ items, dropZoneItems }) => {
    const [droppedItems, setDroppedItems] = useState<DragItemProps[]>(items);
    const [activeDropZone, setActiveDropZone] =
      useState<UniqueIdentifier | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      const currentItem = droppedItems.find((item) => item.id === active.id);
      const currentDropZoneId = currentItem?.dropZoneId;
      const noChange = currentDropZoneId === over?.id;
      setActiveDropZone(null);
      if (noChange) {
        return;
      }
      const newDropZoneId = over?.id || "home";
      const newItem = {
        id: active.id,
        content: items.find((item) => item.id === active.id)?.content || "",
        dropZoneId: newDropZoneId,
      };
      const newDroppedItems = currentItem
        ? droppedItems.map((item) => (item.id === active.id ? newItem : item))
        : [...droppedItems, newItem];
      setDroppedItems(newDroppedItems);
    };

    const handleDragOver = (event: DragOverEvent) => {
      setActiveDropZone(event.over?.id || null);
    };

    const filteredDroppedItems: {
      [key: string]: DragItemProps[];
    } = useMemo(
      () => ({
        home: droppedItems.filter((item) => item.dropZoneId === "home"),
        ...dropZoneItems.reduce(
          (acc, { id }) => ({
            ...acc,
            [id]: droppedItems.filter((item) => item.dropZoneId === id),
          }),
          {}
        ),
      }),
      [droppedItems, dropZoneItems]
    );

    return (
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCenter}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {Object.entries(filteredDroppedItems).map(([id, items]) => (
            <DropZone key={id} id={id} isOver={activeDropZone === id}>
              <h3>
                {id === "home"
                  ? "Draggable Items"
                  : dropZoneItems.find((d) => d.id === id)?.content}
              </h3>
              {items.map((item) => (
                <DragItem key={item.id} id={item.id}>
                  {item.content}
                </DragItem>
              ))}
            </DropZone>
          ))}
        </div>
      </DndContext>
    );
  }
);
