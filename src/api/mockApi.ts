import axiosClient from "./axiosClient";
import MockAdapter from "axios-mock-adapter";
import type { Product } from "../types/product";
import reactLogo from "../assets/react-logo.png";
const mock = new MockAdapter(axiosClient, { delayResponse: 500 });

const products: Product[] = [
  {
    id: "1",
    name: "Khóa học React",
    price: 300000,
    image: reactLogo,
    shortDesc: "Học React từ cơ bản",
    longDesc: "Khóa React chuyên sâu, thực hành project.",
  },
  {
    id: "2",
    name: "Lập trình AI",
    price: 1200000,
    image: reactLogo,
    shortDesc: "Khóa AI nâng cao",
    longDesc: "Machine Learning - Deep Learning.",
  },
  {
    id: "3",
    name: "Tiếng Anh giao tiếp",
    price: 700000,
    image: reactLogo,
    shortDesc: "Giao tiếp lưu loát",
    longDesc: "Học với người bản xứ.",
  },
  {
    id: "4",
    name: "Khóa học React",
    price: 300000,
    image: reactLogo,
    shortDesc: "Học React từ cơ bản",
    longDesc: "Khóa React chuyên sâu, thực hành project.",
  },
  {
    id: "5",
    name: "Lập trình AI",
    price: 1200000,
    image: reactLogo,
    shortDesc: "Khóa AI nâng cao",
    longDesc: "Machine Learning - Deep Learning.",
  },
  {
    id: "6",
    name: "Tiếng Anh giao tiếp",
    price: 700000,
    image: reactLogo,
    shortDesc: "Giao tiếp lưu loát",
    longDesc: "Học với người bản xứ.",
  },
  {
    id: "7",
    name: "Khóa học React",
    price: 300000,
    image: reactLogo,
    shortDesc: "Học React từ cơ bản",
    longDesc: "Khóa React chuyên sâu, thực hành project.",
  },
  {
    id: "8",
    name: "Lập trình AI",
    price: 1200000,
    image: reactLogo,
    shortDesc: "Khóa AI nâng cao",
    longDesc: "Machine Learning - Deep Learning.",
  },
  {
    id: "9",
    name: "Tiếng Anh giao tiếp",
    price: 700000,
    image: reactLogo,
    shortDesc: "Giao tiếp lưu loát",
    longDesc: "Học với người bản xứ.",
  },
  {
    id: "10",
    name: "Khóa học React",
    price: 300000,
    image: reactLogo,
    shortDesc: "Học React từ cơ bản",
    longDesc: "Khóa React chuyên sâu, thực hành project.",
  },
  {
    id: "11",
    name: "Lập trình AI",
    price: 1200000,
    image: reactLogo,
    shortDesc: "Khóa AI nâng cao",
    longDesc: "Machine Learning - Deep Learning.",
  },
  {
    id: "12",
    name: "Tiếng Anh giao tiếp",
    price: 700000,
    image: reactLogo,
    shortDesc: "Giao tiếp lưu loát",
    longDesc: "Học với người bản xứ.",
  },
];

mock.onGet("/products").reply(200, products);
mock.onGet("/suggestions").reply(
  200,
  products.filter((p) => p.price > 500000)
);

export default mock;
