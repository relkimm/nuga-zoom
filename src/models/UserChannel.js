import mongoose from 'mongoose';

const userChannelSchema = new mongoose.Schema({
  username: { type: String, required: true },
  channel: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.model('user_channel', userChannelSchema);