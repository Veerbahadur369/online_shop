 
import { FaGhost, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex flex-col items-center justify-center text-white p-6">
      <div className="text-9xl text-amber-100 animate-bounce mb-4 drop-shadow-lg">
        <FaGhost />
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight mb-2 text-amber-50 drop-shadow-md">
        404
      </h1>
      <p className="text-xl text-center mb-6 text-amber-100">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-amber-100 hover:scale-105 transition-transform duration-300"
      >
        <FaArrowLeft />
        Go Back Home
      </button>
    </div>
  );
}

export default ErrorPage;
