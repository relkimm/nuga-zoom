import Channel from '../models/domains/Channel';
import ChannelModel from '../models/Channel';
import AccountModel from '../models/account';
import UserChannelModel from '../models/UserChannel';

class ChannelService {

  async findOne(channelId) {
    const channel = await ChannelModel.findOne({ id: channelId });
    return channel;
  }

  async create(username, channelCdo) {
    const channel = new Channel(channelCdo);
    const channelModel = new ChannelModel(channel);
    const savedChannel = await channelModel.save(channelModel);
    const userChannelModel = new UserChannelModel({username, channel: savedChannel });
    await userChannelModel.save(userChannelModel);

  }

  async join(channelId, username) {
    const channelModel = await ChannelModel.findOne({ id: channelId });
    const accountModel = await AccountModel.findOne({ username });

    const nextParticipants = channelModel.participants === undefined ? 
      [ accountModel ] : [...channelModel.participants, accountModel];

    await ChannelModel.updateOne({ id: channelId }, { participants: nextParticipants });
  }

  async left(channelId, username) {
    const channelModel = await ChannelModel.findOne({ id: channelId });
    const nextParticipants = channelModel.participants.filter(p => p.username !== username);
    await ChannelModel.updateOne({ id: channelId }, { participants: nextParticipants });
   
  }
}

export default new ChannelService();