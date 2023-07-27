import React from "react";
import { useParams } from "react-router-dom";
import { useLazyAxios } from "../api/use.axios";
import NavbarLayout from "../layouts/NavbarLayout";

function BoardPage() {
    const { boardId } = useParams();
    // const {} = useLazyAxios<KanbanBoardApi>({
    //     url: `/kanban/${boardId}`,
    // });

    console.log(boardId);

    return <NavbarLayout>BoardPage, {boardId}</NavbarLayout>;
}

export default BoardPage;
