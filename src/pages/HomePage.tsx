import React, { useEffect, useState } from "react";
import { getProducts, getSuggestions } from "../api/productsApi";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import FilterBar from "../components/FilterBar";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // For incremental loading
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      const data = await getSuggestions();
      setProducts(data);
      toast.success("Đã lấy gợi ý AI!");
      setVisibleCount(8);
    } catch (err) {
      console.error(err);
      toast.error("Không thể lấy gợi ý lúc này");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const toggleFavorite = (id: string) => {
    let newFavs: string[];
    if (favorites.includes(id)) {
      newFavs = favorites.filter((favId) => favId !== id);
      toast.info("Đã bỏ yêu thích");
    } else {
      newFavs = [...favorites, id];
      toast.success("Đã thêm vào yêu thích");
    }
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const filtered = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    let matchesPrice = true;
    if (priceFilter === "<500k") matchesPrice = p.price < 500000;
    if (priceFilter === "500k-1m")
      matchesPrice = p.price >= 500000 && p.price <= 1000000;
    if (priceFilter === ">1m") matchesPrice = p.price > 1000000;
    return matchesName && matchesPrice;
  });

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-white to-green-50/30 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khám phá khóa học <span className="text-green-600">EdTech</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tìm kiếm và học hỏi từ những khóa học chất lượng cao được tuyển
              chọn kỹ lưỡng
            </p>
          </div>

          {/* Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <FilterBar
              search={search}
              setSearch={setSearch}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              onSuggest={handleGetSuggestions}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats/Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Danh sách khóa học
            </h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {filtered.length} khóa học
            </span>
          </div>
        </div>

        {loading || loadingSuggestions ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600 mb-6">
              Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
            </p>
            <button
              onClick={() => {
                setSearch("");
                setPriceFilter("all");
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewDetail={setSelectedProduct}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(p.id)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((c) => c + 8)}
                  className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Xem thêm khóa học
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default HomePage;
