import React, { useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj2"; // Replace with your API key

const StudentJoin = ({ onJoin }) => {
  const [callId, setCallId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!callId.trim() || !name.trim()) {
      setError("Please enter a valid name and Call ID.");
      return;
    }

    const user = {
      id: name.toLowerCase().replace(/\s+/g, "_"), // Create a simple user ID
      name,
    };

    const client = new StreamVideoClient({ apiKey, user, token: null });

    try {
      const call = client.call("default", callId);
      await call.join();
      onJoin(call, client); // Pass the call and client to the main app
    } catch (err) {
      console.error(err);
      setError("Failed to join the call. Check your Call ID.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Join Live Class</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Enter Class ID"
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Join Class
        </button>
      </div>
    </div>
  );
};

export default StudentJoin;
