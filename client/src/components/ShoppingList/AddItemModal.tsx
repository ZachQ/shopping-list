import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Button,
    Modal,
    Backdrop,
    Slide,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Toolbar,
    styled,
    AppBar,
    Checkbox,
} from '@mui/material';
import { setLoading, addItem, editItem, toggleCompleted } from '../../features/shopping/shoppingSlice';

interface AddItemModalProps {
    open: boolean;
    onClose: () => void;
    item?: {
        id: string;
        itemName: string;
        quantity: number;
        description?: string;
        completed: boolean;
    };
}
const ModalAppBar = styled(AppBar)({
    fontFamily: 'Dosis',
    fontWeight: 600,
    fontSize: '18px',
    backgroundColor: '#FAFAFA',
    textTransform: 'uppercase',
    color: '#5C6269',
    position: 'static',
    boxShadow: 'none',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    padding: '0px',
});

const modalContentStyle = {
    width: 'min(560px, 90%)',
    height: 'auto',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #C6C6C6',
    boxShadow: 24,
    zIndex: 10,
};

const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose, item }) => {
    const dispatch = useDispatch();
    const transitionDuration = 200;
    const quantities = [1, 2, 3];
    const [itemName, setItemName] = useState(item ? item.itemName ?? '' : '');
    const [quantity, setQuantity] = useState(item ? item.quantity : 1);
    const [description, setDescription] = useState(item ? item.description ?? '' : '');
    const [itemNameError, setItemNameError] = useState(false);

    const handleAddItem = () => {
        if (itemName.trim() === '') {
            setItemNameError(true);
            return;
        }
        dispatch(setLoading(true));
        if (item) {
            dispatch(editItem({ id: item.id, itemName, quantity, description, completed: item.completed }));
        } else {
            dispatch(addItem(itemName, quantity, description));
        }
        setItemName('');
        setQuantity(0);
        setDescription('');
        setItemNameError(false);
        dispatch(setLoading(false));
        onClose();
    };

    const handleCancel = () => {
        setItemName('');
        setQuantity(0);
        setDescription('');
        setItemNameError(false);
        onClose();
    };

    React.useEffect(() => {
        if (!open) {
            setItemName(item ? item.itemName ?? '' : '');
            setDescription(item ? item.description ?? '' : '');
        }
    }, [open, item]);

    return (
        <Modal
            aria-labelledby='add-item-modal-title'
            aria-describedby='add-item-modal-description'
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: transitionDuration,
                    sx: {
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    },
                },
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Slide direction='left' in={open} timeout={{ enter: transitionDuration, exit: transitionDuration }}>
                <Box sx={modalContentStyle}>
                    <ModalAppBar position='static'>
                        <Toolbar sx={{
                            minHeight: '64px',
                            paddingLeft: 0,
                            paddingRight: 0,
                            justifyContent: 'space-between',
                        }}>
                            Shopping List
                            <div onClick={onClose} className='material-icons'>last_page</div>
                        </Toolbar>
                    </ModalAppBar>


                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, mb: 3, p: 4 }}>
                        <Typography id='add-item-modal-title' variant='h6' component='h2' mt={1}>
                            {item ? 'Edit Item' : 'Add an Item'}
                        </Typography>
                        <Typography id='add-item-modal-title' variant='h6' component='h2' mb={3} mt={1}>
                            {item ? 'Edit your item below' : 'Add your new item below'}
                        </Typography>
                        <TextField
                            label='Item Name'
                            variant='outlined'
                            fullWidth
                            value={itemName}
                            onChange={(e) => {
                                setItemName(e.target.value);
                                setItemNameError(false);
                            }}
                            error={itemNameError}
                            helperText={itemNameError ? 'Item name is required' : ''}
                        />
                        <TextField
                            label='Description'
                            variant='outlined'
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id='quantity-select-label'>How many?</InputLabel>
                            <Select
                                labelId='quantity-select-label'
                                id='quantity-select'
                                value={quantity}
                                label='quantity'
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {quantities.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {item && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={item.completed}
                                    onChange={() => dispatch(toggleCompleted(item.id))}
                                />
                                <Typography>Purchased</Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 4, width: '100%' }}>
                        <Button variant='outlined' onClick={handleCancel} sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                        {/* should this be 'Add Task' like in the Figma or 'Add Item' to match the rest of the app? */}
                        <Button variant='contained' color='secondary' onClick={handleAddItem} sx={{ textTransform: 'none' }}>
                            {item ? 'Save Item' : 'Add Task'}
                        </Button>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
};

export default AddItemModal;
