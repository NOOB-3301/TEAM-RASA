import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj2"; // Replace with actual API Key
const userId = "student_123"; // Replace with dynamic student ID

const user = {
  id: userId,
  name: "Student",
  image: "https://getstream.io/random_svg/?id=student&name=Student",
};

const client = new StreamVideoClient({ apiKey, user, token: "your_student_token" });

const StudentDashboard = () => {
  const [availableClasses, setAvailableClasses] = useState([
    { id: "zH1rzPSgSsTi", title: "Math Live Class" },
  ]);

  const navigate = useNavigate();

  const joinClass = (callId) => {
    const call = client.call("default", callId);
    call.join();
    navigate(`/live-class/${callId}`);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-900 text-white">
      <header className="w-full text-center py-4 bg-gray-800 text-lg font-semibold">
        Student Dashboard
      </header>

      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold">Available Live Classes</h2>

        <div className="mt-5">
          {availableClasses.length === 0 ? (
            <p className="text-gray-400">No live classes available</p>
          ) : (
            availableClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-gray-700 p-4 rounded-lg w-80 flex justify-between items-center mt-4"
              >
                <p>{cls.title}</p>
                <button
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                  onClick={() => joinClass(cls.id)}
                >
                  Join Class
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
