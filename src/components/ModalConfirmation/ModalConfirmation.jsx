import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

function ModalConfirmation({ open, onClose, onConfirm }) {
  const [motivo, setMotivo] = useState('');

  const handleMotivoChange = (event) => {
    setMotivo(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(motivo);
    setMotivo(''); // Limpa o motivo após a confirmação
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Validação</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja validar esta inconformidade e movê-la para procedimentos?
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="motivo"
          label="Motivo da validação"
          type="text"
          multiline
          rows={4} // Define o número de linhas
          fullWidth
          value={motivo}
          onChange={handleMotivoChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalConfirmation;
