import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseView = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);

  const { id: courseId } = useParams();

  console.log(courseId);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Video List Section */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Course Videos</h2>
        <ul>
          {videoList.map((video, index) => (
            <li
              key={index}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => setVideoUrl(video.url)}
            >
              <p className="font-medium">{video.title}</p>
              <p className="text-sm text-gray-600">{video.duration}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Section */}
      <div className="w-1/3 flex flex-col items-center justify-center space-y-4 p-4">
        <Link to={`/courses/${courseId}/create-meeting`}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Create Meeting
          </button>
        </Link>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
          Add Video
        </button>
      </div>
    </div>
  );
};

export default CourseView;
