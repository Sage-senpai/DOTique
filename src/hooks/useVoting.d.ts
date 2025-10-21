export type VoteOption = {
    id: string;
    label: string;
    count: number;
};
export type Poll = {
    id: string;
    title: string;
    options: VoteOption[];
    ends_at?: string;
};
export declare const useVoting: (pollId?: string) => {
    poll: Poll | null;
    voted: boolean;
    loading: boolean;
    vote: (optionId: string) => Promise<void>;
    reload: () => Promise<void>;
};
export default useVoting;
//# sourceMappingURL=useVoting.d.ts.map