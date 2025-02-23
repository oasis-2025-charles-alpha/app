import React from 'react';

function Sell({
    id,
    courseSubject,
    courseNumber,
    professorFname,
    professorLname
}) {
    return (
        <div className="sell-item">
            <h2>Sell Listing</h2>
            <div className="item-info">
                <div>ID: {id}</div>
                <div>Course Subject: {courseSubject}</div>
                <div>Course Number: {courseNumber}</div>
                <div>Professor Name: {professorFname} {professorLname}</div>
            </div>
        </div>
    );
}

export default Sell;
