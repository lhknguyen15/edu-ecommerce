import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-100 mt-8 p-4 text-center text-sm text-gray-600">
    © {new Date().getFullYear()} My EdTech. All rights reserved.
  </footer>
);

export default Footer;
