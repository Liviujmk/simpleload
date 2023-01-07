import React from "react";

const Checkmark = (props) => {
    // select/unselect all checkbox

    function select() {
        if (!props.selectAllRows) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
        } else {
            const thisCheckbox = document.querySelector('input[type="checkbox"]');
            thisCheckbox.checked = true;
        }
    }

    return (
        <>
            <div className="checkbox-container" onClick={select} >
                <input type="checkbox" />
                <label htmlFor="cb3"></label>
            </div>
        </>
    );

    /*return (
        <>
            <div className="checkbox-container" onClick={selectAll} >
                <input type="checkbox" id="cb3" />
                <label for="cb3"></label>
            </div>
        </>
    )*/
}

export default Checkmark;