import React, { useState, useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

function Header({ onSearch, searchQuery }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const searchInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (!searchQuery && localSearchQuery) {
            setLocalSearchQuery("");
            setIsSearchOpen(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setLocalSearchQuery("");
            if (onSearch) {
                onSearch(""); // Clear search when closing
            }
        }
    };

    // ✅ Corrected search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = localSearchQuery.trim();

        if (trimmedQuery) {
            // Call parent onSearch
            if (onSearch) {
                onSearch(trimmedQuery);
            }

            // Navigate to search results page with query param
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);

            setIsSearchOpen(false);
        } else {
            // Reset search and go to home
            if (onSearch) {
                onSearch("");
            }
            navigate('/');
            setIsSearchOpen(false);
        }
    };

    const handleSearchChange = (e) => {
        setLocalSearchQuery(e.target.value);
    };

    const handleNavClick = (sectionId) => {
        if (onSearch) {
            onSearch("");
        }

        if (!isHomePage) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id="Header" className='sticky top-0 z-50 font-mono'>
            <header className="bg-white/80 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-300 shadow-2xl">
                <nav aria-label="Global" className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

                    <div className="flex flex-1">
                        <RouterLink
                            to="/"
                            onClick={() => { if (onSearch) onSearch("") }}
                            className="-m-1.5 p-1.5"
                        >
                            <span className="sr-only">Newsly</span>
                            <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 dark:text-white hover:scale-115 transition-transform duration-300"
                                onClick={handleScrollToTop}
                            >
                                NEWSLY
                            </h1>
                        </RouterLink>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                        <ul className="flex items-center space-x-8">
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900  dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                {isHomePage ? (
                                    <ScrollLink to="hero" smooth={true} duration={500} offset={-70}>Home</ScrollLink>
                                ) : (
                                    <span onClick={() => handleNavClick('hero')}>Home</span>
                                )}
                            </li>
                            <li>
                                <CategoryDropdown />
                            </li>
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                <RouterLink to="/topHeadlines">Top Headlines</RouterLink>
                            </li>
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                {isHomePage ? (
                                    <ScrollLink to="LatestNews" smooth={true} duration={500} offset={-70}>Latest News</ScrollLink>
                                ) : (
                                    <span onClick={() => handleNavClick('LatestNews')}>Latest News</span>
                                )}
                            </li>
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                {isHomePage ? (
                                    <ScrollLink to="ContactUs" smooth={true} duration={500} offset={-70}>Contact Us</ScrollLink>
                                ) : (
                                    <span onClick={() => handleNavClick('ContactUs')}>Contact Us</span>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-1 justify-end items-center space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center">

                            {/* This div contains the input and animates its width */}
                            <div className={`transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-52' : 'w-0'}`}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={localSearchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search news..."
                                    // ADDED: pointer-events-none when hidden to make sure it's not interactive
                                    className={`w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    disabled={!isSearchOpen}
                                />
                            </div>

                            {/* --- A SINGLE, UNIFIED BUTTON FOR SEARCH & CLOSE --- */}
                            <button
                                type="button"
                                onClick={handleSearchToggle}
                                // ADDED: 'relative z-10' to ensure the button is always on top
                                className="relative z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2"
                                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                            >
                                {isSearchOpen ? (
                                    // Close (Cross) Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    // Search Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
