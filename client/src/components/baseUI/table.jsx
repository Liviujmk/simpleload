import React from "react";

import Checkmark from "./checkmark";

const Table = (props) => {
    return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th-check">
                                <Checkmark />
                            </th>
                            {props.headers.map((header) => {
                                return <th>{header}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>{props.children}</tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
