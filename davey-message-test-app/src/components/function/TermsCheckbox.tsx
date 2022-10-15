import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CustomAlert from "../static/CustomAlert";
import { ProposalType } from "../../types";

const GreenCheckbox = withStyles({
    root: {
        color: "#008751",
        "&$checked": {
            color: "#008751",
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface TermsCheckboxProps {
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    proposalType: ProposalType;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
    checked,
    setChecked,
    proposalType,
}) => {
    const [loadingTerms, setLoadingTerms] = useState<boolean>(false);

    const handleClose = () => {
        setLoadingTerms(false);
    };
    const handleClick = () => {
        setChecked(!checked);
    };
    const handleLinkClick = async () => {
        setLoadingTerms(true);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <GreenCheckbox
                        checked={checked}
                        onChange={handleClick}
                        name="termsCheckbox"
                    />
                }
                label={
                    <Typography variant="body1">
                        I have read and agree to the{" "}
                        <Link onClick={handleLinkClick}>
                            Terms and Conditions
                        </Link>{" "}
                        attached to the {proposalType}
                    </Typography>
                }
            />
            <CustomAlert
                open={loadingTerms}
                severity="info"
                message="Retrieving Terms & Conditions..."
                handleClose={handleClose}
            />
        </>
    );
};

export default TermsCheckbox;
