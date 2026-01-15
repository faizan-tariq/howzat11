'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, TOTAL_PLAYERS } from '@/types';
import { availablePlayers } from '@/data/players';
import PlayerCard from '@/components/PlayerCard';
import SelectedTeamPanel from '@/components/SelectedTeamPanel';
import SuccessModal from '@/components/SuccessModal';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const STORAGE_KEY = 'howzat11_team';

interface StoredState {
  selectedPlayerIds: string[];
  captainId: string | null;
  wicketKeeperId: string | null;
}

// Encode team data into a URL-safe string
function encodeTeamData(data: StoredState): string {
  const compact = {
    p: data.selectedPlayerIds,
    c: data.captainId,
    w: data.wicketKeeperId,
  };
  return btoa(JSON.stringify(compact));
}

// Decode team data from URL parameter
function decodeTeamData(encoded: string): StoredState | null {
  try {
    const compact = JSON.parse(atob(encoded));
    return {
      selectedPlayerIds: compact.p || [],
      captainId: compact.c || null,
      wicketKeeperId: compact.w || null,
    };
  } catch {
    return null;
  }
}

export default function Home() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<Player | null>(null);
  const [wicketKeeper, setWicketKeeper] = useState<Player | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Shared team state (from URL)
  const [sharedTeam, setSharedTeam] = useState<{
    players: Player[];
    captain: Player | null;
    wicketKeeper: Player | null;
  } | null>(null);
  const [showSharedModal, setShowSharedModal] = useState(false);

  // Load state from localStorage and check URL for shared team
  useEffect(() => {
    // Check URL for shared team
    const urlParams = new URLSearchParams(window.location.search);
    const teamParam = urlParams.get('team');
    
    if (teamParam) {
      const decoded = decodeTeamData(teamParam);
      if (decoded) {
        const sharedPlayers = decoded.selectedPlayerIds
          .map(id => availablePlayers.find(p => p.id === id))
          .filter((p): p is Player => p !== undefined);
        
        const sharedCaptain = decoded.captainId 
          ? availablePlayers.find(p => p.id === decoded.captainId) || null 
          : null;
        
        const sharedWK = decoded.wicketKeeperId 
          ? availablePlayers.find(p => p.id === decoded.wicketKeeperId) || null 
          : null;
        
        if (sharedPlayers.length > 0) {
          setSharedTeam({
            players: sharedPlayers,
            captain: sharedCaptain,
            wicketKeeper: sharedWK,
          });
          setShowSharedModal(true);
          
          // Clear the URL parameter without reloading
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    }
    
    // Load from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredState = JSON.parse(stored);
        
        // Restore selected players
        const players = data.selectedPlayerIds
          .map(id => availablePlayers.find(p => p.id === id))
          .filter((p): p is Player => p !== undefined);
        setSelectedPlayers(players);
        
        // Restore captain
        if (data.captainId) {
          const cap = availablePlayers.find(p => p.id === data.captainId);
          if (cap) setCaptain(cap);
        }
        
        // Restore wicket keeper
        if (data.wicketKeeperId) {
          const wk = availablePlayers.find(p => p.id === data.wicketKeeperId);
          if (wk) setWicketKeeper(wk);
        }
      }
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    
    const data: StoredState = {
      selectedPlayerIds: selectedPlayers.map(p => p.id),
      captainId: captain?.id || null,
      wicketKeeperId: wicketKeeper?.id || null,
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [selectedPlayers, captain, wicketKeeper, isLoaded]);

  // Check if player can be selected
  const canSelectPlayer = useCallback((player: Player): boolean => {
    if (selectedPlayers.length >= TOTAL_PLAYERS) return false;
    if (selectedPlayers.some(p => p.id === player.id)) return false;
    return true;
  }, [selectedPlayers]);

  // Handle player selection
  const handleSelectPlayer = useCallback((player: Player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      // Remove player
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
      if (captain?.id === player.id) setCaptain(null);
      if (wicketKeeper?.id === player.id) setWicketKeeper(null);
    } else if (canSelectPlayer(player)) {
      // Add player
      setSelectedPlayers(prev => [...prev, player]);
    }
  }, [selectedPlayers, captain, wicketKeeper, canSelectPlayer]);

  // Handle captain/wk selection
  const handleSetCaptain = useCallback((player: Player | null) => {
    setCaptain(prev => prev?.id === player?.id ? null : player);
  }, []);

  const handleSetWicketKeeper = useCallback((player: Player | null) => {
    setWicketKeeper(prev => prev?.id === player?.id ? null : player);
  }, []);

  // Handle reordering players (for batting order)
  const handleReorderPlayers = useCallback((reorderedPlayers: Player[]) => {
    setSelectedPlayers(reorderedPlayers);
  }, []);

  // Handle team submission
  const handleSubmit = useCallback(() => {
    if (selectedPlayers.length === 11 && captain && wicketKeeper) {
      setShowSuccess(true);
    }
  }, [selectedPlayers, captain, wicketKeeper]);

  // Reset team
  const handleReset = useCallback(() => {
    setSelectedPlayers([]);
    setCaptain(null);
    setWicketKeeper(null);
    setShowSuccess(false);
  }, []);

  // Handle sharing team
  const handleShare = useCallback(async () => {
    const data: StoredState = {
      selectedPlayerIds: selectedPlayers.map(p => p.id),
      captainId: captain?.id || null,
      wicketKeeperId: wicketKeeper?.id || null,
    };
    
    const encoded = encodeTeamData(data);
    const shareUrl = `${window.location.origin}${window.location.pathname}?team=${encoded}`;
    
    // Helper to copy to clipboard with fallback
    const copyToClipboard = async (text: string) => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          alert('Link copied to clipboard!');
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Link copied to clipboard!');
        }
      } catch {
        // If all else fails, show the URL to copy manually
        prompt('Copy this link to share your team:', text);
      }
    };
    
    // Try Web Share API first (mobile native share)
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ url: shareUrl });
        return; // Success, exit early
      } catch (err) {
        // User cancelled sharing - don't do anything
        if ((err as Error).name === 'AbortError') {
          return;
        }
        // Other error - fall through to clipboard
      }
    }
    
    // Fallback: copy to clipboard
    await copyToClipboard(shareUrl);
  }, [selectedPlayers, captain, wicketKeeper]);

  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-20 select-none relative z-10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {availablePlayers.map((player) => {
                const isSelected = selectedPlayers.some(p => p.id === player.id);
                const canSelect = canSelectPlayer(player);

                return (
                  <div
                    key={player.id}
                    className={clsx(
                      !isSelected && !canSelect && 'opacity-40 pointer-events-none'
                    )}
                  >
                    <PlayerCard
                      player={player}
                      isSelected={isSelected}
                      onSelect={handleSelectPlayer}
                      isCaptain={captain?.id === player.id}
                      isWicketKeeper={wicketKeeper?.id === player.id}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <SelectedTeamPanel
                players={selectedPlayers}
                captain={captain}
                wicketKeeper={wicketKeeper}
                onRemovePlayer={handleSelectPlayer}
                onSetCaptain={handleSetCaptain}
                onSetWicketKeeper={handleSetWicketKeeper}
                onReorderPlayers={handleReorderPlayers}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 lg:hidden"
            >
              <div className="h-full bg-slate-900 p-4">
                <SelectedTeamPanel
                  players={selectedPlayers}
                  captain={captain}
                  wicketKeeper={wicketKeeper}
                  onRemovePlayer={handleSelectPlayer}
                  onSetCaptain={handleSetCaptain}
                  onSetWicketKeeper={handleSetWicketKeeper}
                  onReorderPlayers={handleReorderPlayers}
                  onSubmit={handleSubmit}
                  onClose={() => setShowSidebar(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal (User's team) */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        players={selectedPlayers}
        captain={captain}
        wicketKeeper={wicketKeeper}
        onShare={handleShare}
      />

      {/* Shared Team Modal */}
      {sharedTeam && (
        <SuccessModal
          isOpen={showSharedModal}
          onClose={() => setShowSharedModal(false)}
          players={sharedTeam.players}
          captain={sharedTeam.captain}
          wicketKeeper={sharedTeam.wicketKeeper}
          isSharedTeam
        />
      )}

      {/* Floating Player Count (Mobile) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
        <motion.div
          animate={{ y: selectedPlayers.length > 0 ? 0 : 100 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl"
        >
          <div className="flex -space-x-2">
            {selectedPlayers.slice(0, 4).map((player) => (
              <div
                key={player.id}
                className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-800 overflow-hidden"
              >
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
            ))}
            {selectedPlayers.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                +{selectedPlayers.length - 4}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSidebar(true)}
            className="px-6 py-2 bg-amber-500 text-black font-bold rounded-lg whitespace-nowrap"
          >
            View Team
          </button>
        </motion.div>
      </div>
    </main>
  );
}
