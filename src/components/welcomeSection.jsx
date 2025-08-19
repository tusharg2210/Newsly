import image from '../assets/welcome.jpeg';

function WelcomeSection() {
    return (
        <div id="Welcome" className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen text-center">
            {/* Background Image */}
            <img
                src={image}
                className="absolute inset-0 w-full h-full object-cover opacity-65 dark:opacity-35"
                alt="Background"
            />

            {/* Overlay Text */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 px-1 w-full ">
                <h1 className="text-gray-900  dark:text-white  animate-pulse text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold transition-transform duration-100  hover:scale-110 hover:animate-none">
                    Welcome to Newsly
                </h1>

                <p className=" text-gray-900  dark:text-white mt-4 sm:mt-4 md:mt-5 text-sm sm:text-lg md:text-xl transition-transform duration-100 animate-pulse hover:scale-110 hover:animate-none">
                    Your one-stop destination for the latest news and updates.
                </p>
            </div>
        </div>

    );
}

export default WelcomeSection;
