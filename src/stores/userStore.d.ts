export interface SelectedUser {
    id: string;
    username: string;
    display_name: string;
    avatar?: string;
    bio?: string;
    followers_count: number;
    following_count: number;
    posts_count: number;
    verified: boolean;
    isFollowing?: boolean;
}
interface UserStoreState {
    selectedUser: SelectedUser | null;
    isOwnProfile: boolean;
    setSelectedUser: (user: SelectedUser | null, isOwn?: boolean) => void;
    clearSelectedUser: () => void;
}
export declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserStoreState>>;
export {};
//# sourceMappingURL=userStore.d.ts.map