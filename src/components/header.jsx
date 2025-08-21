import React, { useState, useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import CategoryDropdown from "./categoryDropdown.jsx";

function Header({ onSearch, searchQuery }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
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

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setLocalSearchQuery("");
            if (onSearch) {
                onSearch(""); // Clear search when closing
            }
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = localSearchQuery.trim();

        if (trimmedQuery) {
            if (onSearch) {
                onSearch(trimmedQuery);
            }
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setIsSearchOpen(false);
        } else {
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
        setIsMobileMenuOpen(false); // Close menu on click
        if (onSearch) {
            onSearch("");
        }

        if (!isHomePage) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80; 
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100);
        } else {
             // Use ScrollLink for homepage navigation
        }
    };

    const handleScrollToTop = () => {
        setIsMobileMenuOpen(false); // Close menu on click
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id="Header" className='sticky top-0 z-50 font-mono'>
            <header className="bg-white/80 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-300 shadow-2xl">
                <nav aria-label="Global" className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

                    <div className="flex flex-1 items-center">
                         {/* Mobile Menu Button */}
                        <div className="flex lg:hidden mr-4">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                 {isMobileMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <RouterLink
                            to="/"
                            onClick={() => { if (onSearch) onSearch(""); handleScrollToTop(); }}
                            className="-m-1.5 p-1.5"
                        >
                            <span className="sr-only">Newsly</span>
                            <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 dark:text-white hover:scale-115 transition-transform duration-300">
                                NEWSLY
                            </h1>
                        </RouterLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                        <ul className="flex items-center space-x-8">
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900  dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                {isHomePage ? (
                                    <ScrollLink to="hero" smooth={true} duration={500} offset={-80}>Home</ScrollLink>
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
                                    <ScrollLink to="LatestNews" smooth={true} duration={500} offset={-60}>Latest News</ScrollLink>
                                ) : (
                                    <span onClick={() => handleNavClick('LatestNews')}>Latest News</span>
                                )}
                            </li>
                            <li className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                {isHomePage ? (
                                    <ScrollLink to="ContactUs" smooth={true} duration={500} >Contact Us</ScrollLink>
                                ) : (
                                    <span onClick={() => handleNavClick('ContactUs')}>Contact Us</span>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-1 justify-end items-center space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                            <div className={`transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-52' : 'w-0'}`}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={localSearchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search news..."
                                    className={`w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    disabled={!isSearchOpen}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSearchToggle}
                                className="relative z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2"
                                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                            >
                                {isSearchOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </nav>

                {/* Mobile menu, show/hide based on menu state. */}
                <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <ScrollLink to="hero" smooth={true} duration={500} offset={-300} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Home</ScrollLink>
                        <div className="px-3 py-2">
                            <CategoryDropdown />
                        </div>
                        <RouterLink to="/topHeadlines" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Top Headlines</RouterLink>
                        <ScrollLink to="LatestNews" smooth={true} duration={500} offset={-300} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Latest News</ScrollLink>
                        <ScrollLink to="ContactUs" smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">Contact Us</ScrollLink>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
