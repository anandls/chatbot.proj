import { Router } from "express";
const router = Router();
import { messageService } from "../../../../services";

export default {
  async postMessage(payload) {
    const { text, author, authortype, sessionId } = payload;

    const message = await messageService.newMessage(
      text,
      author,
      authortype,
      sessionId
    );

    console.log("text: ", text);
    console.log("author: ", author);
    console.log("authortype: ", authortype);
    console.log("sessionId: ", sessionId);
    return message;
  },
};
