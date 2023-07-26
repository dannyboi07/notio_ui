interface ApiError {
    status: "success" | "failed"; // success | failed
    message: string; // "User not found"
}

interface ProfileApi {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface Profile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface RootState {
    user: UserContext;
    toast: ToastContext;
}

interface UserContext extends Partial<Profile> {
    isLoggedIn: boolean;
    refresh: boolean;
}

type ToastSeverity = "success" | "info" | "warning" | "error";

interface ToastContext {
    severity: ToastSeverity;
    title: string;
    message?: string;
    open: boolean;
}

interface KanbanBoardApi {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

interface KanbanBoard {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

interface KanbanColumnApi {
    id: number;
    board_id: number;
    title: string;
    description: string;
    position: number;
    created_at: Date;
    updated_at: Date;
}

interface KanbanColumn {
    id: number;
    boardId: number;
    title: string;
    description: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}

interface KanbanBoardWithColumns extends KanbanBoard {
    columns: KanbanColumn[];
}
