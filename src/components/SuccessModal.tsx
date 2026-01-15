'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, X, Share2 } from 'lucide-react';
import clsx from 'clsx';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  captain: Player | null;
  wicketKeeper: Player | null;
  onShare?: () => void;
  isSharedTeam?: boolean;
}

export default function SuccessModal({
  isOpen,
  onClose,
  players,
  captain,
  wicketKeeper,
  onShare,
  isSharedTeam = false,
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
            className="relative w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden"
          >

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {/* Content */}
            <div className="relative p-4 sm:p-5 text-center">
              {/* Trophy animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, -5, 5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <div className="relative">
                  <Trophy className="w-10 h-10 text-amber-400" />
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
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {isSharedTeam ? 'Shared Howzat11' : 'Your Howzat11'}
                </h2>
              </motion.div>

              {/* Team grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 space-y-2"
              >
                {/* First row - 3 players centered */}
                <div className="flex justify-center gap-2">
                  {players.slice(0, 3).map((player, index) => {
                    const isCaptain = captain?.id === player.id;
                    const isWK = wicketKeeper?.id === player.id;
                    
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className={clsx(
                          'player-card relative',
                          'w-[23%] aspect-[4/5] rounded-xl overflow-hidden',
                          'bg-slate-900/50 backdrop-blur-sm',
                          'border',
                          isCaptain || isWK ? 'border-amber-400' : 'border-white/10'
                        )}
                      >
                        {/* Badge indicator */}
                        {(isCaptain || isWK) && (
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
                            <div className={clsx(
                              'px-2 py-0.5 rounded-full font-display text-[8px] font-bold text-black',
                              isCaptain && isWK && 'bg-gradient-to-r from-amber-500 to-emerald-500',
                              isCaptain && !isWK && 'bg-gradient-to-r from-amber-500 to-amber-600',
                              !isCaptain && isWK && 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            )}>
                              {isCaptain && isWK ? 'C/WK' : isCaptain ? 'C' : 'WK'}
                            </div>
                          </div>
                        )}

                        {/* Card content */}
                        <div className="h-full flex flex-col justify-center p-1 md:p-1.5">
                          {/* Avatar */}
                          <div className="flex items-center justify-center">
                            <div className={clsx(
                              'relative w-10 h-10 sm:w-12 sm:h-12 rounded-full',
                              'border-2 overflow-hidden shadow-lg shadow-black/30',
                              isCaptain || isWK ? 'border-amber-400' : 'border-slate-600',
                              !player.imageUrl && 'bg-gradient-to-br from-slate-700 to-slate-800'
                            )}>
                              {player.imageUrl ? (
                                <img 
                                  src={player.imageUrl} 
                                  alt={player.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-sm font-display font-bold text-slate-400">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              )}
                              <img 
                                src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
                                alt=""
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
                              />
                            </div>
                          </div>

                          {/* Player name */}
                          <div className="text-center mt-1">
                            <h3 className="font-display text-[9px] sm:text-[10px] font-bold text-white truncate leading-tight">
                              {player.name}
                            </h3>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-0.5 text-center mt-1">
                            {player.stats.strikeRate && (
                              <div className={clsx(
                                'bg-blue-500/20 rounded p-0.5',
                                !player.stats.economy && 'col-span-2'
                              )}>
                                <div className="font-score text-[9px] font-bold text-blue-400">
                                  {player.stats.strikeRate.toFixed(0)}
                                </div>
                                <div className="text-[6px] text-blue-400/70">SR</div>
                              </div>
                            )}
                            {player.stats.economy && (
                              <div className={clsx(
                                'bg-red-500/20 rounded p-0.5',
                                !player.stats.strikeRate && 'col-span-2'
                              )}>
                                <div className="font-score text-[9px] font-bold text-red-400">
                                  {player.stats.economy.toFixed(1)}
                                </div>
                                <div className="text-[6px] text-red-400/70">ECO</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Remaining rows - 4 players each */}
                <div className="grid grid-cols-4 gap-2">
                  {players.slice(3).map((player, index) => {
                    const isCaptain = captain?.id === player.id;
                    const isWK = wicketKeeper?.id === player.id;
                    
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index + 3) * 0.05 }}
                        className={clsx(
                          'player-card relative',
                          'w-full aspect-[4/5] rounded-xl overflow-hidden',
                          'bg-slate-900/50 backdrop-blur-sm',
                          'border',
                          isCaptain || isWK ? 'border-amber-400' : 'border-white/10'
                        )}
                      >
                        {/* Badge indicator */}
                        {(isCaptain || isWK) && (
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
                            <div className={clsx(
                              'px-2 py-0.5 rounded-full font-display text-[8px] font-bold text-black',
                              isCaptain && isWK && 'bg-gradient-to-r from-amber-500 to-emerald-500',
                              isCaptain && !isWK && 'bg-gradient-to-r from-amber-500 to-amber-600',
                              !isCaptain && isWK && 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            )}>
                              {isCaptain && isWK ? 'C/WK' : isCaptain ? 'C' : 'WK'}
                            </div>
                          </div>
                        )}

                        {/* Card content */}
                        <div className="h-full flex flex-col justify-center p-1 md:p-1.5">
                          {/* Avatar */}
                          <div className="flex items-center justify-center">
                            <div className={clsx(
                              'relative w-10 h-10 sm:w-12 sm:h-12 rounded-full',
                              'border-2 overflow-hidden shadow-lg shadow-black/30',
                              isCaptain || isWK ? 'border-amber-400' : 'border-slate-600',
                              !player.imageUrl && 'bg-gradient-to-br from-slate-700 to-slate-800'
                            )}>
                              {player.imageUrl ? (
                                <img 
                                  src={player.imageUrl} 
                                  alt={player.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-sm font-display font-bold text-slate-400">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              )}
                              <img 
                                src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
                                alt=""
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
                              />
                            </div>
                          </div>

                          {/* Player name */}
                          <div className="text-center mt-1">
                            <h3 className="font-display text-[9px] sm:text-[10px] font-bold text-white truncate leading-tight">
                              {player.name}
                            </h3>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-0.5 text-center mt-1">
                            {player.stats.strikeRate && (
                              <div className={clsx(
                                'bg-blue-500/20 rounded p-0.5',
                                !player.stats.economy && 'col-span-2'
                              )}>
                                <div className="font-score text-[9px] font-bold text-blue-400">
                                  {player.stats.strikeRate.toFixed(0)}
                                </div>
                                <div className="text-[6px] text-blue-400/70">SR</div>
                              </div>
                            )}
                            {player.stats.economy && (
                              <div className={clsx(
                                'bg-red-500/20 rounded p-0.5',
                                !player.stats.strikeRate && 'col-span-2'
                              )}>
                                <div className="font-score text-[9px] font-bold text-red-400">
                                  {player.stats.economy.toFixed(1)}
                                </div>
                                <div className="text-[6px] text-red-400/70">ECO</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 flex gap-4 justify-center"
              >
                {onShare && (
                  <button 
                    onClick={onShare}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">Share</span>
                  </button>
                )}
                {isSharedTeam && (
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl transition-colors text-black font-bold"
                  >
                    <span>Build Your Howzat11</span>
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
