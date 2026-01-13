'use client';

import { Reorder, AnimatePresence, useDragControls } from 'framer-motion';
import { Player, PlayerRole } from '@/types';
import { X, Trophy, ChevronRight, Shield, GripVertical } from 'lucide-react';
import clsx from 'clsx';

// Separate component to use drag controls per item
function DraggablePlayerItem({
  player,
  isCaptain,
  isWK,
  role,
  onSetCaptain,
  onSetWicketKeeper,
  onRemovePlayer,
}: {
  player: Player;
  isCaptain: boolean;
  isWK: boolean;
  role: PlayerRole;
  onSetCaptain: (player: Player) => void;
  onSetWicketKeeper: (player: Player) => void;
  onRemovePlayer: (player: Player) => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={player.id}
      value={player}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.8 }}
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: 50 
      }}
      className={clsx(
        'relative group flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg',
        'bg-slate-800/50 hover:bg-slate-700/50 transition-colors',
        'border',
        isCaptain ? 'border-amber-500/50' : isWK ? 'border-emerald-500/50' : 'border-transparent'
      )}
    >
      {/* Drag Handle */}
      <div 
        className="text-slate-600 hover:text-slate-400 transition-colors cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      {/* Player Avatar */}
      <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-slate-600 flex-shrink-0">
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

      {/* Player info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span className="font-medium text-white text-sm md:text-base truncate block leading-tight">{player.name}</span>
        <span className="text-[10px] md:text-xs text-slate-500 capitalize leading-tight">{player.role}</span>
      </div>

      {/* Captain/WK Badge */}
      {(isCaptain || isWK) && (
        <div className={clsx(
          'px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-bold',
          isCaptain && isWK ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-black' : isCaptain ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black'
        )}>
          {isCaptain && isWK ? 'C/WK' : isWK ? 'WK' : 'C'}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-0.5 md:gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Toggle Captain */}
        <button
          onClick={(e) => { e.stopPropagation(); onSetCaptain(player); }}
          className={clsx(
            'p-1 md:p-1.5 rounded transition-colors',
            isCaptain 
              ? 'bg-amber-500 text-black hover:bg-amber-400' 
              : 'hover:bg-amber-500/20 text-amber-500'
          )}
          title={isCaptain ? "Remove as Captain" : "Set as Captain"}
        >
          <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

        {/* Toggle Wicket Keeper */}
        <button
          onClick={(e) => { e.stopPropagation(); onSetWicketKeeper(player); }}
          className={clsx(
            'p-1 md:p-1.5 rounded transition-colors',
            isWK 
              ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
              : 'hover:bg-emerald-500/20 text-emerald-500'
          )}
          title={isWK ? "Remove as Wicket-Keeper" : "Set as Wicket-Keeper"}
        >
          <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

        {/* Remove */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemovePlayer(player); }}
          className="p-1 md:p-1.5 rounded hover:bg-red-500/20 text-red-500 transition-colors"
          title="Remove player"
        >
          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

interface SelectedTeamPanelProps {
  players: Player[];
  captain: Player | null;
  wicketKeeper: Player | null;
  onRemovePlayer: (player: Player) => void;
  onSetCaptain: (player: Player) => void;
  onSetWicketKeeper: (player: Player) => void;
  onReorderPlayers: (players: Player[]) => void;
  onSubmit: () => void;
  onClose?: () => void;
}

export default function SelectedTeamPanel({
  players,
  captain,
  wicketKeeper,
  onRemovePlayer,
  onSetCaptain,
  onSetWicketKeeper,
  onReorderPlayers,
  onSubmit,
  onClose,
}: SelectedTeamPanelProps) {
  const isComplete = players.length === 11 && captain && wicketKeeper;

  return (
    <div className="glass rounded-xl p-3 sm:p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Drag hint */}
      {players.length > 1 && (
        <div className="mb-1.5 text-[10px] text-slate-500 flex items-center gap-1">
          <GripVertical className="w-2.5 h-2.5" />
          Drag to reorder
        </div>
      )}

      {/* Player List - Draggable */}
      <div className="flex-1 overflow-y-auto pr-1">
        <Reorder.Group 
          axis="y" 
          values={players} 
          onReorder={onReorderPlayers}
          className="space-y-1.5"
        >
          <AnimatePresence mode="popLayout">
            {players.map((player) => {
              const isCaptain = captain?.id === player.id;
              const isWK = wicketKeeper?.id === player.id;

              return (
                <DraggablePlayerItem
                  key={player.id}
                  player={player}
                  isCaptain={isCaptain}
                  isWK={isWK}
                  role={player.role}
                  onSetCaptain={onSetCaptain}
                  onSetWicketKeeper={onSetWicketKeeper}
                  onRemovePlayer={onRemovePlayer}
                />
              );
            })}
          </AnimatePresence>
        </Reorder.Group>

        {/* Empty slots */}
        <div className="space-y-1.5 mt-1.5">
          {Array.from({ length: Math.max(0, 11 - players.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border border-dashed border-slate-700/50"
            >
              <div className="w-3.5 md:w-4" />
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800/50 border border-dashed border-slate-600 flex items-center justify-center">
                <span className="text-[10px] md:text-xs text-slate-600 font-bold">{players.length + i + 1}</span>
              </div>
              <div className="flex-1">
                <div className="h-1.5 w-16 bg-slate-800/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={!isComplete}
        className={clsx(
          'mt-3 w-full py-3 rounded-lg font-display text-sm font-bold',
          'flex items-center justify-center gap-2',
          'transition-all duration-300',
          isComplete
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        )}
      >
        <span>CONFIRM TEAM</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Validation hints */}
      {!isComplete && (
        <div className="mt-2 text-center text-xs text-slate-500">
          {players.length < 11 && <p>Select {11 - players.length} more</p>}
          {players.length === 11 && !captain && <p>Select Captain</p>}
          {players.length === 11 && captain && !wicketKeeper && <p>Select Wicket-Keeper</p>}
        </div>
      )}
    </div>
  );
}
