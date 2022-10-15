import React from "react";
import { ProposalType } from "../../types";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface FormPickerProps {
    proposalType: ProposalType;
    setProposalType: React.Dispatch<React.SetStateAction<ProposalType>>;
}

const FormPicker: React.FC<FormPickerProps> = ({
    proposalType,
    setProposalType,
}) => {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        switch (value) {
            case "Proposal": {
                setProposalType(ProposalType.Proposal);
                break;
            }
            case "Default Renewal": {
                setProposalType(ProposalType.DefaultRenewal);
                break;
            }
            case "EVG Renewal": {
                setProposalType(ProposalType.EVGRenewal);
                break;
            }
        }
    };

    return (
        <FormControl>
            <RadioGroup row onChange={handleRadioChange} value={proposalType}>
                <FormControlLabel
                    value={ProposalType.Proposal}
                    control={<Radio />}
                    label="Proposal Form"
                />
                <FormControlLabel
                    value={ProposalType.DefaultRenewal}
                    control={<Radio />}
                    label="Default Renewal Form"
                />
                <FormControlLabel
                    value={ProposalType.EVGRenewal}
                    control={<Radio />}
                    label="EVG Renewal Form"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default FormPicker;
