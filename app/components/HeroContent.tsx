export default function HeroContent() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full max-w-4xl px-4">
      <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        Prototype at the Speed of Thought
      </h1>
      <h2 className="text-xl mb-10 text-gray-300">
        Seamlessly transform your ideas into interactive prototypes with Protflow's intuitive design tools
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300">
          Start Prototyping
        </button>
        <button className="bg-transparent border border-blue-400 text-blue-400 font-bold py-3 px-6 rounded-md hover:bg-blue-400 hover:text-white transition duration-300">
          Watch Demo
        </button>
      </div>
    </div>
  )
}

