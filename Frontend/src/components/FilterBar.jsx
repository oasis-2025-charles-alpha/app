function FilterBar({ 
    onSortChange, 
    onConditionChange, 
    onConditionSearchChange,
    selectedConditions,
    conditionSearch, 
    onCollegeChange,
    selectedCollege,
    onMinPriceChange,
    onMaxPriceChange,
    minPrice,
    maxPrice
}) {
    return (
        <div className="filter-container">
            {/* Price Sorting Section */}
            <div className="price-filter">
                <h3>Price</h3>
                <nav>
                    <button onClick={() => onSortChange('high-low')}>
                        Price: High to Low
                    </button>
                    <button onClick={() => onSortChange('low-high')}>
                        Price: Low to High
                    </button>
                </nav>
            </div>

            <div className="price-range-filter">
                <h3>Price Range</h3>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice || ''}
                        onChange={(e) => onMinPriceChange(e.target.value)}
                        min="0"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice || ''}
                        onChange={(e) => onMaxPriceChange(e.target.value)}
                        min="0"
                    />
                </div>
            </div>

            {/* College Filter Section */}
            <div className="college-filter">
                <h3>College</h3>
                <select 
                    value={selectedCollege || ''}
                    onChange={(e) => onCollegeChange(e.target.value)}>
                    <option value="">All Colleges</option>
                    <option value="Khoury College">Khoury College</option>
                    <option value="School of Law">School of Law</option>
                    <option value="College of Arts, Media and Design">College of Arts, Media and Design</option>
                    <option value="D’Amore-McKim School of Business">D’Amore-McKim School of Business</option>
                    <option value="College of Engineering">College of Engineering</option>
                    <option value="College of Science">College of Science</option>
                    <option value="College of Professional Studies">College of Professional Studies</option>
                    <option value="Bouvé College of Health Sciences">Bouvé College of Health Sciences</option>
                    <option value="College of Social Sciences and Humanities">College of Social Sciences and Humanities</option>
                </select>
            </div>

            {/* Condition Filter Section */}
            <div className="condition-filter">
                <h3>Condition</h3>
                <div>
                    <input 
                        type="checkbox" 
                        id="good"
                        checked={selectedConditions.includes('Good')}
                        onChange={(e) => onConditionChange('Good', e.target.checked)}
                    />
                    <label htmlFor="good">Good</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="barely-used"
                        checked={selectedConditions.includes('Barely Used')}
                        onChange={(e) => onConditionChange('Barely Used', e.target.checked)}
                    />
                    <label htmlFor="barely-used">Barely Used</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="well-worn"
                        checked={selectedConditions.includes('Well-Worn')}
                        onChange={(e) => onConditionChange('Well-Worn', e.target.checked)}
                    />
                    <label htmlFor="well-worn">Well-Worn</label>
                </div>
                <div className="condition-search">
                    <input
                        type="text"
                        placeholder="Search conditions..."
                        value={conditionSearch}
                        onChange={(e) => onConditionSearchChange(e.target.value)}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default FilterBar;