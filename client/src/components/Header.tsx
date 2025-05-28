import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)({
    fontFamily: 'Dosis',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0.25px',
    textTransform: 'uppercase',
    position: 'absolute',
    width: 113,
    height: 23,
    top: '20px',
    left: '30px',
});

const Header: React.FC = () => {
    return (
        <AppBar color='primary'>
            <Toolbar>
                <Title>
                    Shopping List
                </Title>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
