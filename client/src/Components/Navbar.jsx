export default function Navbar() {
    return (
      <nav className="fixed top-4 rounded-full bg-white z-10  left-1/2 transform -translate-x-1/2 flex justify-center">
        <div className="border-2 border-black bg-white text-black px-6 py-2 rounded-full flex space-x-8 shadow-md backdrop-blur-md">
          <a href="#" className="px-4 py-2 font-medium hover:text-gray-600">Home</a>
          <a href="#" className="px-4 py-2 font-medium hover:text-gray-600">About</a>
          <a href="#" className="px-4 py-2 font-medium hover:text-gray-600">Courses</a>
          <a href="#" className="px-4 py-2 font-medium hover:text-gray-600">Teachers</a>
        </div>
      </nav>
    );
  }
  