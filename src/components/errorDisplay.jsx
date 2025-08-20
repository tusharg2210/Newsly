import React from 'react';

function ErrorDisplay({ message }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Oops! Something went wrong.</strong>
        <span className="block sm:inline ml-2">Could not fetch news articles.</span>
        <p className="text-xs text-red-500 dark:text-red-400 mt-2">
          Details: {message}
        </p>
        <p className="text-sm mt-4">
          This can happen if the API rate limit is exceeded. Please try again later.
        </p>
      </div>
    </div>
  );
}

export default ErrorDisplay;
