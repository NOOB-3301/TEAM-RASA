import { useEffect, useState } from "react";
import { 
  StreamVideo, 
  StreamVideoClient, 
  StreamCall, 
  CallingState, 
  useCallStateHooks 
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const token = localStorage.getItem("auth_token"); // Fetch the token from storage

function LiveClass({ userId }) {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  
  useEffect(() => {
    if (!userId || !token) return;
    
    const user = {
      id: userId,
      name: "Teacher",
      image: `https://getstream.io/random_svg/?id=${userId}&name=Teacher`,
    };

    const streamClient = new StreamVideoClient({ apiKey, user, token });
    setClient(streamClient);

    const callInstance = streamClient.call("default", "teacher_classroom");
    callInstance.join({ create: true });

    setCall(callInstance);

    return () => {
      callInstance.leave();
      streamClient.disconnectUser();
    };
  }, [userId, token]);

  if (!client || !call) return <div className="text-center text-white">Initializing...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoUI />
      </StreamCall>
    </StreamVideo>
  );
}

const VideoUI = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div className="text-white text-center">Waiting for class to start...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-black text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold">Live Class</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {remoteParticipants.map((participant) => (
          <div key={participant.sessionId} className="border p-2">
            <p>{participant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClass;
