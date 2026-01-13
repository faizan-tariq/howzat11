'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Sparkles, X, Share2, Download } from 'lucide-react';
import clsx from 'clsx';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  captain: Player | null;
  wicketKeeper: Player | null;
}

export default function SuccessModal({
  isOpen,
  onClose,
  players,
  captain,
  wicketKeeper,
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden"
          >
            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className={clsx(
                    'absolute w-3 h-3 rounded-sm',
                    ['bg-amber-400', 'bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-red-400'][i % 5]
                  )}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Trophy animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, -5, 5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Trophy className="w-20 h-20 text-amber-400" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                  TEAM CONFIRMED!
                </h2>
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Your Dream XI is ready</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </motion.div>

              {/* Team summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Captain */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-2">CAPTAIN</div>
                    <div className="relative w-16 h-16 mx-auto rounded-full border-3 border-amber-400 overflow-hidden mb-2">
                      {captain?.imageUrl && (
                        <img 
                          src={captain.imageUrl} 
                          alt={captain.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <img 
                        src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
                        alt=""
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
                      />
                    </div>
                    <div className="font-medium text-white text-sm">{captain?.name}</div>
                  </div>

                  {/* Wicket Keeper */}
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-2">WICKET-KEEPER</div>
                    <div className="relative w-16 h-16 mx-auto rounded-full border-3 border-emerald-400 overflow-hidden mb-2">
                      {wicketKeeper?.imageUrl && (
                        <img 
                          src={wicketKeeper.imageUrl} 
                          alt={wicketKeeper.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <img 
                        src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
                        alt=""
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
                      />
                    </div>
                    <div className="font-medium text-white text-sm">{wicketKeeper?.name}</div>
                  </div>
                </div>

                {/* Team list */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {players.filter(p => p.id !== captain?.id && p.id !== wicketKeeper?.id).map((player) => (
                    <div
                      key={player.id}
                      className="bg-slate-700/50 rounded-lg p-2 text-center"
                    >
                      <div className="relative w-8 h-8 mx-auto rounded-full overflow-hidden mb-1">
                        {player.imageUrl && (
                          <img 
                            src={player.imageUrl} 
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <img 
                          src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
                          alt=""
                          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
                        />
                      </div>
                      <div className="text-xs text-slate-400 truncate">{player.name.split(' ').pop()}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex gap-4 justify-center"
              >
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl transition-colors text-black font-bold">
                  <Download className="w-5 h-5" />
                  <span>Save Team</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
