import React from "react";
import Typography from "@material-ui/core/Typography";
import { MessageCategory } from "../../types";
import parse from 'html-react-parser';
import { formRegExps } from "../../services/RegexService";

interface TransformedMessageTextProps {
    messageText: string;
    category: MessageCategory;
}

const TransformedMessageText: React.FC<TransformedMessageTextProps> = ({
    messageText,
    category,
}) => {
    // const isFormMessage: boolean =
    //     category === MessageCategory.PropAcceptance ||
    //     MessageCategory.PropDiscuss ||
    //     MessageCategory.PropRejection ||
    //     MessageCategory.RenewAcceptance ||
    //     MessageCategory.RenewDiscuss ||
    //     MessageCategory.RenewRejection
    //         ? true
    //         : false;

    // if (isFormMessage) {
    //     const commentsIndex = messageText.search(formRegExps.commentsRegEx);
    //     const proposalNumberIndex = messageText.search(
    //         formRegExps.proposalNumberRegEx
    //     );

    //     const introString = messageText.substring(0, proposalNumberIndex);
    //     const commentsString = messageText.substring(commentsIndex);

    //     if (
    //         category === MessageCategory.PropAcceptance ||
    //         MessageCategory.PropDiscuss ||
    //         MessageCategory.PropRejection
    //     ) {
    //         const presentedDateIndex = messageText.search(
    //             formRegExps.presentedDateRegEx
    //         );

    //         const proposalNumberString = messageText.substring(
    //             proposalNumberIndex,
    //             presentedDateIndex
    //         );

    //         if (category === MessageCategory.PropRejection) {
    //             const declineReasonIndex = messageText.search(
    //                 formRegExps.declineReasonRegEx
    //             );

    //             const declineReasonString = messageText.substring(
    //                 declineReasonIndex,
    //                 commentsIndex
    //             );

    //             const presentedDateString = messageText.substring(
    //                 presentedDateIndex,
    //                 declineReasonIndex
    //             );
    //             return (
    //                 <Typography color="textPrimary" variant="body2">
    //                     {introString}
    //                     <br />
    //                     {proposalNumberString}
    //                     <br />
    //                     {presentedDateString}
    //                     <br />
    //                     {declineReasonString}
    //                     <br />
    //                     {commentsString}
    //                 </Typography>
    //             );
    //         }

    //         const presentedDateString = messageText.substring(
    //             presentedDateIndex,
    //             commentsIndex
    //         );

    //         return (
    //             <Typography color="textPrimary" variant="body2">
    //                 {introString}
    //                 <br />
    //                 {proposalNumberString}
    //                 <br />
    //                 {presentedDateString}
    //                 <br />
    //                 {commentsString}
    //             </Typography>
    //         );
    //     }

    //     if (
    //         category === MessageCategory.RenewAcceptance ||
    //         MessageCategory.RenewDiscuss ||
    //         MessageCategory.RenewRejection
    //     ) {
    //         const renewalYearIndex = messageText.search(
    //             formRegExps.renewalYearRegEx
    //         );
    //         const renewalTypeIndex = messageText.search(
    //             formRegExps.renewalTypeRegEx
    //         );

    //         const proposalNumberString = messageText.substring(
    //             proposalNumberIndex,
    //             renewalYearIndex
    //         );
    //         const renewalYearString = messageText.substring(
    //             renewalYearIndex,
    //             renewalTypeIndex
    //         );

    //         if (category === MessageCategory.RenewRejection) {
    //             const declineReasonIndex = messageText.search(
    //                 formRegExps.declineReasonRegEx
    //             );
    //             const renewalTypeString = messageText.substring(
    //                 renewalTypeIndex,
    //                 declineReasonIndex
    //             );
    //             const declineReasonString = messageText.substring(
    //                 declineReasonIndex,
    //                 commentsIndex
    //             );
    //             return (
    //                 <Typography color="textPrimary" variant="body2">
    //                     {introString}
    //                     <br />
    //                     {proposalNumberString}
    //                     <br />
    //                     {renewalYearString}
    //                     <br />
    //                     {renewalTypeString}
    //                     <br />
    //                     {declineReasonString}
    //                     <br />
    //                     {commentsString}
    //                 </Typography>
    //             );
    //         }

    //         const renewalTypeString = messageText.substring(
    //             renewalTypeIndex,
    //             commentsIndex
    //         );

    //         return (
    //             <Typography color="textPrimary" variant="body2">
    //                 {introString}
    //                 <br />
    //                 {proposalNumberString}
    //                 <br />
    //                 {renewalYearString}
    //                 <br />
    //                 {renewalTypeString}
    //                 <br />
    //                 {commentsString}
    //             </Typography>
    //         );
    //     }
    // }
    return (
        <Typography
            color="textPrimary"
            variant="body2"
        >{parse(messageText)}
        </Typography>
    );
};

export default TransformedMessageText;
