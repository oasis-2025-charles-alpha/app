function FilterBar({ onSortChange }) {
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

            {/* Condition Filter Section */}
            <div className="condition-filter">
                <h3>Condition</h3>
                <div>
                    <input type="checkbox" id="good" name="good" value="good" />
                    <label htmlFor="good">Good</label>
                </div>
                <div>
                    <input type="checkbox" id="barley-used" name="barley-used" value="barley-used" />
                    <label htmlFor="barley-used">Barley Used</label>
                </div>
                <div>
                    <input type="checkbox" id="well-worn" name="well-worn" value="well-worn" />
                    <label htmlFor="well-worn">Well-Worn</label>
                </div>
            </div>

            {/* College Filter Section */}
            <div className="college-filter">
                <h3>College</h3>
                <select onChange={(e) => onSortChange(e.target.value)}>
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
        </div>
    );
}

export default FilterBar;

