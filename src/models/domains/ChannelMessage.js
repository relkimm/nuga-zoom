export default class ChannelMessage {

  constructor({ id, channelId, message, sender, createdAt, updatedAt }) {
    this.id = id;
    this.channelId = channelId;
    this.message = message;
    this.sender = sender;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}