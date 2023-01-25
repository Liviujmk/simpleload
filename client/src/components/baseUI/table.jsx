import { useState } from "react";

import Checkmark from "./checkmark";

const Row = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);
    return (
        <>
            <tr>
                <td className="th-check rowTable">
                    <Checkmark selectAllRows={true} />
                </td>
                {
                    props.info.map((info) => {
                        return <td>{info}</td>;
                    })
                }
                <td>
                    <button className="btn btn-link"
                        onClick={() => { props.deleteFunction(props.deleteKey) }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

const Table = (props) => {
    const MainInfoArray = props.mainInfo;
    const DeleteFunction = props.deleteObject;
    const DeleteKey = props.deleteKey;

    const [selectedRows, setSelectedRows] = useState([]);

    const selectAllRows = () => {
        const newSelectedRows = MainInfoArray.map((row) => row.id);
        setSelectedRows(newSelectedRows);
    };

    return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            {
                                props.selectable ? (
                                    <th className="th-check headerRow" onClick={props.selectAllRows}>
                                        <Checkmark />
                                    </th>
                                ) : null
                            }
                            {props.headers.map((header) => {
                                return <th>{header}</th>;
                            })}
                            {props.action ? <th>Action</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.selectable ? (
                                <td className="th-check rowTable"><Checkmark/></td>
                            ) : null
                        }
                        {MainInfoArray.map((row) => {
                            return (
                                <Row
                                    info={row}
                                    deleteFunction = {() => props.deleteFunction(props.deleteKey)}
                                    editLink = {props.editLink}
                                    viewLink = {props.viewLink}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
