import React  from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "./GridTable.css";

const GridTable = props =>{
    const { data =[] , columns =[] , toolbarItems} = props;

    return(
        <div>
            {toolbarItems && <div className="d-inline-block ml-5">{toolbarItems}</div>}
            <br />
        <BootstrapTable data={data} striped hover className="leads_table">
            {
              columns.map((column, idx) => {
                return (
                  <TableHeaderColumn
                    isKey={idx == 0 ? true : false}
                    dataField={column.dataField}
                    width={column.width ? String(column.width) : "200px"}
                    dataSort={column.sort === false ? false : true}
                    dataFormat={column.formatter}
                    hidden={column.hidden === true ? true : false}
                    key={idx}
                    hidden={column.hidden || false}
                    className={column.className}
                    columnClassName={column.columnClassName}
                    editable={column.editor ? column.editor : false}
                  >
                    {column.editor && (<i className="fa fa-pencil" style={{ float: "left", marginTop: "5%", marginRight: "2%" }} />)}
                    {column.text}
                  </TableHeaderColumn>
                );
              })}
        </BootstrapTable>
        </div>
    )
};

export default GridTable;