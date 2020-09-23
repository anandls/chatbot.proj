export default class ConversationService {
  constructor(ConversationModel) {
    this.ConversationModel = ConversationModel;
  }

  async getConversation(sessionId) {
    const conversation = await this.ConversationModel.findOne({
      sessionId: sessionId,
    })
      .populate("messages")
      .populate("client", "firstname lastname");

    //change clientid to client
    console.log(conversation);
    return conversation;
  }

  async getTotalConversations(sessionId) {
    const conversationTotal = await this.ConversationModel.aggregate([
      { $group: { _id: "$sessionId", amount: { $sum: "$amount" } } },
      { $project: { location: "$_id", amount: 1, _id: 0 } },
    ]);

    // const conversationTotal = this.ConversationModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$sessionId",
    //       totalRows: { $sum: 1 },
    //       totalConversations: { $addToSet: "$trans.sessionId" },
    //     },
    //   },
    //   {
    //     $project: {
    //       totalRows: { $sum: 1 },
    //       totalConversations: { $size: "$totalConversations" },
    //     },
    //   },
    // ]);

    // const conversationTotal = this.ConversationModel.aggregate([
    //   {
    //     $group: {
    //       _id: { sessionId: "$sessionId" },
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

    //change clientid to client
    console.log(conversationTotal);
    return conversationTotal;
  }
}
