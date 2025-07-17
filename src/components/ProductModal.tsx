import React, { useEffect } from "react";
import type { Product } from "../types/product";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (product) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 flex items-center justify-center group shadow-lg"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Section */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-t-3xl"></div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Product Name */}
          <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-green-600">
                {product.price.toLocaleString()} đ
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Mô tả sản phẩm
            </h4>
            <p className="text-gray-700 leading-relaxed">{product.longDesc}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-white outline-green-500 outline-solid rounded-2xl shadow-lg hover:shadow-xl cursor-pointer">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
