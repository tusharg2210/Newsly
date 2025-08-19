
import './App.css';
import Header from './components/header';
import WelcomeSection from './components/welcomeSection';
import HeroSection from './components/heroSection';
import NewsSection from './components/newsSection';
import Footer from './components/footer';
import NewsDescription from './pages/newsDescription';
import SearchResults from './pages/searchResults';
import TopHeadlines from './pages/topHeadlines';
import ScrollToTopButton from './components/scrollToTop';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function HomePage() {
    return (
        <>
            <WelcomeSection />
            <HeroSection />
            <NewsSection />
            <Footer />
        </>
    );
}

// The main App component is now much cleaner and uses standard routing
function App() {
    return (
        <Router>
            <div className="App bg-white dark:bg-gray-900 min-h-screen">
                {/* The Header now works with the routes below */}
                <Header />
                
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/newsDescription" element={<NewsDescription />} />
                    <Route path="/topHeadlines" element={<TopHeadlines />} />
                </Routes>

                <ScrollToTopButton />
            </div>
        </Router>
    );
}

export default App;