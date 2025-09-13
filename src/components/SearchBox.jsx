const SearchBox = ({ value, setSearchValue }) => {
  return (
    <div className="w-full md:w-1/3 flex justify-center md:justify-end">
      <input
        type="text"
        className="w-11/12 sm:w-5/6 md:w-full rounded-lg px-4 py-2 bg-slate-800 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={value}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search Movie..."
      />
    </div>
  );
};

export default SearchBox;
