import React from "react";
import { IoSearch } from "react-icons/io5";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  priceFilter: string;
  setPriceFilter: (f: string) => void;
  onSuggest: () => void;
}

const FilterBar: React.FC<Props> = ({
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  onSuggest,
}) => {
  const handleReset = () => {
    setSearch("");
    setPriceFilter("all");
  };

  return (
    <div className="mb-4 space-y-4">
      {/* Search input with icon inside */}
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="w-full border border-gray-300 p-3 pr-10 rounded-md focus:outline-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSuggest()}
        />
        <IoSearch
          onClick={onSuggest}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600 w-5 h-5"
        />
      </div>

      {/* Filters and actions */}
      <div className="flex items-center gap-4">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex outline-none"
        >
          <option value="all">Tất cả giá</option>
          <option value="<500k">Dưới 500K</option>
          <option value="500k-1m">500K - 1 triệu</option>
          <option value=">1m">Trên 1 triệu</option>
        </select>
        <button
          onClick={onSuggest}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Gợi ý AI
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Khôi phục bộ lọc
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
