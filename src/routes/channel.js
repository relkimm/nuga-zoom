import express from 'express';
import channelService from '../services/channel';
import ChannelCdo from '../models/dtos/ChannelCdo';

const router = express.Router();

router.get('/:channelId', async (req, res) => {
  const channel = await channelService.findOne(req.params.channelId);
  return res.send();
});

router.post('/', async (req, res) => {
  const username = req.session.passport.user;
  const channelCdo = new ChannelCdo(req.body);
  await channelService.create(username, channelCdo);
  return res.send();
});

router.patch('/:channelId/join', async (req, res) => {
  const channelId = req.params.channelId;
  const username = req.session.passport.user;
  await channelService.join(channelId, username);
  return res.send();
});

router.patch('/:channelId/left', async (req, res) => {
  const channelId = req.params.channelId;
  const username = req.session.passport.user;
  await channelService.left(channelId, username);
  return res.send();
})

export default router;