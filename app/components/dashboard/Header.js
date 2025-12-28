export default function Header({ title, onLogout }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={onLogout}
        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
      >
        Logout
      </button>
    </div>
  );
}