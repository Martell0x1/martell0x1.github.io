import React from "react";

const DownloadResume = () => {
  return (
    <div className="flex justify-center mt-6">
      <a
        href="/resume.pdf"
        download
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        📄 Download Resume
      </a>
    </div>
  );
};

export default DownloadResume;
