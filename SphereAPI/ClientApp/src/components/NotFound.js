import React from 'react';

import "../custom.css";

export default function NotFound() {
        console.log("Not Found");
    return (
        <div className="notFoundBox" >
            <div className="notFound" >
                <h1>Error 404</h1>
                <p>Not found</p>
            </div>
        </div>
    );
}