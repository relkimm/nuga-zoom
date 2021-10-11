export default class Channel {

  constructor({ id, name, type, participants, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}