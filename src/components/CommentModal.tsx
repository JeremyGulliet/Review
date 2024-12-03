import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, comment: string) => void;
}

export const CommentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CommentModalProps) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, comment);
    setTitle("");
    setComment("");
    onClose();
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setComment((prevComment) => prevComment + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Ajouter un commentaire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-2">Commentaire</label>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded h-24"
                required
              />
              <button
                type="button"
                className="absolute bottom-2 right-2"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <BsEmojiSmile size={20} />
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7B61FF] text-white rounded"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
