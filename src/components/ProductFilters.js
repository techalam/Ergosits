export default function ProductFilters({ active, setActive }) {
  const filters = ["all", "laptop", "mobile", "table"];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition
            ${
              active === filter
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}