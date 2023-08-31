import React from "react";

interface Props {
    card: KanbanCard;
    enableDrag?: boolean;
}

function KanbanCard({ card, enableDrag = true }: Props) {
    return (
        <div
            className={`flex min-h-[100px] flex-col rounded-md bg-black-200 px-2 py-1 transition-colors ${
                enableDrag && "hover:cursor-pointer hover:bg-black-300"
            }`}
        >
            <h4 className="py-1 font-bold">{card?.title}</h4>
            <span className="h-[1px] w-[90%] self-center bg-white" />
            <p className="py-1">{card?.description}</p>
        </div>
    );
}

export default KanbanCard;
