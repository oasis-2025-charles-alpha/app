function Head() {
    return ( <>
        <header className="flex items-center justify-between w-full">
            <nav className="flex items-center gap-4 p-2">
                <div className="logo">Logo</div>
                <form action="#" id="search-form">
                    <input type="text" placeholder="Search" className="search-bar" />
                </form>
            </nav>
            
            <nav className="flex items-center gap-4 p-2">
                <button className="login-btn">Log in</button>
                <div className="user-actions flex items-center gap-2">
                    <button className="likes-btn">Likes List</button>
                    <button className="cart-btn">Cart</button>
                </div>
            </nav>
        </header>
    </> )
}

export default Head;



def to_json(self):
return {
    "id": self.id,
    "courseSubject": self.course_subject,
    "courseNumber": self.course_number,
    "professorFname": self.professor_fname,
    "professorLname": self.professor_lname
}