import React from "react";
import "./CreatePostModal.scss";
interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreatePost?: (content: string, imageUrl?: string) => Promise<void>;
}
declare const CreatePostModal: React.FC<CreatePostModalProps>;
export default CreatePostModal;
//# sourceMappingURL=CreatePostModal.d.ts.map