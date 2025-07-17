import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { toast } from "react-toastify";

const FavoritesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Remove from favorites
  const handleRemoveFavorite = (id: string) => {
    const newFavs = favorites.filter((favId) => favId !== id);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setProducts(products.filter((p) => p.id !== id));
    toast.info("Đã bỏ yêu thích");
  };

  useEffect(() => {
    const fetchFav = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get<Product[]>("/products");
        setProducts(res.data.filter((p) => favorites.includes(p.id)));
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải danh sách yêu thích");
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-white to-red-50/30 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khóa học <span className="text-red-600">yêu thích</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những khóa học bạn đã lưu để học sau
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats/Info Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Danh sách yêu thích
            </h2>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {products.length} khóa học
            </span>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có khóa học yêu thích
            </h3>
            <p className="text-gray-600 mb-6">
              Hãy khám phá và lưu những khóa học bạn quan tâm
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
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
              <span>Khám phá khóa học</span>
            </a>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={setSelectedProduct}
                  onToggleFavorite={handleRemoveFavorite}
                  isFavorite
                />
              ))}
            </div>
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

export default FavoritesPage;
