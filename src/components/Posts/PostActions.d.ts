import React from 'react';
import './PostActions.scss';
interface PostActionsProps {
    stats: {
        likes?: number;
        comments?: number;
        reposts?: number;
        shares?: number;
    };
    userInteraction: {
        liked?: boolean;
        saved?: boolean;
        reposted?: boolean;
    };
    onLike: () => void;
    onSave: () => void;
    onShare?: () => void;
}
declare const PostActions: React.FC<PostActionsProps>;
export default PostActions;
//# sourceMappingURL=PostActions.d.ts.map