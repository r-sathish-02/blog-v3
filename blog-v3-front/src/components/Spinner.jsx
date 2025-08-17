import React from "react";
import './css/spinner.css'
function Spinner() {
    return (
        <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    )
}
export default Spinner;