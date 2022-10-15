import React, { useState, useEffect } from "react";
import {
    MessageCategory,
    ProposalRadioOptions,
    ProposalFormControls,
    ProposalType,
} from "../../../types";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import DeclineReasonsDropdown from "../DeclineReasonsDropdown";
import TermsCheckbox from "../TermsCheckbox";

interface StandardProposalFormProps {
    proposalFormControls: ProposalFormControls;
}

const StandardProposalForm: React.FC<StandardProposalFormProps> = ({
    proposalFormControls,
}) => {
    const [selectedRadioOption, setSelectedRadioOption] =
        useState<ProposalRadioOptions>(ProposalRadioOptions.None);

    const {
        setMessageCategory,
        setMainResponse,
        setComments,
        comments,
        termsChecked,
        setTermsChecked,
        reasonForDecline,
        setReasonForDecline,
        proposalResponseStatus,
    } = proposalFormControls;

    const yesText = `Yes, please schedule the proposed services.`;
    const maybeText = "Maybe, I would like to discuss the proposed services.";
    const noText = "No, I am not interested in the proposed services.";

    useEffect(() => {
        switch (selectedRadioOption) {
            case ProposalRadioOptions.Yes: {
                setMessageCategory(MessageCategory.PropAcceptance);
                setMainResponse(yesText);
                break;
            }
            case ProposalRadioOptions.Maybe: {
                setMessageCategory(MessageCategory.PropDiscuss);
                setMainResponse(maybeText);
                break;
            }
            case ProposalRadioOptions.No: {
                setMessageCategory(MessageCategory.PropRejection);
                setMainResponse(noText);
                break;
            }
            default: {
                setMessageCategory(MessageCategory.None);
                setMainResponse("");
            }
        }
    }, [selectedRadioOption]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        switch (value) {
            case "Yes": {
                setSelectedRadioOption(ProposalRadioOptions.Yes);
                break;
            }
            case "Maybe": {
                setSelectedRadioOption(ProposalRadioOptions.Maybe);
                break;
            }
            case "No": {
                setSelectedRadioOption(ProposalRadioOptions.No);
                break;
            }
        }
    };

    const handleCommentChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setComments(event.target.value);
    };

    return (
        <div>
            <FormControl component="fieldset" style={{ marginBottom: 15 }}>
                <RadioGroup
                    aria-label="acceptance-options"
                    name="options1"
                    value={selectedRadioOption}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel
                        value={ProposalRadioOptions.Yes}
                        control={<Radio />}
                        label={yesText}
                    />
                    <FormControlLabel
                        value={ProposalRadioOptions.Maybe}
                        control={<Radio />}
                        label={maybeText}
                    />
                    <FormControlLabel
                        value={ProposalRadioOptions.No}
                        control={<Radio />}
                        label={noText}
                    />
                </RadioGroup>
            </FormControl>
            {proposalResponseStatus === "Reject" ? (
                <DeclineReasonsDropdown
                    reason={reasonForDecline}
                    setReason={setReasonForDecline}
                />
            ) : null}
            <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                minRows={6}
                placeholder="Comments..."
                variant="outlined"
                value={comments}
                onChange={handleCommentChange}
                style={{ width: "100%" }}
            />
            {proposalResponseStatus === "Accept" ? (
                <TermsCheckbox
                    checked={termsChecked}
                    setChecked={setTermsChecked}
                    proposalType={ProposalType.Proposal}
                />
            ) : null}
        </div>
    );
};

export default StandardProposalForm;
