import React from "react";

import { useState, useEffect } from "react";
import NewsCard from "./newsCard.jsx";
import ErrorDisplay from "./errorDisplay.jsx";


function NewsSection() {
    const apiKey =  'yourapikey';
    let url = `https://newsapi.org/v2/everything?q=keyword&apiKey=${apiKey}`;

    const [newsArticles, setNewsArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null); // Reset error on new fetch
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (!response.ok || data.status === 'error') {
                    // Throw an error if the API indicates a failure
                    throw new Error(data.message || 'Failed to fetch news.');
                }

                setNewsArticles(data.articles);
                setTotalPages(Math.ceil(data.totalResults / 9));
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message); // Set the error state
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [newsArticles]);

    if (error) {
        return <ErrorDisplay message={error} />;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }
    if (!newsArticles.length) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }

    return (

        <div id="LatestNews">   
        <section  className="py-12 dark:bg-gray-900 bg-opacity-50 ">
            <div className="container mx-auto dark:text-white">
                <h2 className="text-5xl py-6 text-center font-serif hover:underline hover:scale-115 transform-transition duration-200 font-bold mb-6">Latest News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsArticles.slice((currentPage - 1) * 9, currentPage * 9).map((news) => (
                        <NewsCard  news={news} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        document.getElementById('LatestNews').scrollIntoView({ behavior: 'smooth' });
                        
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white dark:text-black dark:bg-white bg-indigo-600 rounded-2xl ml-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="h-12 w-40 flex justify-center items-center text-sm dark:text-white font-semibold">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => {
                        document.getElementById('LatestNews').scrollIntoView({ behavior: 'smooth' });
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white dark:text-black dark:bg-white bg-indigo-600 rounded-2xl ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
        </div>
    );
}

export default NewsSection;
