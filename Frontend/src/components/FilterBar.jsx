function FilterBar({ onSortChange }) {
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
            <div className="condition-filter">
                <label>Condition:</label>
                <input type="checkbox" name="good" value="good" onChange={(e) => onSortChange(e.target.value)} />
                <span>Good</span>
                <input type="checkbox" name="barley-used" value="barley-used" onChange={(e) => onSortChange(e.target.value)} />
                <span>Barley Used</span>
                <input type="checkbox" name="well-worn" value="well-worn" onChange={(e) => onSortChange(e.target.value)} />
                <span>Well-Worn</span>
            </div>

            {/* Added a new select element for college filtering */}
            <div className="college-filter">
                <label>College:</label>
                <select
                    className="college-option"
                    onChange={(e) => onSortChange(e.target.value)}
                >
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

