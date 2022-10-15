import { FormRegExps } from "../types";

export const formRegExps: FormRegExps = {
    commentsRegEx: new RegExp(/(Comments:)/),
    presentedDateRegEx: new RegExp(/(Presented Date:)/),
    renewalYearRegEx: new RegExp(/(Renewal Year:)/),
    renewalTypeRegEx: new RegExp(/(Renewal Type:)/),
    declineReasonRegEx: new RegExp(/(Reason For Decline:)/),
    proposalNumberRegEx: new RegExp(/(Proposal Number:)/),
};
