import React, { useState, useEffect } from "react";
import {
    MessageCategory,
    ProposalFormControls,
    ProposalRadioOptions,
    ProposalType,
} from "../../../types";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import DeclineReasonsDropdown from "../DeclineReasonsDropdown";
import TermsCheckbox from "../TermsCheckbox";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface EVGRenewalFormProps {
    proposalFormControls: ProposalFormControls;
}

const EVGRenewalForm: React.FC<EVGRenewalFormProps> = ({
    proposalFormControls,
}) => {
    const [selectedRadioOption, setSelectedRadioOption] =
        useState<ProposalRadioOptions>(ProposalRadioOptions.None);
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

    const rescheduleText =
        "My prior year services have been automatically rescheduled for the coming year.";
    const yesText = "Yes, please schedule all of the additional services.";
    const maybeText = "Wait, I would like to discuss my services with you.";
    const noText =
        "No, I do not want to renew my services for the coming year.";

    useEffect(() => {
        switch (selectedRadioOption) {
            case ProposalRadioOptions.Yes: {
                setMessageCategory(MessageCategory.RenewAcceptance);
                setMainResponse(rescheduleText + " " + yesText);
                break;
            }
            case ProposalRadioOptions.Maybe: {
                setMessageCategory(MessageCategory.RenewDiscuss);
                setMainResponse(rescheduleText + " " + maybeText);
                break;
            }
            case ProposalRadioOptions.No: {
                setMessageCategory(MessageCategory.RenewRejection);
                setMainResponse(rescheduleText + " " + noText);
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

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setComments(event.target.value);
    };

    return (
        <div>
            <Card variant="outlined" style={{ marginBottom: 15 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        style={{ color: "#008751" }}
                        gutterBottom
                    >
                        "Evergreen" Renewal
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        This serves as a reminder of the plant health care
                        services you have authorized. You do not need to do
                        anything more. We will be out at your property at the
                        appropriate time.
                    </Typography>
                </CardContent>
            </Card>
            <FormControl component="fieldset" style={{ marginBottom: 15 }}>
                <FormControlLabel
                    disabled
                    checked
                    control={<Checkbox />}
                    label={rescheduleText}
                />
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
                    proposalType={ProposalType.EVGRenewal}
                />
            ) : null}
        </div>
    );
};

export default EVGRenewalForm;
