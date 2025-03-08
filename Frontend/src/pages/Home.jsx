import FilterBar from "../components/FilterBar";
import Head from "../Head";
import "./Home.css";

function Home() {
    return <>
        <Head />
        <div className="main-container">
            {/*vertical line */}
            <div className="filter-section">
                <FilterBar />
            </div>
            <div className="book-list-section">
                {/* Book listings will go here */}
            </div>
        </div>
    </>
}

export default Home;    

