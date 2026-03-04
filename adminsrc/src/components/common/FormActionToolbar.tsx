import {
    Toolbar,
    SaveButton,
    ListButton
}  from 'react-admin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const FormActionToolbar = () => {
    return (
        <Toolbar>
            <SaveButton alwaysEnable />
            <ListButton label="Back to List" icon={<ArrowBackIcon />} />
        </Toolbar>
    );
};