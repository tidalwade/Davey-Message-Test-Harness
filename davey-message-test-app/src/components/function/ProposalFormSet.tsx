import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {
    ProposalType,
    Message,
    MessageCategory,
    ReasonForDecline,
    ProposalFormControls,
    ProposalResponseStatus,
} from "../../types";
import StandardProposalFrom from "./ProposalForms/StandardProposalForm";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomAlert from "../static/CustomAlert";
import DefaultRenewalForm from "./ProposalForms/DefaultRenewalForm";
import EVGRenewalForm from "./ProposalForms/EVGRenewalForm";
import FormPicker from "./FormPicker";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: "#c53f14",
            color: "white",
            "&:hover": {
                backgroundColor: "#C56749",
            },
            textTransform: "none",
        },
    })
);

interface ProposalFormSetProps {
    setMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
}

const ProposalFormSet: React.FC<ProposalFormSetProps> = ({ setMessage }) => {
    const classes = useStyles();
    const [proposalType, setProposalType] = useState<ProposalType>(
        ProposalType.Proposal
    );

    const [mainResponse, setMainResponse] = useState<string>("");
    const [comments, setComments] = useState<string>("");
    const [messageCategory, setMessageCategory] = useState<MessageCategory>(
        MessageCategory.None
    );
    const [reasonForDecline, setReasonForDecline] = useState<ReasonForDecline>(
        ReasonForDecline.None
    );

    const [proposalResponseStatus, setProposalResponseStatus] =
        useState<ProposalResponseStatus>("None");

    const [declineSnackbarOpen, setDeclineSnackbarOpen] =
        useState<boolean>(false);
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [displayTermsFeedback, setDisplayTermsFeedback] =
        useState<boolean>(false);
    const [radioAlertOpen, setRadioAlertOpen] = useState<boolean>(false);

    const clearForm = () => {
        setComments("");
        setMainResponse("");
        setMessageCategory(MessageCategory.None);
        setReasonForDecline(ReasonForDecline.None);
        setProposalResponseStatus("None");
        setTermsChecked(false);
    };

    useEffect(() => {
        switch (messageCategory) {
            case MessageCategory.PropAcceptance: {
                setProposalResponseStatus("Accept");
                break;
            }
            case MessageCategory.RenewAcceptance: {
                setProposalResponseStatus("Accept");
                break;
            }
            case MessageCategory.PropDiscuss: {
                setProposalResponseStatus("Discuss");
                break;
            }
            case MessageCategory.RenewDiscuss: {
                setProposalResponseStatus("Discuss");
                break;
            }
            case MessageCategory.PropRejection: {
                setProposalResponseStatus("Reject");
                break;
            }
            case MessageCategory.RenewRejection: {
                setProposalResponseStatus("Reject");
                break;
            }
            default: {
                setProposalResponseStatus("None");
                break;
            }
        }
    }, [messageCategory]);

    useEffect(() => {
        clearForm();
    }, [proposalType]);

    const proposalFormControls: ProposalFormControls = {
        comments,
        setComments,
        setMainResponse,
        setMessageCategory,
        termsChecked,
        setTermsChecked,
        reasonForDecline,
        setReasonForDecline,
        proposalResponseStatus,
    };

    const constructMessageText = () => {
        let declineReasonText = "";
        let proposalInfo = "";
        let formComments = "";
        switch (proposalType) {
            case ProposalType.Proposal: {
                proposalInfo = `Proposal Number: 123456 Presented Date: ${new Date().toLocaleDateString()}`;
                break;
            }
            case ProposalType.DefaultRenewal: {
                proposalInfo = `Proposal Number: 123456 Renewal Year: ${new Date().getFullYear()} Renewal Type: NEV`;
                break;
            }
            case ProposalType.EVGRenewal: {
                proposalInfo = `Proposal Number: 123456 Renewal Year: ${new Date().getFullYear()} Renewal Type: EVG`;
                break;
            }
        }
        if (comments.length > 0) {
            formComments = `Comments: ${comments}`;
        } else {
            formComments = "Comments: None";
        }
        if (reasonForDecline !== ReasonForDecline.None) {
            declineReasonText = `Reason For Decline: ${reasonForDecline}`;
        }
        // const messageText =
        //     mainResponse +
        //     " " +
        //     proposalInfo +
        //     " " +
        //     declineReasonText +
        //     " " +
        //     formComments;
        // return messageText;
        return (
            <Typography
                color="textPrimary"
                variant="body2"
            >
                {mainResponse}
                <br />
                {proposalInfo}
                <br />
                {declineReasonText}
                <br />
                {formComments}
            </Typography>
        )
    };

    const constructAndSendMessage = () => {
        const message: Message = {
            messageText: constructMessageText(),
            category: messageCategory,
            sentDate: new Date(),
        };
        setMessage(message);
    };

    const onSubmit = () => {
        switch (proposalResponseStatus) {
            case "None": {
                setRadioAlertOpen(true);
                break;
            }
            case "Reject": {
                if (reasonForDecline === ReasonForDecline.None) {
                    setDeclineSnackbarOpen(true);
                } else {
                    constructAndSendMessage();
                }
                break;
            }
            case "Discuss": {
                constructAndSendMessage();
                break;
            }
            case "Accept": {
                if (!termsChecked) {
                    setDisplayTermsFeedback(true);
                } else {
                    constructAndSendMessage();
                }
                break;
            }
        }
    };

    const getCorrectForm = (proposalType: ProposalType) => {
        switch (proposalType) {
            case ProposalType.Proposal:
                return (
                    <StandardProposalFrom
                        proposalFormControls={proposalFormControls}
                    />
                );
            case ProposalType.EVGRenewal:
                return (
                    <EVGRenewalForm
                        proposalFormControls={proposalFormControls}
                    />
                );
            case ProposalType.DefaultRenewal:
                return (
                    <DefaultRenewalForm
                        proposalFormControls={proposalFormControls}
                    />
                );
        }
    };

    const handleTermsFeedbackClose = () => {
        setDisplayTermsFeedback(false);
    };

    const handleDeclineReasonSnackbarClose = () => {
        setDeclineSnackbarOpen(false);
    };

    const handleRadioAlertClose = () => {
        setRadioAlertOpen(false);
    };

    return (
        <div style={{ height: "50vh" }}>
            <FormPicker
                proposalType={proposalType}
                setProposalType={setProposalType}
            />
            <Card>
                <CardHeader id="custom-title">
                    Review Actions for {new Date().getFullYear()} {proposalType}
                </CardHeader>
                <CardContent style={{ marginLeft: 5, marginRight: 5 }}>
                    {getCorrectForm(proposalType)}
                </CardContent>
                <CardActions>
                    <Button onClick={onSubmit} className={classes.button}>
                        Submit
                    </Button>
                    <Button className={classes.button} onClick={clearForm}>
                        Reset Form
                    </Button>
                </CardActions>
            </Card>
            <CustomAlert
                open={displayTermsFeedback}
                handleClose={handleTermsFeedbackClose}
                severity="error"
                message="Please indicate you have read and agree to the terms and conditions before clicking 'Submit'"
            />
            <CustomAlert
                open={declineSnackbarOpen}
                handleClose={handleDeclineReasonSnackbarClose}
                severity="error"
                message="Please indicate a reason for declining"
            />
            <CustomAlert
                open={radioAlertOpen}
                handleClose={handleRadioAlertClose}
                severity="error"
                message="Please select an option before submitting"
            />
        </div>
    );
};

export default ProposalFormSet;
