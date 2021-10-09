import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Words = ({ setSorted, sorted, messages, counts }) => {
  useEffect(() => {
    setSorted(
      Object.keys(counts)
        .map((k) => [k, counts[k]])
        .sort((a, b) => b[1] - a[1])
    );
  }, [messages, counts]);

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
