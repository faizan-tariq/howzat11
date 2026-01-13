'use client';

import { motion } from 'framer-motion';
import { Player } from '@/types';
import clsx from 'clsx';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onSelect: (player: Player) => void;
  isCaptain?: boolean;
  isWicketKeeper?: boolean;
}

export default function PlayerCard({
  player,
  isSelected,
  onSelect,
  isCaptain,
  isWicketKeeper,
}: PlayerCardProps) {

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(player)}
      className={clsx(
        'player-card relative cursor-pointer',
        'w-full aspect-[3/4] md:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden',
        'transition-all duration-300',
        isSelected && 'selected-glow'
      )}
      style={{ perspective: '1000px' }}
    >
      {/* Card Background */}
      <div className={clsx(
        'absolute inset-0',
        'bg-slate-900/10 backdrop-blur-sm',
        'border sm:border-2 rounded-xl sm:rounded-2xl',
        isSelected ? 'border-amber-400' : 'border-white/10 hover:border-white/20'
      )}>
        {/* Shine effect */}
        <div className="player-card-shine rounded-xl sm:rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-1.5 sm:p-2 md:p-3">
        {/* Player Avatar with Kit Overlay */}
        <div className="flex items-center justify-center">
          <motion.div 
            className={clsx(
              'relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full',
              'border-2 sm:border-4 overflow-hidden',
              'shadow-lg shadow-black/30',
              isSelected ? 'border-amber-400' : 'border-slate-600',
              !player.imageUrl && 'bg-gradient-to-br from-slate-700 to-slate-800'
            )}
            animate={isSelected ? { 
              boxShadow: ['0 0 0 0 rgba(251, 191, 36, 0.4)', '0 0 0 15px rgba(251, 191, 36, 0)']
            } : { boxShadow: 'none' }}
            transition={isSelected ? { duration: 1.5, repeat: Infinity } : { duration: 0.2 }}
          >
            {player.imageUrl ? (
              <img 
                src={player.imageUrl} 
                alt={player.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-lg sm:text-2xl md:text-4xl font-display font-bold text-slate-400">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            {/* Kit Overlay - inside circle, aligned from bottom */}
            <img 
              src="https://howzat11.s3.us-east-1.amazonaws.com/kit.png"
              alt=""
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-auto pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Player Info */}
        <div className="text-center mt-1 sm:mt-2">
          <h3 className="font-display text-[10px] sm:text-sm md:text-lg font-bold text-white truncate leading-tight">
            {player.name}
          </h3>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-0.5 sm:gap-1 text-center mt-1 sm:mt-2">
          {player.stats.strikeRate && (
            <div className={clsx(
              'bg-blue-500/20 rounded sm:rounded-lg p-0.5 sm:p-1.5',
              !player.stats.economy && 'col-span-2'
            )}>
              <div className="font-score text-[10px] sm:text-sm md:text-base font-bold text-blue-400">
                {player.stats.strikeRate.toFixed(1)}
              </div>
              <div className="text-[7px] sm:text-[10px] text-blue-400/70">SR</div>
            </div>
          )}
          {player.stats.economy && (
            <div className={clsx(
              'bg-red-500/20 rounded sm:rounded-lg p-0.5 sm:p-1.5',
              !player.stats.strikeRate && 'col-span-2'
            )}>
              <div className="font-score text-[10px] sm:text-sm md:text-base font-bold text-red-400">
                {player.stats.economy.toFixed(2)}
              </div>
              <div className="text-[7px] sm:text-[10px] text-red-400/70">ECO</div>
            </div>
          )}
          {!player.stats.strikeRate && !player.stats.economy && (
            <div className="col-span-2 bg-slate-800/50 rounded sm:rounded-lg p-0.5 sm:p-1.5">
              <div className="text-[8px] sm:text-xs text-slate-500">No stats</div>
            </div>
          )}
        </div>

        {/* Captain Badge */}
        {isCaptain && !isWicketKeeper && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-display text-[8px] sm:text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-black">
              C
            </div>
          </motion.div>
        )}

        {/* Wicket-Keeper Badge */}
        {isWicketKeeper && !isCaptain && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-display text-[8px] sm:text-xs font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-black">
              WK
            </div>
          </motion.div>
        )}

        {/* Both Captain & WK Badge */}
        {isCaptain && isWicketKeeper && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-display text-[8px] sm:text-xs font-bold bg-gradient-to-r from-amber-500 to-emerald-500 text-black">
              C/WK
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
