import {
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { MockDataTruthOrLie } from "./mockDataTruthOrLie";

type TruthOrLieModalProps = {
  handleClose: () => void;
  open: boolean;
  questions: MockDataTruthOrLie;
  lvl: number;
  userAnswer: string[];
};

const TruthOrLieModal = ({
  handleClose,
  open,
  questions,
  lvl,
  userAnswer,
}: TruthOrLieModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Утверждение</TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Правильный ответ
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Ваш ответ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions[lvl].map((row, index) => (
              <TableRow
                key={row.text}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.text}
                </TableCell>
                <TableCell align="center">
                  {row.answer ? "Правда" : "Ложь"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color:
                      (row.answer && userAnswer[index] === "Правда") ||
                      (!row.answer && userAnswer[index] === "Ложь")
                        ? "green"
                        : "red",
                  }}
                >
                  {userAnswer[index]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default TruthOrLieModal;
