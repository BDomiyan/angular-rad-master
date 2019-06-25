import { Base } from './base';

export class Message extends Base {
    message_id: string;
    sender_id: string;
    sender_name: string;
    text: string;
}