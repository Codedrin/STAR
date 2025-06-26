
import React from 'react';

const Loading = ({ size = 12, overlay = true }) => {
  const dim = `h-${size} w-${size}`;
  const border = 'border-4 border-red-600 border-t-transparent';

  return overlay ? (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className={`${dim} ${border} rounded-full animate-spin`} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div className={`${dim} ${border} rounded-full animate-spin`} />
    </div>
  );
};

export default Loading;
