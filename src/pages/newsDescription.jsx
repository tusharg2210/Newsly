
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';


// Helper function to format the date
const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function NewsDescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { news } = location.state || {}; // Get passed data

  // --- Improved Fallback Component ---
  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          No news article selected.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Please go back and choose an article to read.
        </p>
        <button
          onClick={() => navigate(-1)} // Navigates to the previous page
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  // --- Main Article Component ---
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 min-h-screen animate-fade-in">
      <article className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white lg:text-4xl mb-4">
            {news.title}
          </h1>
          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
            <span>By {news.author || 'Staff Writer'}</span>
            <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden="true"></span>
            <time dateTime={news.publishedAt}>
              {formatDate(news.publishedAt)}
            </time>
          </div>
        </header>

        {/* Main Image */}
        {news.urlToImage && (
          <figure className="mb-8">
            <img
              src={news.urlToImage}
              alt={news.title}
              className="w-full rounded-4xl shadow-lg aspect-video object-cover hover:scale-110 transition-transform duration-300"
            />
            {news.source?.name && (
              <figcaption className="mt-2 text-center text-xs text-gray-500">
                Image from {news.source.name}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body */}
        {/* The 'prose' classes from @tailwindcss/typography handle all the styling for paragraphs, links, etc. */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Lead paragraph */}
          <p className="lead">{news.description}</p>
          <br />
          {/* Main content */}
          <p>{news.content}</p>
        </div>

        {/* Read More Button */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Read Full Story
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </article>
    </div>
  );
}


export default NewsDescription;