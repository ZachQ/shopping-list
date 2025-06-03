import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
} from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth
            maxWidth={false}
            slots={{
                paper: Paper,
            }}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: '410px',
                        minWidth: '300px',
                        p: '20px',
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontSize: '18px' }}>Delete Item?</DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: '14px' }}>Are you sure you want to delete this item? This can not be undone.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="secondary" variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
