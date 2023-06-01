import { getCategory } from "../utils/categories";
import EntryModal from "./EntryModal";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { Entry } from "~/utils/categories";

export default function BasicTable({ entries }: { entries: Entry[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {entry.name}
              </TableCell>
              <TableCell align="right">
                <Link href={entry.link}>{entry.link}</Link>
              </TableCell>
              <TableCell align="right">{entry.user}</TableCell>
              <TableCell align="right">{getCategory(entry.category)?.name}</TableCell>
              <TableCell align="right">
                <EntryModal entry={entry} type="edit" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
