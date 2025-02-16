import React from 'react';
import LiveClass from "./LiveClass";


const userId = localStorage.getItem("u_id");

const TeacherDashboard = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <LiveClassHandler user={{ id: userId, name: "Teacher" }} token={localStorage.getItem("auth_token")} />
    </div>
  );
};

export default TeacherDashboard;
