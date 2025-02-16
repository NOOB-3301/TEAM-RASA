import React, { useState } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { v4 as uuidv4 } from 'uuid';

const apiKey = 'mmhfdzb5evj2';
const token = 'YOUR_GENERATED_TOKEN';
const userId = 'Teacher_1';

const user = {
  id: userId,
  name: 'Teacher',
  image: 'https://getstream.io/random_svg/?id=teacher&name=Teacher',
};

const client = new StreamVideoClient({ apiKey, user, token });

const TeacherDashboard = () => {
  const [sessions, setSessions] = useState([]);

  const startLiveClass = () => {
    const callId = uuidv4(); // Generate a unique call ID
    const call = client.call('default', callId);
    call.join({ create: true });
    
    setSessions([...sessions, { callId, startTime: new Date().toLocaleString() }]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <button 
        onClick={startLiveClass} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Start Live Class
      </button>
      
      <h3 className="mt-6 text-xl font-semibold">Active Sessions</h3>
      <ul>
        {sessions.map((session, index) => (
          <li key={index} className="mt-2 p-3 bg-gray-100 rounded">
            <span>Live Class ID: <strong>{session.callId}</strong></span><br />
            <span>Started at: {session.startTime}</span><br />
            <a href={`/live/${session.callId}`} className="text-blue-500">Join Session</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
