import { Router } from "express";
const router = Router();

import { conversationService } from "../../../../services";

/**
 * Get message by sessionId
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
router.get("/v1/conversations/get/total", async (req, res) => {
  const { sessionId } = req.body;

  const conversations = await conversationService.getTotalConversations(
    sessionId
  );
  res.json(conversations);
});

export { router as getTotalConversation };
