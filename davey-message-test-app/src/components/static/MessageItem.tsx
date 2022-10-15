import React from "react";
import { MessageCategory } from "../../types";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import TransformedMessageText from "./TransformedMessageText";
import Card from "@material-ui/core/Card";
import { Message } from "../../types";

interface MessageItemProps {
    message: Message | undefined;
}
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isFromDavey: boolean = false;
    const category: MessageCategory = message
        ? message.category
        : MessageCategory.None;
    const sentDate: Date = message ? message.sentDate : new Date();
    const messageText: string = message ? message.messageText : "";

    return (
        <Card style={{ width: "100%", height: "46.5vh", padding: 20 }}>
            <ListItemText
                style={{
                    textAlign: isFromDavey ? "left" : "right",
                }}
                primary={
                    <Chip
                        label={"Ada Lovelace"}
                        style={{
                            color: !isFromDavey ? "white" : "black",
                            backgroundColor: !isFromDavey
                                ? "#008751"
                                : "#e5e5e5",
                        }}
                    />
                }
                secondary={
                    <div style={{ marginTop: 7 }}>
                        <strong
                            style={{
                                color: "black",
                                fontSize: 16,
                            }}
                        >
                            {category}
                        </strong>
                        <TransformedMessageText
                            messageText={messageText}
                            category={category}
                        />
                        <Typography component="span" variant="body2">
                            {sentDate.toLocaleDateString() + " "}
                            {sentDate.toLocaleTimeString()}
                        </Typography>
                    </div>
                }
            />
        </Card>
    );
};

export default MessageItem;
