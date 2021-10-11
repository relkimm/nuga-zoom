import mongoose from 'mongoose';

const channelMessageSchema = new mongoose.Schema({
  channeId: { type: String ,required: true },
  message: { type: string, requird: true },
  sender: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.model('channel_message', channelMessageSchema);