import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Words = (props) => {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    setSorted(
      Object.keys(props.counts)
        .map((k) => [k, props.counts[k]])
        .sort((a, b) => b[1] - a[1])
    );
  }, [props.counts]);

  return (
    <div>
      <TableContainer className="Table" component={Paper}>
        <Table>
          <TableBody>
            {sorted.slice(0, 4).map(([k, v]) => {
              return (
                <TableRow key={k}>
                  <TableCell>{k}</TableCell>
                  <TableCell>{v}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Words;
