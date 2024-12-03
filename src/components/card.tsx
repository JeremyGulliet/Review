import { BsRepeat } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

interface CardProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onAddCard: () => void;
  isMainCard?: boolean;
  title?: string;
  comment?: string;
  onReset: () => void;
}

export const Card = ({
  rating,
  onRatingChange,
  onAddCard,
  isMainCard = false,
  title,
  comment,
  onReset,
}: CardProps) => {
  const handleClick = (starIndex: number) => {
    if (!isMainCard) return;

    if (rating === starIndex + 1) {
      onRatingChange(0);
    } else {
      onRatingChange(starIndex + 1);
    }
  };

  // Design pour les cards d'avis
  if (!isMainCard) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                  w-full max-w-[280px] p-4 border border-gray-100 hover:border-purple-200"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="w-4 h-4">
                {index < rating ? (
                  <AiFillStar size={16} className="text-[#7B61FF]" />
                ) : (
                  <AiOutlineStar size={16} className="text-[#7B61FF]" />
                )}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-semibold text-lg text-[#333333] mb-2 line-clamp-2">
          {title || "Avis utilisateur"}
        </h3>

        <p className="text-base text-[#333333] line-clamp-3 min-h-[3rem]">
          {comment || "Pas de commentaire"}
        </p>

        <div className="mt-3 flex items-center">
          <div className="bg-purple-50 text-[#7B61FF] text-xs px-2 py-1 rounded-full">
            {rating}/5
          </div>
        </div>
      </motion.div>
    );
  }

  // Design pour la card principale
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className="flex flex-col items-center bg-white w-full max-w-[384px] min-h-[320px] 
                 border border-[#E0E0E0] rounded-lg p-4 sm:p-6 gap-4 mx-auto"
    >
      <div className="flex w-full items-center justify-end p-2 gap-4">
        <button
          onClick={() => onReset()}
          className="hover:scale-125 transition-transform"
        >
          <BsRepeat size={20} className="text-gray-500 cursor-pointer" />
        </button>
        <button
          onClick={onAddCard}
          className="hover:scale-125 transition-transform"
        >
          <IoMdAddCircleOutline
            size={20}
            className="text-gray-500 cursor-pointer"
          />
        </button>
      </div>

      <h1 className="font-semibold text-xl sm:text-2xl text-center text-[#333333] px-2">
        {title || "Quel note donnerais-tu à ce challenge ?"}
      </h1>

      <p className="text-sm sm:text-base text-center text-[#333333] px-2">
        {comment ||
          "Bon j'espère que tu vas mettre 5 évidemment, si ce n'est pas le cas viens me dire pourquoi !"}
      </p>

      <div className="flex justify-center items-center w-full py-2">
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="w-10 h-10 sm:w-12 sm:h-12 p-1 sm:p-2 
                         cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleClick(index)}
            >
              {index < rating ? (
                <AiFillStar className="w-full h-full text-[#7B61FF]" />
              ) : (
                <AiOutlineStar className="w-full h-full text-[#7B61FF]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
