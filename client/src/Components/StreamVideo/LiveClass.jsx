import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { StreamTheme, ParticipantView } from "@stream-io/video-react-sdk";
import axios from "axios";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { jwtDecode } from "jwt-decode";

const apiKey = "u4vswk85dwen";
const callId = "zH1rzPSgSsTi"; //uuid

const authToken = localStorage.getItem("authToken");
if (!authToken) {
  console.error("No auth token found");
}
const userPayload = authToken ? jwtDecode(authToken) : "";

const fetchToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/token/getstreamtoken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userPayload.userId}`,
        },
      }
    );
    return response.data.generatedToken;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

const token = await fetchToken();
if (!token) {
  throw new Error("Failed to fetch token");
}

console.log(token.data.generatedToken);
const userId = userPayload.userId;

// Set up the user object
const user = {
  id: userId,
  name: "RASA",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({
  apiKey,
  user,
  token: token.data.generatedToken,
});
const call = client.call("default", callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

const MyUILayout = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <StreamTheme>
      <div style={styles.container}>
        <MyParticipantList participants={remoteParticipants} />
        <MyFloatingLocalParticipant participant={localParticipant} />
      </div>
    </StreamTheme>
  );
};

const MyParticipantList = ({ participants }) => {
  return (
    <div style={styles.participantGrid}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
          style={styles.participantVideo}
        />
      ))}
    </div>
  );
};

const MyFloatingLocalParticipant = ({ participant }) => {
  if (!participant) return null;

  return (
    <div style={styles.floatingParticipant}>
      <ParticipantView participant={participant} />
    </div>
  );
};

// 💡 Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#181818",
    padding: "20px",
  },
  loading: {
    color: "#fff",
    fontSize: "20px",
    textAlign: "center",
    padding: "20px",
  },
  participantGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "15px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  participantVideo: {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  floatingParticipant: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "250px",
    height: "140px",
    borderRadius: "12px",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 10px",
    overflow: "hidden",
    border: "2px solid white",
  },
};
