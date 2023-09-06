import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyAxios } from "../api/use.axios";
import NavbarLayout from "../layouts/NavbarLayout";
import Spinner from "../components/Spinner/Spinner";
import KanbanColumn from "../components/Kanban/KanbanColumn";

function BoardPage() {
    const { boardId } = useParams();
    const [board, setBoard] = useState<KanbanBoardWithColumns | null>(null);
    const boardApi = useLazyAxios<KanbanBoardWithColumnsAndCardsApi>({
        url: `/kanban/${boardId}`,
    });
    const updateBoardApi = useLazyAxios<KanbanBoardApi>({
        url: `/kanban/${boardId}`,
        method: "PUT",
        body: board ? board : undefined,
    });
    const [shouldUpdateBoard, setShouldUpdateBoard] = useState<boolean>(false);

    useEffect(() => {
        boardApi.fetchData();
    }, [boardId]);

    useEffect(() => {
        if (boardApi.loading) return;

        if (boardApi.data && boardApi.error === null) {
            setBoard({
                id: boardApi.data.id,
                title: boardApi.data.title,
                description: boardApi.data.description,
                columns: boardApi.data.columns.map((column) => ({
                    id: column.id,
                    boardId: column.board_id,
                    title: column.title,
                    description: column.description,
                    position: column.position,
                    cards: column.cards.map((card) => ({
                        id: card.id,
                        columnId: card.column_id,
                        title: card.title,
                        description: card.description,
                        position: card.position,
                        createdAt: card.created_at,
                        updatedAt: card.updated_at,
                    })),
                    createdAt: column.created_at,
                    updatedAt: column.updated_at,
                })),
                createdAt: boardApi.data.created_at,
                updatedAt: boardApi.data.updated_at,
            });
        } else {
            setBoard(null);
        }
    }, [boardApi.loading]);

    useEffect(() => {
        if (shouldUpdateBoard) {
            handleBoardUpdate();
            setShouldUpdateBoard(false);
        }
    }, [shouldUpdateBoard]);

    if (boardApi.loading) {
        return (
            <NavbarLayout>
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner width="2rem" height="2rem" />
                </div>
            </NavbarLayout>
        );
    }

    const handleBoardTextChange =
        (fieldName: "title" | "description") =>
        (event: React.FocusEvent<HTMLHeadElement | HTMLParagraphElement>) => {
            if (board === null) return;

            setBoard({
                ...board,
                [fieldName]: event.target.textContent,
            });

            if (!shouldUpdateBoard) setShouldUpdateBoard(true);
        };

    function handleBoardUpdate() {
        if (boardApi.loading || updateBoardApi.loading || board === null)
            return;

        if (
            board.title === updateBoardApi.data?.title &&
            board.description === updateBoardApi.data?.description
        )
            return;

        updateBoardApi.fetchData();
    }

    return (
        <NavbarLayout>
            <div className="flex flex-col gap-y-2 py-8">
                <h2
                    className="max-w-fit text-4xl font-bold"
                    contentEditable
                    onBlur={handleBoardTextChange("title")}
                >
                    {board?.title}
                </h2>
                <p
                    className="max-w-fit text-lg"
                    contentEditable
                    onBlur={handleBoardTextChange("description")}
                >
                    {board?.description}
                </p>
                <div
                    className={`relative flex gap-x-10 px-8 py-4 before:absolute 
                        before:left-[50%] before:top-0 
                        before:block before:h-[1px] 
                        before:w-5/6 before:translate-x-[-50%] before:bg-black-300`}
                >
                    {board?.columns.map((column) => (
                        <KanbanColumn key={column.id} column={column} />
                    ))}
                </div>
            </div>
        </NavbarLayout>
    );
}

export default BoardPage;
