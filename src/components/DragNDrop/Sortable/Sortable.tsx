import React from "react";
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface Props {
    items: any[];
    onDragEnd?: (e: DragEndEvent) => void;
    children: React.ReactNode;
}

function onDragEndHelper<T extends { id: string | number }>(
    e: DragEndEvent,
    items: T[],
): T[] {
    const { active, over } = e;

    let oldIndex = null;
    let newIndex = null;

    for (let i = 0; i < items.length; i++) {
        if (items[i].id === active.id) oldIndex = i;
        if (items[i].id === over?.id) newIndex = i;
    }

    if (oldIndex === null || newIndex === null) return items;
    if (oldIndex === newIndex) return items;

    return arrayMove(items, oldIndex, newIndex);
}

function Sortable({ items = [], onDragEnd, children }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext items={items}>{children}</SortableContext>
        </DndContext>
    );
}

export { onDragEndHelper };
export type { DragEndEvent };
export default Sortable;
