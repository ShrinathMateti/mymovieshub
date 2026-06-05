import { memo, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBox = memo(({ value, setSearchValue }) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full flex justify-center md:justify-end px-3">
      <div className="relative w-full max-w-md sm:max-w-lg md:w-full">

        {/* Search Icon */}
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          className="
            w-full
            h-12
            pl-10
            pr-10
            rounded-xl
            bg-slate-800
            text-white
            placeholder-gray-400
            text-sm sm:text-base
            focus:outline-none
            focus:ring-2 focus:ring-yellow-400
            transition
            shadow-sm
          "
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-white
              transition
              p-1
              rounded-full
            "
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBox;