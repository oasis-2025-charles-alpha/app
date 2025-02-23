function PriceFilter({ onSortChange }) {
    return (
        <div className="price-filter">
            <nav>
                <button 
                    onClick={() => onSortChange('high-low')}
                    className="sort-option"
                >
                    Price: High to Low
                </button>
                <button 
                    onClick={() => onSortChange('low-high')}
                    className="sort-option"
                >
                    Price: Low to High
                </button>
            </nav>
        </div>
    );
}

export default PriceFilter;
