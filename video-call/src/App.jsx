import { 
  CallingState, 
  StreamCall, 
  StreamVideo, 
  StreamVideoClient, 
  useCallStateHooks 
} from '@stream-io/video-react-sdk';

import { StreamTheme, ParticipantView } from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1RhbG9uX0thcnJkZSIsInVzZXJfaWQiOiJUYWxvbl9LYXJyZGUiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczOTY0NDkyNiwiZXhwIjoxNzQwMjQ5NzI2fQ.ZSfUJ47sTiWLk4c3Dhq-Y-c75T8XrvysbcU6QN9hHdc';
const userId = 'Talon_Karrde';
const callId = 'zH1rzPSgSsTi';

// Set up the user object
const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
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
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    backgroundColor: '#181818',
    padding: '20px',
  },
  loading: {
    color: '#fff',
    fontSize: '20px',
    textAlign: 'center',
    padding: '20px',
  },
  participantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '15px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantVideo: {
    width: '100%',
    height: '400px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  floatingParticipant: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '250px',
    height: '140px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 10px',
    overflow: 'hidden',
    border: '2px solid white',
  },
};

