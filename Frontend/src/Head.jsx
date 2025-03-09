import { Link } from 'react-router-dom';
import { useLikes } from './context/LikesContext';

// components/Head.jsx
function Head() {
    const { likedBooks } = useLikes();
    return ( 
        <header className="flex items-center justify-between w-full">
            <nav className="flex items-center gap-4 p-2 flex-1">
                <div className="logo">Logo</div>
                <form action="#" id="search-form">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="search-bar" 
                    />
                </form>
            </nav>
            
            <nav className="flex items-center gap-4 p-2">
                <div className="user-actions flex items-center gap-2">
                    <Link to="/likes" className="likes-btn">
                        Likes ({likedBooks.length})
                    </Link>
                    <button className="cart-btn">Cart</button>
                </div>
                <button className="login-btn">Log in</button>
            </nav>
        </header>
    )
}

export default Head;
