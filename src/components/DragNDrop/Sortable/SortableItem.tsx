import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: string | number;
    className?: string;
    children: React.ReactNode;
}

function SortableItem({ id, className = "", children }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            className={`touch-none focus:z-10 active:z-10 ${className}`}
            style={style}
            {...attributes}
            {...listeners}
        >
            {children}
        </div>
    );
}

export default SortableItem;
