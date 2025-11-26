import { useMemo, useState } from 'react';
import Fuse, { type FuseResultMatch } from 'fuse.js';
import type { BundleManifest } from '../../../shared/types/bundle';

interface SearchResult {
  item: BundleManifest;
  score?: number;
  matches?: readonly FuseResultMatch[];
}

export function useSearch(bundles: BundleManifest[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter bundles by category first
  const filteredBundles = useMemo(() => {
    if (!selectedCategory) {
      return bundles;
    }
    return bundles.filter((bundle) => bundle.categories.includes(selectedCategory));
  }, [bundles, selectedCategory]);

  // Configure Fuse.js for fuzzy search on filtered bundles
  const fuse = useMemo(() => {
    return new Fuse(filteredBundles, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'tags', weight: 1.5 },
        { name: 'longDescription', weight: 1 },
      ],
      threshold: 0.4, // Lower = more strict matching
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [filteredBundles]);

  // Perform search and return results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return filteredBundles.map((item) => ({ item, score: 0 }));
    }

    const results = fuse.search(searchQuery);
    return results as SearchResult[];
  }, [searchQuery, fuse, filteredBundles]);

  // Get highlighted text for a field
  const getHighlightedText = (text: string, matches?: readonly FuseResultMatch[]): string => {
    if (!matches || matches.length === 0) {
      return text;
    }

    // Find matches for this specific text
    const relevantMatches = matches.filter((match) => {
      if (typeof match.value === 'string') {
        return match.value === text;
      }
      return false;
    });

    if (relevantMatches.length === 0) {
      return text;
    }

    // Simple highlighting - wrap matched portions in <mark> tags
    let highlightedText = text;
    const match = relevantMatches[0];
    
    if (match.indices && match.indices.length > 0) {
      // Sort indices in reverse order to avoid offset issues
      const sortedIndices = [...match.indices].sort((a, b) => b[0] - a[0]);
      
      sortedIndices.forEach(([start, end]) => {
        const before = highlightedText.slice(0, start);
        const matched = highlightedText.slice(start, end + 1);
        const after = highlightedText.slice(end + 1);
        highlightedText = `${before}<mark class="bg-yellow-200 text-gray-900">${matched}</mark>${after}`;
      });
    }

    return highlightedText;
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    getHighlightedText,
    hasResults: searchResults.length > 0,
  };
}
