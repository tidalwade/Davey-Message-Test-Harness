import React from "react";
import { ReasonForDecline } from "../../types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

interface DeclineReasonsDropdownProps {
    reason: ReasonForDecline;
    setReason: React.Dispatch<React.SetStateAction<ReasonForDecline>>;
}

const DeclineReasonsDropdown: React.FC<DeclineReasonsDropdownProps> = ({
    reason,
    setReason,
}) => {
    const allReasons: ReasonForDecline[] = [
        ReasonForDecline.Communication,
        ReasonForDecline.Health,
        ReasonForDecline.Moving,
        ReasonForDecline.NotNeeded,
        ReasonForDecline.Pricing,
        ReasonForDecline.Results,
        ReasonForDecline.Schedule,
        ReasonForDecline.Skip,
        ReasonForDecline.Switch,
    ];
    return (
        <TextField
            label="Reason For Decline"
            required
            select
            value={reason}
            style={{ width: "100%", marginTop: 15, marginBottom: 15 }}
            variant="outlined"
        >
            {allReasons.map((re) => (
                <MenuItem
                    value={re}
                    onClick={() => {
                        setReason(re);
                    }}
                >
                    {re}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DeclineReasonsDropdown;
