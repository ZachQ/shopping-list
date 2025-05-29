import {
    Box,
    Checkbox,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleted, deleteItem } from '../../features/shopping/shoppingSlice';
import AddItemModal from './AddItemModal';
import ConfirmationModal from './ConfirmationModal';

type Props = {
    item: {
        id: string;
        itemName: string;
        quantity: number;
        description?: string;
        completed: boolean;
    };
};

const ShoppingListItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = () => {
        setIsConfirmationModalOpen(true);
    };

    const handleCloseConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteItem(item.id));
        setIsConfirmationModalOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                mb: 1.5,
                borderRadius: 1.5, // Figma doesn't have a radius, making close guess
                border: item.completed ? 'none' : '.5px solid #D5DFE9',
                backgroundColor: item.completed ? '#D5DFE92B' : '#fff',
            }}
        >
            <Checkbox
                checked={item.completed}
                onChange={() => dispatch(toggleCompleted(item.id))}
            />
            <Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', ml: 2.25 }}>
                <Typography
                    fontWeight={600}
                    color={item.completed ? 'primary' : 'text.primary'}
                    sx={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                >
                    {item.itemName}
                </Typography>
                <Typography
                    variant='body2'
                    color={'text.secondary'}
                    sx={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                >
                    {item.description || 'No description'}
                </Typography>
            </Box>
            <div className='material-icons-outlined' style={{ color: '#555F7C', marginRight: '20px', cursor: 'pointer' }} onClick={handleEdit}>edit</div>
            <div className='material-icons-outlined' onClick={handleDeleteClick}
                style={{ color: '#555F7C', marginRight: '30px', cursor: 'pointer' }}>
                delete
            </div>
            <AddItemModal open={isEditModalOpen} onClose={handleCloseEditModal} item={item} />
            <ConfirmationModal
                open={isConfirmationModalOpen}
                onClose={handleCloseConfirmationModal}
                onConfirm={handleDelete}
                itemName={item.itemName}
            />
        </Box>
    );
};

export default ShoppingListItem;
