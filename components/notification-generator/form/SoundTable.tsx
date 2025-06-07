"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Sound } from "./SoundDropdown";
import { create, insertMultiple, search } from '@orama/orama';
import { Button } from "@/components/ui/button";
import CloseIcon from "@/components/icons/close";
import { ArrowBack } from "@/components/icons/arrow-back";
import { ArrowForward } from "@/components/icons/arrow-forward";

interface SoundTableProps {
  sounds: Sound[];
  selectedSound: Sound | undefined;
  onSelectSound: (soundId: string) => void;
  onPlaySound: (sound: Sound) => void;
  isPlaying: boolean;
  onStopSound: () => void;
  loading: boolean;
}

export function SoundTable({
  sounds,
  selectedSound,
  onSelectSound,
  onPlaySound,
  isPlaying,
  onStopSound,
  loading
}: SoundTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"name" | "category">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredSounds, setFilteredSounds] = useState<Sound[]>(sounds);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;
  const [oramaDb, setOramaDb] = useState<any>(null);

  useEffect(() => {
    const initOrama = async () => {
      const db = await create({
        schema: {
          id: 'string',
          name: 'string',
          path: 'string',
          category: 'string'
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
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    setSearchTimeout(timeout);
    
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
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
          limit: 100
        });
        
        const matchedSounds = results.hits.map(hit => {
          return sounds.find(sound => sound.id === hit.document.id);
        }).filter(Boolean) as Sound[];
        
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedSounds.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedSounds, currentPage]);

  const totalPages = Math.ceil(sortedSounds.length / itemsPerPage);

  const handleSort = (field: "name" | "category") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectSound = (soundId: string) => {
    onSelectSound(soundId);
  };

  const handlePlayStopSound = (sound: Sound) => {
    if (isPlaying && selectedSound?.id === sound.id) {
      onStopSound();
    } else {
      onPlaySound(sound);
    }
  };

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
              onClick={() => setSearchQuery("")}
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Path</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || searchLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading sounds...
                </td>
              </tr>
            ) : paginatedSounds.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No sounds found
                </td>
              </tr>
            ) : (
              paginatedSounds.map((sound) => (
                <tr 
                  key={sound.id} 
                  className={`border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
                    selectedSound?.id === sound.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
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
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{sound.path}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectSound(sound.id)}
                        className="h-8 px-2 text-xs"
                      >
                        Select
                      </Button>
                      <Button
                        variant={isPlaying && selectedSound?.id === sound.id ? "danger" : "primary"}
                        size="sm"
                        onClick={() => handlePlayStopSound(sound)}
                        className="h-8 px-2 text-xs"
                      >
                        {isPlaying && selectedSound?.id === sound.id ? "Stop" : "Play"}
                      </Button>
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedSounds.length)} of {sortedSounds.length} sounds
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
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="h-8 w-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
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