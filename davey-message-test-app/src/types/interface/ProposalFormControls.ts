import React from "react";
import { MessageCategory } from "../enum/MessageCategory";
import { ReasonForDecline } from "../enum/ReasonForDecline";
import { ProposalResponseStatus } from "../type/ProposalResponseStatus";

export interface ProposalFormControls {
    setMessageCategory: React.Dispatch<React.SetStateAction<MessageCategory>>;
    setMainResponse: React.Dispatch<React.SetStateAction<string>>;
    setComments: React.Dispatch<React.SetStateAction<string>>;
    comments: string;
    termsChecked: boolean;
    setTermsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    reasonForDecline: ReasonForDecline;
    setReasonForDecline: React.Dispatch<React.SetStateAction<ReasonForDecline>>;
    proposalResponseStatus: ProposalResponseStatus;
}
