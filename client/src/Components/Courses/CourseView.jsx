import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseView = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);

  const { id: courseId } = useParams();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Video List */}
      <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-[#0F6B5E] mb-4">Course Videos</h2>
        <ul className="space-y-2">
          {videoList.map((video, index) => (
            <li
              key={index}
              className="p-3 bg-[#14887a] text-white rounded-lg shadow-md cursor-pointer hover:bg-[#0F6B5E] transition"
              onClick={() => setVideoUrl(video.url)}
            >
              <p className="font-medium">{video.title}</p>
              <p className="text-sm opacity-80">{video.duration}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col items-center justify-center space-y-6 p-6">
        {videoUrl ? (
          <div className="w-full max-w-4xl bg-black rounded-lg shadow-lg">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg"
            ></video>
          </div>
        ) : (
          <p className="text-gray-600">Select a video to watch</p>
        )}

        {/* Buttons Section */}
        <div className="flex space-x-4">
          <Link to={`/courses/${courseId}/create-meeting`}>
            <button className="px-6 py-3 bg-[#0F6B5E] text-white font-semibold rounded-lg shadow-md hover:bg-[#14887a] transition">
              Create Meeting
            </button>
          </Link>
          <button className="px-6 py-3 bg-[#14887a] text-white font-semibold rounded-lg shadow-md hover:bg-[#0F6B5E] transition">
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
