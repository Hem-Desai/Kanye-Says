"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCw, Quote, Search, X } from "lucide-react";

export function Page() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);
  const [currentQuote, setCurrentQuote] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const fetchQuotes = useMemo(
    () => async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.kanye.rest/quotes");
        const data = await response.json();
        setQuotes(data);
        setFilteredQuotes(data);
        setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuotes([]);
        setFilteredQuotes([]);
        setCurrentQuote("Failed to fetch quotes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    const filtered = quotes.filter((quote) =>
      quote.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuotes(filtered);
  }, [searchTerm, quotes]);

  const findQuote = () => {
    const matchingQuote =
      filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    setCurrentQuote(matchingQuote || "No matching quotes found.");
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Kanye West Quotes
          </CardTitle>
          <CardDescription className="text-center">
            Wisdom from Ye
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Filter quotes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                    aria-label="Search quotes"
                  />
                  <Button
                    onClick={findQuote}
                    disabled={isLoading || filteredQuotes.length === 0}
                    size="sm"
                  >
                    Find
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Quote className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-lg font-medium">{currentQuote}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={fetchQuotes}
            disabled={isLoading}
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isLoading ? "Loading..." : "Refresh Quotes"}
          </Button>
        </CardFooter>
        <Button
          onClick={handleSearchToggle}
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 rounded-full"
          aria-label={isSearchOpen ? "Close search" : "Open search"}
        >
          {isSearchOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </Card>
    </div>
  );
}
