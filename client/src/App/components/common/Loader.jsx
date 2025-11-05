import { FiShoppingBag, FiTruck, FiHeart, FiStar } from 'react-icons/fi';

const ICONS = [
  { icon: <FiShoppingBag />, className: 'text-indigo-500' },
  { icon: <FiTruck />, className: 'text-pink-500' },
  { icon: <FiHeart />, className: 'text-red-400' },
  { icon: <FiStar />, className: 'text-yellow-400' },
  { icon: <FiShoppingBag />, className: 'text-indigo-400' },
  { icon: <FiTruck />, className: 'text-emerald-500' },
];

const Loader = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tb from-indigo-50 to-pink-50 overflow-hidden">
      <div className="text-center space-y-4 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          Loading <span className="text-indigo-600">ShopMate</span>...
        </h1>
        <p className="text-sm text-gray-500">Fetching amazing products for you</p>
      </div>

      {/* Floating Icons */}
      {ICONS.map((item, idx) => (
        <div
          key={idx}
          className={`absolute text-3xl opacity-80 ${item.className} animate-float-${idx % 4} z-0`}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDuration: `${Math.random() * 5 + 4}s`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Loader;
