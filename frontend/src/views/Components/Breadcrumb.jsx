import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

const pageTitles = {
  home: 'Home',
  verify: 'VERIFICATION',
  products: 'PRODUCT LIST',
  reports: 'REPORT',
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean); // removes empty strings

  // If user is at /dashboard or /dashboard/home, don't render anything
  if (pathParts.length <= 1 || pathParts[1] === 'home') {
    return null;
  }

  const pageKey = pathParts[1];
  const title = pageTitles[pageKey] || '';

  return (
    <div className="flex items-center space-x-2 text-2xl font-bold">
      <FaAngleRight />
      <span>{title}</span>
    </div>
  );
};

export default Breadcrumb;
