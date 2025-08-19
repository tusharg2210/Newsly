// src/components/footer.jsx

import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/tushargnita/' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/tusharg2210' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer id="ContactUs" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 sm:pb-8 lg:px-8">

        {/* Copyright text with a border above */}
        <div className="border-t border-gray-200 dark:border-gray-700">

          {/* Social Icons - Centered */}
          <div className=" flex justify-center space-x-8 pt-4 mt-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-10 h-10 flex flex-wrap justify-center items-center text-gray-400 rounded-lg border border-gray-300 hover:text-gray-500 dark:hover:text-white transition-transform duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6 " />
              </a>
            ))}
          </div>

          <p className="text-center font-mono text-sm leading-5 text-gray-500 dark:text-gray-400 pt-6">
            &copy; {currentYear} Newsly, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
