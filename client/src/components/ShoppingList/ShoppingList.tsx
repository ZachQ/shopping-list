import { Box, Typography, Button } from '@mui/material';
import { useTypedSelector } from '../../store/hooks';

const ShoppingList = () => {
    const items = useTypedSelector((state) => state.shopping.items);

    if (!items || items.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <Box
                    sx={{
                        padding: 4,
                        width: 614,
                        height: 290,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #C6C6C6',
                        borderRadius: '5px',
                        mt: 2,
                    }}
                >
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                        Your shopping list is empty :(
                    </Typography>
                    <Button
                        variant="contained"
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
            </Box>
        );
    }

    return <div>Your shopping list will be shown here.</div>;
};

export default ShoppingList;