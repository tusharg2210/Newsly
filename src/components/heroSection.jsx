import React from "react";

function HeroSection() {
    return (
        <>
            <div id="hero" className="bg-white py-10 dark:bg-gray-900 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                    <div className="mx-auto lg:text-center hover:scale-105 transition-transform duration-100">
                        <p className="mt-2 text-4xl font-serif font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white ">The Smartest Way to Stay Informed</p>
                        <p className="mt-6  text-lg/8 text-gray-700 dark:text-gray-300">Newsly is packed with features designed to save you time, keep you informed, and provide a reading experience you'll love.</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            <div className="relative pl-16 hover:scale-105 transition-transform duration-100">
                                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-white">
                                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M18 8H22V22H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    Your Personal Briefing
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">The more you read, the smarter your feed gets. By understanding your interests, Newsly delivers a personalized stream of stories just for you. Follow the topics you love and discover new content without the clutter.</dd>
                            </div>
                            <div className="relative pl-16 hover:scale-105 transition-transform duration-100">
                                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-white">
                                        <path d="M8 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4 6H4.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4 12H4.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4 18H4.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    Bulleted Briefings
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">The more you read, the smarter your feed gets. By understanding your interests, Newsly delivers a personalized stream of stories just for you. Follow the topics you love and discover new content without the clutter.</dd>
                            </div>
                            <div className="relative pl-16 hover:scale-105 transition-transform duration-100">
                                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-white">
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    Beyond the Headlines
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Understand the full picture. For major stories, our "Context" feature provides timelines, key players, and a spectrum of viewpoints from different sources. Stay informed, not just updated.</dd>
                            </div>
                            <div className="relative pl-16 hover:scale-105 transition-transform duration-100">
                                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        <svg  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-white">
                                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 13L12 17L16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    Read Anywhere, Anytime
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">Heading underground or onto a flight? Save articles with a single tap to build your offline reading list. Your personal briefing is always available.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeroSection;
