import {
    Box,
    Checkbox,
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleCompleted, deleteItem } from '../../features/shopping/shoppingSlice';

type Props = {
    item: {
        id: string;
        itemName: string;
        description?: string;
        completed: boolean;
    };
};

const ShoppingListItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteItem(item.id));
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
            <div className='material-icons-outlined' style={{ color: '#555F7C', marginRight: '20px', cursor: 'pointer' }}>edit</div>
            <div className='material-icons-outlined' onClick={handleDelete}
                style={{ color: '#555F7C', marginRight: '30px', cursor: 'pointer' }}>
                delete
            </div>
        </Box>
    );
};

export default ShoppingListItem;
