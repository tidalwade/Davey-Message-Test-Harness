import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

interface CustomAlertProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity: Color;
}

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomAlert: React.FC<CustomAlertProps> = ({
    open,
    handleClose,
    message,
    severity,
}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            autoHideDuration={6000}
            onClose={handleClose}
            open={open}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
