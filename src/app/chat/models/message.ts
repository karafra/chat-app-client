export interface IMessage {
    message?: string;
    authorRandomId?: string;
    authorUsername?: string;
    type?: string;

    clearMessage(): void;
}

export class Message  implements IMessage{

  message?: string;
  authorRandomId?: string;
  creationDate?: any;
  authorUsername?: string;
  type?: string;

  public constructor(
    message?: string,
    authorRandomId?: string,
    creationDate?: any,
    authorUsername?: string,
    type?: string
  ) {
    this.message = message;
    this.authorRandomId = authorRandomId;
    this.creationDate = creationDate;
    this.authorUsername = authorUsername;
    this.type = type;
  }
  
  public clearMessage(): void {
    this.message = '';
  }
}
