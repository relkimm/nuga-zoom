export default class UserChannel {
  
  constructor({ username, channel, createdAt, updatedAt }) {
    this.username = username;
    this.channel = channel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}