import { Box, Modal, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useAppSelector } from "../../../../shared/hooks/redux";
import type { UserSelection } from "../types/truthOrLie";

type TruthOrLieModalProps = {
  closeModal: () => void;
  userSelection: UserSelection[];
};

const TruthOrLieModal = ({ closeModal, userSelection }: TruthOrLieModalProps) => {
  const isOpenModal = useAppSelector((state) => state.truthOrLie.isOpenModal);

  return (
    <Modal
      open={isOpenModal}
      onClose={closeModal}
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
            {userSelection &&
              userSelection.map((row) => (
                <TableRow key={row.statement} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.statement}
                  </TableCell>
                  <TableCell align="center">{row.correctValue ? "Правда" : "Ложь"}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        (row.correctValue && row.userAnswer === "Правда") ||
                        (!row.correctValue && row.userAnswer === "Ложь")
                          ? "green"
                          : "red",
                    }}
                  >
                    {row.userAnswer}
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
