import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("keyword") || "";
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    if (keyword.trim()) {
      searchParams.set("keyword", keyword);
    } else {
      searchParams.delete("keyword");
    }
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={submitHandler} className="relative flex w-full max-w-md">
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-gray-50"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-indigo-600 transition"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
