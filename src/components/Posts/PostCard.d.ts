import React from "react";
import "./PostCard.scss";
interface Author {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
}
interface Media {
    type: string;
    url: string;
}
interface Stats {
    views?: number;
    likes?: number;
    comments?: number;
    reposts?: number;
    shares?: number;
}
interface UserInteraction {
    liked?: boolean;
    saved?: boolean;
    reposted?: boolean;
}
interface Post {
    id: string;
    author: Author;
    content: string;
    media?: Media[];
    createdAt: Date;
    stats?: Stats;
    userInteraction?: UserInteraction;
}
interface PostCardProps {
    post?: Post | null;
    onLike?: () => void;
    onShare?: () => void;
}
declare const PostCard: React.FC<PostCardProps>;
export default PostCard;
//# sourceMappingURL=PostCard.d.ts.map