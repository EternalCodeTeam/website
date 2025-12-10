"use client";

import type React from "react";
import { useState } from "react";

import { Play } from "@/components/icons/play";
import { Stop } from "@/components/icons/stop";
import { Button } from "@/components/ui/button";

export type Sound = {
  id: string;
  name: string;
  path: string;
  category?: string;
};

type SoundTableProps = {
  sounds: Sound[];
  selectedSound: Sound | undefined;
  onSelectSound: (soundId: string) => void;
  onPlaySound: (sound: Sound) => void;
  isPlaying: boolean;
  onStopSound: () => void;
  loading: boolean;
  currentlyPlayingId: string | null;
  playbackError: string | null;
};

export function SoundTable({
  sounds,
  selectedSound,
  onSelectSound,
  onPlaySound,
  isPlaying,
  onStopSound,
  loading,
  currentlyPlayingId,
  playbackError,
}: SoundTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Simple filtering based on search query
  const filteredSounds = sounds.filter(
    (sound) =>
      !searchQuery ||
      sound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get paginated sounds
  const paginatedSounds = filteredSounds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredSounds.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectSound = (soundId: string) => {
    if (isPlaying && currentlyPlayingId) {
      onStopSound();
    }
    onSelectSound(soundId);
  };

  const handlePlayStopSound = (sound: Sound, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && currentlyPlayingId === sound.id) {
      onStopSound();
    } else {
      if (isPlaying && currentlyPlayingId) {
        onStopSound();
      }
      onPlaySound(sound);
    }
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td
            className="px-2 py-4 text-center text-gray-500 text-xs dark:text-gray-400"
            colSpan={3}
          >
            Loading sounds...
          </td>
        </tr>
      );
    }

    if (filteredSounds.length === 0) {
      return (
        <tr>
          <td
            className="px-2 py-4 text-center text-gray-500 text-xs dark:text-gray-400"
            colSpan={3}
          >
            No sounds found
          </td>
        </tr>
      );
    }

    return paginatedSounds.map((sound) => (
      <SoundRow
        currentlyPlayingId={currentlyPlayingId}
        key={sound.id}
        loading={loading}
        onPlayStopSound={handlePlayStopSound}
        onSelectSound={handleSelectSound}
        selectedSound={selectedSound}
        sound={sound}
      />
    ));
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="relative">
          <input
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            onChange={handleSearch}
            placeholder="Search sounds..."
            type="text"
            value={searchQuery}
          />
          {!!searchQuery && (
            <Button
              className="-translate-y-1/2 absolute top-1/2 right-1 h-6 w-6"
              onClick={handleClearSearch}
              size="sm"
              variant="ghost"
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {!!playbackError && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm dark:bg-red-900/20 dark:text-red-400">
          {playbackError}
        </div>
      )}

      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full overflow-hidden rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border-gray-200 border-b px-2 py-1.5 text-left font-medium text-gray-500 text-xs dark:border-gray-700 dark:text-gray-400">
                  Name
                </th>
                <th className="border-gray-200 border-b px-2 py-1.5 text-left font-medium text-gray-500 text-xs dark:border-gray-700 dark:text-gray-400">
                  Category
                </th>
                <th className="w-12 border-gray-200 border-b px-2 py-1.5 text-center font-medium text-gray-500 text-xs dark:border-gray-700 dark:text-gray-400">
                  Play
                </th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-gray-500 text-xs dark:text-gray-400">
            {filteredSounds.length > 0 ? (
              <>
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredSounds.length)} of{" "}
                {filteredSounds.length}
              </>
            ) : (
              "0 items"
            )}
          </div>
          <div className="flex space-x-1">
            <Button
              className="h-8 px-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              size="sm"
              variant="outline"
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber: number;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  className="h-8 w-8 p-0"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  size="sm"
                  variant={currentPage === pageNumber ? "primary" : "outline"}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              className="h-8 px-2"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for table row to reduce complexity
function SoundRow({
  sound,
  selectedSound,
  currentlyPlayingId,
  loading,
  onSelectSound,
  onPlayStopSound,
}: {
  sound: Sound;
  selectedSound?: Sound;
  currentlyPlayingId: string | null;
  loading: boolean;
  onSelectSound: (id: string) => void;
  onPlayStopSound: (sound: Sound, e: React.MouseEvent) => void;
}) {
  return (
    <tr
      className={`border-gray-100 border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
        selectedSound?.id === sound.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
      } ${
        currentlyPlayingId === sound.id ? "bg-green-50 dark:bg-green-900/20" : ""
      } cursor-pointer transition-colors duration-150`}
      onClick={() => onSelectSound(sound.id)}
    >
      <td className="max-w-[120px] truncate px-2 py-1.5 text-xs" title={sound.name}>
        {sound.name}
      </td>
      <td className="px-2 py-1.5 text-xs">
        {sound.category ? (
          <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">
            {sound.category.charAt(0).toUpperCase() + sound.category.slice(1).replace(/_/g, " ")}
          </span>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">-</span>
        )}
      </td>
      <td className="w-12 px-2 py-1.5 text-center">
        <div className="flex items-center justify-center">
          <Button
            aria-label={currentlyPlayingId === sound.id ? "Stop sound" : "Play sound"}
            className="flex h-8 w-8 items-center justify-center rounded-full p-0 text-blue-600 dark:text-blue-400"
            disabled={loading}
            onClick={(e: React.MouseEvent) => onPlayStopSound(sound, e)}
            size="sm"
            variant="ghost"
          >
            {currentlyPlayingId === sound.id ? (
              <Stop className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}
