import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import NewsCard from '../components/newsCard';
import ScrollToTopButton from "../components/scrollToTop";

function CategoryNews() {
    const { categoryName } = useParams();

    let url = `https://news-api-wrapper.vercel.app/api/search?q=${categoryName}`;

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setNews(data.articles);
                setTotalPages(Math.ceil(data.totalResults / 9)); // Assuming 9 articles per page
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }
    if (!news.length) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    No News are available.
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Please check back later.
                </p>
            </div>
        );
    }
    return (
        <div id="CategoryNews" className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 min-h-screen animate-fade-in">
            <section className="mx-auto max-w-auto px-6 py-8 lg:py-12">
                <h2 className=" flex flex-wrap justify-center items-center text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
                    {category.charAt(0).toUpperCase() + category.slice(1)} News
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.slice((currentPage - 1) * 9, currentPage * 9).map((news) => (
                        <NewsCard  news={news} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                <button
                    onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        document.getElementById('CategoryNews').scrollIntoView({ behavior: 'smooth' });

                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white dark:text-black dark:bg-white bg-indigo-600 rounded-2xl ml-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="h-12 w-40 flex justify-center items-center text-sm dark:text-white font-semibold">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => {
                        document.getElementById('CategoryNews').scrollIntoView({ behavior: 'smooth' });
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white dark:text-black dark:bg-white bg-indigo-600 rounded-2xl ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            

            </section>
            <ScrollToTopButton />
        </div>
    );
}

export default CategoryNews;
