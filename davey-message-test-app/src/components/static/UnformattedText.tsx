import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Message } from "../../types";

interface UnformattedTextProps {
    message: Message | undefined;
}

const UnformattedText: React.FC<UnformattedTextProps> = ({ message }) => {
    const [messageText, setMessageText] = useState<string>(
        message ? message.messageText : ""
    );

    useEffect(() => {
        setMessageText(message ? message.messageText : "");
    }, [message]);

    return (
        <Card style={{ height: "46.5vh" }}>
            <CardContent style={{ textAlign: "initial" }}>
                <Typography variant="h5" gutterBottom>
                    Unformatted Message Text
                </Typography>
                <Typography variant="body1">{messageText}</Typography>
            </CardContent>
        </Card>
    );
};

export default UnformattedText;
