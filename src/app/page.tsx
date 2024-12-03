/* eslint-disable react/no-unescaped-entities */
// page.tsx
"use client";
import { Card } from "@/components/card";
import { CommentModal } from "@/components/CommentModal";
import { AnimatePresence, motion } from "framer-motion";
import { useCardStore } from "@/stores/useCardStore";
import { AiFillStar } from "react-icons/ai";

export default function Home() {
  const {
    cards,
    mainRating,
    addCard,
    updateCardRating,
    setMainRating,
    clearAllCards,
    isFormOpen,
    setFormOpen,
  } = useCardStore();

  const resetRating = () => {
    setMainRating(0);
  };

  const handleAddCard = () => {
    if (mainRating === 0) {
      alert("Veuillez sélectionner au moins 1 étoile avant d'ajouter un avis");
      return;
    }
    setFormOpen(true);
  };

  const getRatingStats = () => {
    const stats = {
      total: cards.length,
      average: 0,
      ratings: new Array(5).fill(0),
    };

    let sum = 0;
    cards.forEach((card) => {
      if (card.rating > 0) {
        stats.ratings[card.rating - 1]++;
        sum += card.rating;
      }
    });

    stats.average = stats.total > 0 ? sum / stats.total : 0;
    return stats;
  };

  const stats = getRatingStats();
  const { deleteCard } = useCardStore();


  return (
    <main className="min-h-screen py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#333333] mb-8">
        Donne moi ton avis !
      </h1>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Section Statistiques */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Statistiques des Avis
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#333333]">Total des avis</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#333333]">Note moyenne</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {stats.average.toFixed(1)}
                  </span>
                  <AiFillStar className="text-yellow-400" />
                </div>
              </div>
              <div className="space-y-2">
                {stats.ratings.map((count, index) => (
                  <div key={index} className="relative pt-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-[#333333]">{index + 1}</span>
                        <AiFillStar className="text-yellow-400 ml-1" />
                      </div>
                      <span className="text-[#333333]">{count} avis</span>
                    </div>
                    <div className="overflow-hidden h-2 bg-gray-200 rounded">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            stats.total ? (count / stats.total) * 100 : 0
                          }%`,
                        }}
                        transition={{ duration: 1 }}
                        className="bg-yellow-400 h-full rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Carte Principale */}
          <div className="flex justify-center items-center">
            <Card
              rating={mainRating}
              onRatingChange={setMainRating}
              onAddCard={handleAddCard}
              isMainCard={true}
              onReset={resetRating}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <button
              onClick={clearAllCards}
              disabled={true} // Forcer le bouton à être désactivé
              className="px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md bg-gray-400 cursor-not-allowed text-white"
            >
              Supprimer tous les avis
            </button>

            {/* Tooltip toujours visible */}
            <div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 
          bg-gray-800 text-white text-sm px-3 py-1 rounded-md 
          opacity-0 group-hover:opacity-100 transition-opacity 
          whitespace-nowrap"
            >
              Tu n'as pas les droits pour supprimer les avis
            </div>
          </div>
        </div>

        {/* Liste des Avis */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Avis des utilisateurs
          </h2>
          {cards.length === 0 ? (
            <div className="col-span-full text-center text-black">
              Aucun avis pour le moment
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              <AnimatePresence initial={false}>
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout // Ajoute une transition fluide lors des changements de position
                    initial={{ x: 500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -500, opacity: 0 }}
                    transition={{
                      duration: 2,
                      type: "spring",
                      damping: 25,
                      stiffness: 120,
                    }}
                  >
                    <Card
                      id={card.id}
                      rating={card.rating}
                      title={card.title}
                      comment={card.comment}
                      onRatingChange={(rating) =>
                        updateCardRating(card.id, rating)
                      }
                      onDelete={deleteCard}
                      onAddCard={() => {}}
                      isMainCard={false}
                      onReset={resetRating}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <CommentModal
          isOpen={isFormOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={addCard}
        />
      </div>
    </main>
  );
}
