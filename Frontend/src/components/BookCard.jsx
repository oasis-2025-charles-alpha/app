function BookCard({ title, author, price, imageUrl, condition }) {
    return (
        <div className="book-card">
            <img src={imageUrl} alt={title} className="book-image" />
            <div className="book-details">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">{author}</p>
                <div className="price-condition">
                    <span className="book-price">${price}</span>
                    <span className="book-condition">{condition}</span>
                </div>
            </div>
        </div>
    );
}

export default BookCard;