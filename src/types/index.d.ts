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
}

interface UserContext extends Partial<Profile> {
    isLoggedIn: boolean;
    refresh: boolean;
}

