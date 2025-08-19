import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Newspaper, Briefcase, Globe, BarChart2 } from 'lucide-react';
import { RiHeart2Fill } from 'react-icons/ri';

// Define your categories with paths, descriptions, and icons
const categoryItems = [
    { name: 'Technology', to: '/search?q=technology', description: 'Latest in gadgets and software.', icon: Newspaper },
    { name: 'Business', to: '/search?q=business', description: 'Market trends and financial news.', icon: Briefcase },
    { name: 'World', to: '/search?q=world', description: 'Global events and politics.', icon: Globe },
    { name: 'Sports', to: '/search?q=sports', description: 'Scores, highlights, and more.', icon: BarChart2 },
    { name: 'Health', to: '/search?q=health', description: 'Wellness tips and medical news.', icon: RiHeart2Fill },
];

function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div 
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <Menu.Button className="inline-flex items-center gap-1 text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    <span>Categories</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </Menu.Button>

                <Transition
                    show={isOpen}
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Menu.Items 
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-4 w-screen max-w-sm origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="p-4 ">
                            {categoryItems.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <Link
                                            to={item.to}
                                            onClick={() => setIsOpen(false)}
                                            className={`${
                                                active ? 'bg-gray-100 dark:bg-gray-700 ' : ''
                                            } group flex w-full items-start gap-4 rounded-lg p-3 text-sm transition-colors duration-150`}
                                        >
                                            <div className=" opacity-70 hover:opacity-100 transition-opacity duration-200 flex items-center gap-3">
                                                <div className="flex-shrink-0 mt-1 hover:text-indigo-600">
                                                    <item.icon className="h-6 w-6 text-blue-500 hover:text-indigo-500 transition-colors duration-200 hover:scale-115" aria-hidden="true" />
                                                </div>
                                                <div className=' hover:text-indigo-500 transition-colors duration-200'>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                                            </div>
                                            </div>
                                            
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    );
}

export default CategoryDropdown;