import React, { useState, useEffect } from "react";
import {
    MessageCategory,
    ProposalFormControls,
    ProposalType,
    RenewalRadioOptions,
} from "../../../types";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import DeclineReasonsDropdown from "../DeclineReasonsDropdown";
import TermsCheckbox from "../TermsCheckbox";

interface DefaultRenewalFormProps {
    proposalFormControls: ProposalFormControls;
}

const DefaultRenewalForm: React.FC<DefaultRenewalFormProps> = ({
    proposalFormControls,
}) => {
    const [selectedRadioOption, setSelectedRadioOption] =
        useState<RenewalRadioOptions>(RenewalRadioOptions.None);

    const {
        setMessageCategory,
        setMainResponse,
        comments,
        setComments,
        termsChecked,
        setTermsChecked,
        reasonForDecline,
        setReasonForDecline,
        proposalResponseStatus,
    } = proposalFormControls;

    const rescheduleText = "Yes, please reschedule my prior year services.";
    const scheduleAllText =
        "Yes, please reschedule my prior year services AND all the additional services.";
    const maybeText = "Wait, I would like to discuss the proposed services.";
    const rejectionText =
        "No, I am not interested in rescheduling my services.";

    useEffect(() => {
        switch (selectedRadioOption) {
            case RenewalRadioOptions.All: {
                setMessageCategory(MessageCategory.RenewAcceptance);
                setMainResponse(scheduleAllText);
                break;
            }
            case RenewalRadioOptions.Reschedule: {
                setMessageCategory(MessageCategory.RenewAcceptance);
                setMainResponse(rescheduleText);
                break;
            }
            case RenewalRadioOptions.Maybe: {
                setMessageCategory(MessageCategory.RenewDiscuss);
                setMainResponse(maybeText);
                break;
            }
            case RenewalRadioOptions.No: {
                setMessageCategory(MessageCategory.RenewRejection);
                setMainResponse(rejectionText);
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
            case "All": {
                setSelectedRadioOption(RenewalRadioOptions.All);
                break;
            }
            case "Reschedule": {
                setSelectedRadioOption(RenewalRadioOptions.Reschedule);
                break;
            }
            case "Maybe": {
                setSelectedRadioOption(RenewalRadioOptions.Maybe);
                break;
            }
            case "No": {
                setSelectedRadioOption(RenewalRadioOptions.No);
                break;
            }
        }
    };

    const handleCommentChange = (
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
                        value={RenewalRadioOptions.All}
                        control={<Radio />}
                        label={scheduleAllText}
                    />
                    <FormControlLabel
                        value={RenewalRadioOptions.Reschedule}
                        control={<Radio />}
                        label={rescheduleText}
                    />
                    <FormControlLabel
                        value={RenewalRadioOptions.Maybe}
                        control={<Radio />}
                        label={maybeText}
                    />
                    <FormControlLabel
                        value={RenewalRadioOptions.No}
                        control={<Radio />}
                        label={rejectionText}
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
                rows={6}
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
                    proposalType={ProposalType.DefaultRenewal}
                />
            ) : null}
        </div>
    );
};

export default DefaultRenewalForm;
