import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  participants: { type: Array, default: [] },
}, { timestamps: true });

export default mongoose.model('channel', channelSchema);