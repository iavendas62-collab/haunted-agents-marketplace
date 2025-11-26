import { useNavigate, useLocation } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import AgentCard from '../components/AgentCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';

export default function Home() {
  const { config, loading, error } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize search with empty array, will update when config loads
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    hasResults,
  } = useSearch(config?.bundles || []);

  // Handle error message from navigation state
  useEffect(() => {
    if (location.state && (location.state as any).error) {
      setErrorMessage((location.state as any).error);
      // Clear the error after 5 seconds
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      // Clear the navigation state
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Configuration</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  const handleAgentClick = (agentId: string) => {
    navigate(`/agent/${agentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{config.branding.name}</h1>
          <p className="mt-2 text-gray-600">{config.branding.tagline}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message Banner */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search agents by name, description, or tags..."
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={config.categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Search/Filter Results Info */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-4">
            <p className="text-gray-600">
              {hasResults ? (
                <>
                  Found <span className="font-semibold">{searchResults.length}</span> result
                  {searchResults.length !== 1 ? 's' : ''}
                  {searchQuery && <> for "{searchQuery}"</>}
                  {selectedCategory && (
                    <>
                      {' '}
                      in{' '}
                      <span className="font-semibold">
                        {config.categories.find((c) => c.id === selectedCategory)?.name}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  No results found
                  {searchQuery && <> for "{searchQuery}"</>}
                  {selectedCategory && (
                    <>
                      {' '}
                      in{' '}
                      <span className="font-semibold">
                        {config.categories.find((c) => c.id === selectedCategory)?.name}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        )}

        {config.bundles && config.bundles.length > 0 ? (
          <>
            {hasResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result) => (
                  <AgentCard
                    key={result.item.id}
                    agent={result.item}
                    onClick={handleAgentClick}
                    isFeatured={config.featured.includes(result.item.id)}
                  />
                ))}
              </div>
            ) : searchQuery || selectedCategory ? (
              // No search/filter results - show suggestions
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  No agents found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try different keywords or categories, or browse popular agents below
                </p>
                <div className="flex gap-3 justify-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Clear search
                    </button>
                  )}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
                
                {/* Show popular/featured agents as suggestions */}
                {config.featured.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Popular Agents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {config.bundles
                        .filter((bundle) => config.featured.includes(bundle.id))
                        .slice(0, 3)
                        .map((bundle) => (
                          <AgentCard
                            key={bundle.id}
                            agent={bundle}
                            onClick={handleAgentClick}
                            isFeatured={true}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Agents Available
            </h2>
            <p className="text-gray-600">
              Check back soon for new agent bundles!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
