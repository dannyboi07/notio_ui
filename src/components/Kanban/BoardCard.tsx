import { Link } from "react-router-dom";

interface BoardCardProps {
    kanbanBoard: KanbanBoard;
    wrapperClassName?: string;
    wrapInLink?: boolean;
    linkToHref?: string;
}

function BoardCard({
    kanbanBoard,
    wrapperClassName = "",
    wrapInLink = false,
    linkToHref = "",
}: BoardCardProps) {
    const core = (
        <div
            className={`flex h-fit min-h-[100px] 
                w-fit min-w-[300px] flex-col gap-y-1 
                rounded-md border border-black-300 
                px-3 py-1.5 transition-colors 
                hover:bg-slate-100 ${wrapperClassName}`}
        >
            <h3 className="font-bold">{kanbanBoard.title}</h3>
            <span className="h-[1px] w-[90%] self-center bg-black-300" />
            <p className="text-sm">{kanbanBoard.description}</p>
        </div>
    );

    if (wrapInLink) {
        return (
            <Link to={linkToHref} className="h-fit w-fit">
                {core}
            </Link>
        );
    }
    return core;
}

export default BoardCard;
