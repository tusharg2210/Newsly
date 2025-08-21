import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../components/newsCard';
import ErrorDisplay from '../components/errorDisplay';

function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || ""; // Read the query from the URL

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);

    const articlesPerPage = 9;

    useEffect(() => {
        // Reset to page 1 when query in the URL changes
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const url = `https://news-api-wrapper.vercel.app/api/search?q=${query}&page=${currentPage}&pageSize=${articlesPerPage}`;
                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok || data.status === 'error') {
                    throw new Error(data.message || 'Failed to fetch search results.');
                }

                setResults(data.articles || []);
                setTotalResults(data.totalResults || 0);
                setTotalPages(Math.ceil(data.totalResults / articlesPerPage));
            } catch (err) {
                console.error('Error fetching search results:', err);
                setError(err.message);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    if (error) {
        return <ErrorDisplay message={error} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="dark:text-white">
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white capitalize">
                    Results for "{query}"
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Found {totalResults} articles
                </p>

                {results.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-10">No results found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.map((article, index) => (
                                <NewsCard
                                    key={article.url || index}
                                    news={article}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-4">
                                <button
                                    onClick={() => {
                                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-lg dark:text-white font-semibold">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => {
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
