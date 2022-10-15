import { MessageCategory } from "../enum/MessageCategory";

export interface Message {
    category: MessageCategory;
    sentDate: Date;
    messageText: string;
}
