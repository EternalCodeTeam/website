"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { create, insertMultiple, search } from '@orama/orama';
import { Button } from "@/components/ui/button";
import CloseIcon from "@/components/icons/close";
import { ArrowBack } from "@/components/icons/arrow-back";
import { ArrowForward } from "@/components/icons/arrow-forward";
import { Play } from "@/components/icons/play";
import { Stop } from "@/components/icons/stop";
import { motion } from "framer-motion";

export interface Sound {
  id: string;
  name: string;
  path: string;
  category?: string;
}

interface SoundTableProps {
  sounds: Sound[];
  selectedSound: Sound | undefined;
  onSelectSound: (soundId: string) => void;
  onPlaySound: (sound: Sound) => void;
  isPlaying: boolean;
  onStopSound: () => void;
  loading: boolean;
  currentlyPlayingId: string | null;
}

interface SoundSchema {
  id: string;
  name: string;
  path: string;
  category: string;
}

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export function SoundTable({
  sounds,
  selectedSound,
  onSelectSound,
  onPlaySound,
  isPlaying,
  onStopSound,
  loading,
  currentlyPlayingId
}: SoundTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"name" | "category">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredSounds, setFilteredSounds] = useState<Sound[]>(sounds);
  const [searchLoading, setSearchLoading] = useState(false);
  const [oramaDb, setOramaDb] = useState<any>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

 
  useEffect(() => {
    const initOrama = async () => {
      const db = await create({
        schema: {
          id: 'string',
          name: 'string',
          path: 'string',
          category: 'string'
        },
        components: {
          tokenizer: {
            language: 'english',
            stemming: true,
            stopWords: false
          }
        }
      });

      if (sounds.length > 0) {
        await insertMultiple(db, sounds);
      }

      setOramaDb(db);
    };

    initOrama();
  }, [sounds]);

 
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

 
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

 
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim() || !oramaDb) {
        setFilteredSounds(sounds);
        return;
      }
      
      setSearchLoading(true);
      
      try {
        const results = await search(oramaDb, {
          term: debouncedQuery,
          properties: ['name', 'id', 'category'],
          limit: 100,
          boost: {
            name: 2,
            category: 1,
            id: 0.5
          }
        });
        
        const matchedSounds = results.hits
          .map(hit => sounds.find(sound => sound.id === (hit.document as SoundSchema).id))
          .filter(Boolean) as Sound[];
        
        setFilteredSounds(matchedSounds);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredSounds(sounds);
      } finally {
        setSearchLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedQuery, oramaDb, sounds]);

 
  const sortedSounds = useMemo(() => {
    return [...filteredSounds].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "category") {
        const catA = a.category || "";
        const catB = b.category || "";
        comparison = catA.localeCompare(catB);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredSounds, sortField, sortDirection]);

 
  const paginatedSounds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedSounds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedSounds, currentPage]);

  const totalPages = Math.ceil(sortedSounds.length / ITEMS_PER_PAGE);

 
  const handleSort = useCallback((field: "name" | "category") => {
    setSortField(prevField => {
      if (prevField === field) {
        setSortDirection(prevDir => prevDir === "asc" ? "desc" : "asc");
        return prevField;
      } else {
        setSortDirection("asc");
        return field;
      }
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleSelectSound = useCallback((soundId: string) => {
    onSelectSound(soundId);
  }, [onSelectSound]);

  const handlePlayStopSound = useCallback((sound: Sound, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && currentlyPlayingId === sound.id) {
      onStopSound();
    } else {
      onPlaySound(sound);
    }
  }, [isPlaying, currentlyPlayingId, onStopSound, onPlaySound]);

 
  const paginationButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = 1;
    let endPage = Math.min(maxVisiblePages, totalPages);
    
    if (totalPages > maxVisiblePages) {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "primary" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="h-8 w-8 p-0"
        >
          {i}
        </Button>
      );
    }
    
    return buttons;
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search sounds by name, ID, or category..."
            className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
              onClick={handleClearSearch}
            >
              <CloseIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                onClick={() => handleSort("name")}
              >
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                onClick={() => handleSort("category")}
              >
                Category {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || searchLoading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading sounds...
                </td>
              </tr>
            ) : paginatedSounds.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No sounds found
                </td>
              </tr>
            ) : (
              paginatedSounds.map((sound) => (
                <tr 
                  key={sound.id} 
                  className={`border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
                    selectedSound?.id === sound.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  } cursor-pointer`}
                  onClick={() => handleSelectSound(sound.id)}
                >
                  <td className="px-4 py-2 text-sm">{sound.name}</td>
                  <td className="px-4 py-2 text-sm">
                    {sound.category ? (
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                        {sound.category.charAt(0).toUpperCase() + sound.category.slice(1).replace(/_/g, ' ')}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center">
                      <motion.button
                        className="flex items-center justify-center bg-transparent text-blue-600 hover:bg-blue-200 dark:bg-transparent dark:text-blue-400 dark:hover:bg-blue-900 rounded-full transition-colors duration-200 w-10 h-10"
                        onClick={(e) => handlePlayStopSound(sound, e)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        disabled={loading}
                        aria-label={currentlyPlayingId === sound.id ? "Stop sound" : "Play sound"}
                      >
                        {currentlyPlayingId === sound.id ? (
                          <Stop className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedSounds.length)} of {sortedSounds.length} sounds
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ArrowBack className="h-4 w-4" />
            </Button>
            {paginationButtons}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ArrowForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}