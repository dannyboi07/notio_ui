import { useEffect } from "react";
import NavbarLayout from "../layouts/NavbarLayout";
import { useLazyAxios } from "../api/use.axios";
import Spinner from "../components/Spinner/Spinner";
import Button from "../components/Button/Button";
import BoardCard from "../components/Kanban/BoardCard";

function AllBoardsPage() {
    const {
        data: userBoards,
        loading: loadingUserBoards,
        error: errorUserBoards,
        fetchData: fetchUserBoards,
    } = useLazyAxios<KanbanBoardApi[]>({
        url: "/kanban/all",
        useToast: false,
    });

    useEffect(() => {
        fetchUserBoards();
    }, []);

    return (
        <NavbarLayout>
            <div className="flex flex-1 flex-col gap-y-4">
                <h1 className="text-xl font-semibold">Kanbans</h1>
                <div
                    className={`flex flex-1 ${
                        (loadingUserBoards || errorUserBoards) &&
                        "items-center justify-center"
                    }`}
                >
                    {loadingUserBoards ? (
                        <Spinner width="2rem" height="2rem" />
                    ) : errorUserBoards ? (
                        <div className="flex flex-col items-center">
                            <h1 className="text-lg font-semibold">
                                Failed to load boards
                            </h1>
                            <p className="text-sm text-gray-500">
                                {errorUserBoards?.message ||
                                    "Internal server error"}
                            </p>
                            <Button className="mt-4" onClick={fetchUserBoards}>
                                Retry
                            </Button>
                        </div>
                    ) : (
                        userBoards?.map((board) => (
                            <BoardCard
                                key={board?.id}
                                kanbanBoard={{
                                    id: board?.id,
                                    title: board?.title,
                                    description: board?.description,
                                    createdAt: board?.created_at,
                                    updatedAt: board?.updated_at,
                                }}
                                wrapInLink
                                linkToHref={`/boards/${board?.id}`}
                            />
                        ))
                    )}
                </div>
            </div>
        </NavbarLayout>
    );
}

export default AllBoardsPage;
