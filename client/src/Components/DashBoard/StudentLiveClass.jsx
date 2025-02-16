import React from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
  StreamTheme,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const LiveClass = ({ call, client }) => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LiveClassUI />
      </StreamCall>
    </StreamVideo>
  );
};

const LiveClassUI = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Connecting to the class...
      </div>
    );
  }

  return (
    <StreamTheme>
      <div className="relative h-screen w-screen flex flex-col items-center bg-gray-900 text-white">
        {/* Header */}
        <header className="w-full text-center py-4 bg-gray-800 text-lg font-semibold">
          Live Class Session
        </header>

        {/* Main Video Section */}
        <div className="flex-grow flex flex-wrap justify-center items-center gap-4 p-4">
          {remoteParticipants.length === 0 && (
            <p className="text-gray-400 text-lg">Waiting for others to join...</p>
          )}

          {remoteParticipants.map((participant) => (
            <div
              key={participant.sessionId}
              className="w-[350px] h-[250px] bg-black rounded-lg shadow-lg overflow-hidden"
            >
              <ParticipantView participant={participant} />
            </div>
          ))}
        </div>

        {/* Floating Local Participant */}
        <div className="absolute bottom-5 right-5 w-52 h-32 bg-black shadow-lg rounded-lg overflow-hidden border border-gray-500">
          <ParticipantView participant={localParticipant} />
        </div>
      </div>
    </StreamTheme>
  );
};

export default LiveClass;
