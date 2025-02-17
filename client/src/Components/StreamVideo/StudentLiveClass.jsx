import {
  SpeakerLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  Call,
  CallControls,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = "u4vswk85dwen";

export default function StudentLiveClass() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const { callId: callId } = useParams();

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const userPayload = jwtDecode(authToken);
      const token = await axios.post(
        "http://localhost:3000/api/v1/token/getstreamtoken",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userPayload.userId}`,
          },
        }
      );

      const userId = userPayload.userId;

      // Set up the user object
      const user = {
        id: userId,
        name: "RASA",
        image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
      };

      const streamClient = new StreamVideoClient({
        apiKey,
        user,
        token: token.data.generatedToken,
      });

      const streamCall = streamClient.call("default", callId);
      streamCall.join({ create: false });

      setClient(streamClient);
      setCall(streamCall);
    };

    fetchToken();
  }, []);

  if (!client || !call) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls
            onLeave={async () => {
              window.location.href = "/courses";
              await call.endCall();
            }}
          />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
}

const styles = {
  loading: {
    color: "#fff",
    fontSize: "20px",
    textAlign: "center",
    padding: "20px",
  },
};
