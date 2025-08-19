import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewsCard({ news, onNavigate }) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
        if (onNavigate) {
            onNavigate();
        }
        navigate('/newsDescription', { state: { news } });
    };

    // Calculate reading time (rough estimate)
    const calculateReadingTime = (content) => {
        if (!content) return '2 min';
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min`;
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

        if (diffHours < 24) {
            if (diffHours === 1) return '1 hour ago';
            return `${diffHours} hours ago`;
        } else {
            const diffDays = Math.ceil(diffHours / 24);
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    return (
        <article
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={handleClick}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                {!imageError && news.urlToImage ? (
                    <img
                        src={news.urlToImage}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                        <svg
                            className="w-16 h-16 text-gray-400 dark:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                        </svg>
                    </div>
                )}

                {/* Category Badge */}
                {news.category && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-full backdrop-blur-sm bg-opacity-90">
                            {news.category}
                        </span>
                    </div>
                )}

                {/* Reading Time Badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 rounded-full backdrop-blur-sm bg-opacity-75 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {calculateReadingTime(news.content)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Source and Date */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                                {news.source?.name?.charAt(0) || 'N'}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {news.source?.name || 'Unknown Source'}
                        </span>
                    </div>
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(news.publishedAt)}
                    </time>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {news.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {news.description || 'No description available for this article.'}
                </p>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                    {news.author && (
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                                {news.author}
                            </span>
                        </div>
                    )}

                    {/* Read More Arrow */}
                    <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">Read more</span>
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Bottom Gradient for Dark Mode */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </article>
    );
}

export default NewsCard;