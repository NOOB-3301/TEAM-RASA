// const streamVideo = require('stream-video');
import streamVideo from 'stream-video';

const serverClient = streamVideo.createServerClient(
  'uv4wfqs5mhd5', 
  'xz8uexvwm2nnpcnzna5rsygxajqrmusfjd679ff3wsw3gs2axnr5js9svknprv93' 
);

app.post('/api/token', (req, res) => {
  const userId = req.user.id; // Get the user ID from your auth system
  const token = serverClient.generateUserToken(userId, { name: req.user.name }); // Generate token
  res.json({ token }); // Send token back to the client
});