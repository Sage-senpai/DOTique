import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FilterTabs.scss';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  'All',
  'Single',
  'Editions',
  'Collections',
  'Art',
  'Music',
  'Wearables',
  'Avatars',
  '3D Models',
  'Virtual Spaces',
  'Photography',
  'Gaming',
];

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    checkArrows();
  }, []);

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(checkArrows, 300);
    }
  };

  return (
  <div className="filter-tabs">
    {/* Dropdown (Mobile Only) */}
    <div className="filter-tabs__dropdown">
      <select
        value={activeFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-tabs__select"
      >
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>

    {/* Scrollable Tabs (Desktop & Tablet) */}
    <div className="filter-tabs__scroll">
      {showLeftArrow && (
        <motion.button
          className="filter-tabs__arrow filter-tabs__arrow--left"
          onClick={() => scroll('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} />
        </motion.button>
      )}

      <div
        className="filter-tabs__container"
        ref={scrollContainerRef}
        onScroll={checkArrows}
      >
        {filters.map((filter) => (
          <motion.button
            key={filter}
            className={`filter-tabs__tab ${
              activeFilter === filter ? 'filter-tabs__tab--active' : ''
            }`}
            onClick={() => onFilterChange(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {showRightArrow && (
        <motion.button
          className="filter-tabs__arrow filter-tabs__arrow--right"
          onClick={() => scroll('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      )}
    </div>
  </div>
);

};

export default FilterTabs;