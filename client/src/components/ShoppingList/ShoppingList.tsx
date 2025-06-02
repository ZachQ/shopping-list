import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useTypedSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import AddItemModal from './AddItemModal';
import ShoppingListItem from './ShoppingListItem';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../features/shopping/shoppingSlice';
import { fetchItems } from '../../features/shopping/shoppingThunks';
import type { AppDispatch } from '../../store/store';

const ShoppingList = () => {
    const items = useTypedSelector((state) => state.shopping.items);
    const loading = useTypedSelector((state) => state.shopping.loading);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const loadItems = async () => {
            dispatch(setLoading(true));
            await dispatch(fetchItems());
            dispatch(setLoading(false));
        };
        loadItems();
    }, [dispatch]);

    if (loading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
            >
                <CircularProgress color='primary' size={92} />
            </Box>
        );
    }

    if (!items || items.length === 0) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
                px={{ xs: 2, md: 0 }}
            >
                <Box
                    sx={{
                        padding: 4,
                        width: 'min(614px, 100%)',
                        minHeight: 290,
                        display: 'flex',
                        boxSizing: 'border-box',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #C6C6C6',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant='body1' color='text.secondary' sx={{ mb: 2, textAlign: 'center' }}>
                        Your shopping list is empty :(
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={handleOpenModal}
                        color='secondary'
                        sx={{
                            width: 151,
                            height: 36,
                            borderRadius: '4px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            textTransform: 'none',
                        }}
                    >
                        Add your first item
                    </Button>
                </Box>
                <AddItemModal open={openModal} onClose={handleCloseModal} />
            </Box>
        );
    } else {

        return <>
            <Box mt={6} p={4}>
                <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                    <Typography variant='h6' color={'#000000'}>Your Items</Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleOpenModal}>
                        Add Item
                    </Button>
                </Box>
                <AddItemModal open={openModal} onClose={handleCloseModal} />
                {items.map(item => (
                    <ShoppingListItem key={item.id} item={item} />
                ))}
            </Box>
        </>
    }

};

export default ShoppingList;
