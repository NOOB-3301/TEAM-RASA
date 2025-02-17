import { StreamClient } from "@stream-io/node-sdk";

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

  const streamClient = new StreamClient(
    "u4vswk85dwen",
    "gqpphwntqus9d76nkv7625zfesqtxu6jyzbntstq9ff8ctp5g2xbdr53nwnderdg"
  );

  const newUser = {
    id: token,
  };

  await streamClient.upsertUsers([newUser]);
  let exp = 24 * 3600;
  const generatedToken = streamClient.generateUserToken({
    user_id: token,
    validity_in_seconds: exp,
  });

  return res.status(200).send({ generatedToken: generatedToken });
};
