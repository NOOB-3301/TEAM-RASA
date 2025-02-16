import { StreamClient } from "@stream-io/node-sdk";
import jwt from "jsonwebtoken";

export const tokenProvider = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided." });
  }
  const secretkey = process.env.SECRET_KEY;
  if (!secretkey) {
    console.log("Secret key not found");
    process.exit();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid token format." });
  }
  console.log(token);
  // // Decode and Verify Token
  // let decoded;
  // try {
  //   decoded = jwt.verify(token, secretkey);
  // } catch (err) {
  //   return res.status(401).json({ error: "Invalid or expired token." });
  // }

  // Find the authenticated user
  // const userId = decoded.userId;
  // console.log(userId);
  //   const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  // const streamClient = new StreamClient(
  //   "uv4wfqs5mhd5",
  //   "xz8uexvwm2nnpcnzna5rsygxajqrmusfjd679ff3wsw3gs2axnr5js9svknprv93"
  // );
  // const xpirationTime = Math.floor(Date.now() / 1000) + 3600;
  // const issuedAt = Math.floor(Date.now() / 1000) - 60;

  // const generatedToken = streamClient.createToken(
  //   token,
  //   expirationTime,
  //   issuedAt
  // );
  const streamClient = new StreamClient("u4vswk85dwen","gqpphwntqus9d76nkv7625zfesqtxu6jyzbntstq9ff8ctp5g2xbdr53nwnderdg")

  const newUser = {
    id: token
  }

  await streamClient.upsertUsers([newUser])
  let exp = 24 * 3600
  const generatedToken = streamClient.generateUserToken({user_id:token, validity_in_seconds: exp})

  return res.status(200).send({ generatedToken: generatedToken });
};
