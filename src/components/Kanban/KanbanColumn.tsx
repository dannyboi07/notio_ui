import React from "react";
import KanbanCard from "./KanbanCard";

interface Props {
    column: KanbanColumnWithCards;
}

function KanbanColumn({ column }: Props) {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <h3 className="text-lg font-bold">{column.title}</h3>
                <p>{column.description}</p>
            </div>
            <div className="flex flex-col gap-y-2">
                {column?.cards?.map((card) => (
                    <KanbanCard key={card?.id} card={card} />
                ))}
            </div>
        </div>
    );
}

export default KanbanColumn;
