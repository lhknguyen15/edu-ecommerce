import React from "react";
import type { Product } from "../types/product";

interface Props {
  product: Product;
  onViewDetail?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<Props> = ({
  product,
  onViewDetail,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient overlay - chỉ hiển thị khi hover trên desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Button overlay - Giải pháp 1: Hiển thị khác nhau trên mobile và desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-600/95 via-green-600/50 to-transparent flex items-end justify-center pb-6
                        /* Mobile: luôn hiển thị với opacity thấp */
                        opacity-30 hover:opacity-100
                        /* Desktop: chỉ hiển thị khi hover */
                        md:opacity-0 md:group-hover:opacity-100 md:transition-all md:duration-300"
        >
          <button
            className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:bg-blue-50
                       /* Mobile: luôn hiển thị button */
                       translate-y-0 opacity-100
                       /* Desktop: hiệu ứng slide up khi hover */
                       md:translate-y-4 md:group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail?.(product);
            }}
          >
            Xem chi tiết
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed min-h-[4rem]">
          {product.shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-green-600 text-lg font-bold">
              {product.price.toLocaleString()} đ
            </span>
          </div>

          {/* Favorite Button */}
          <button
            className={`w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer ${
              isFavorite
                ? "bg-red-50 text-red-500 hover:bg-red-100 hover:scale-110"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400 hover:scale-110"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product.id);
            }}
          >
            <svg
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite
                  ? "fill-current"
                  : "fill-none stroke-current stroke-2"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
