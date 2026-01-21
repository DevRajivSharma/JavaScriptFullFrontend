import React from "react";
import { Link } from "react-router-dom";
import demoVideo from "../assets/demo.mp4";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 overflow-x-hidden"
         style={{ width: '100vw', maxWidth: '100%' }}>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-20 max-w-7xl mx-auto w-full">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Welcome to <span className="text-red-500">VideoTube</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Upload, watch, and share videos. Create your channel, connect with
            your audience, and be part of a growing video community.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Video Preview */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl">
            <video
              src={demoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-56 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#181818] py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose VideoTube?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Easy Uploads", desc: "Share your videos with the world in just a few clicks." },
              { title: "Channel Creation", desc: "Build your own channel and grow your audience." },
              { title: "Video History", desc: "Keep track of all the videos you’ve watched anytime." },
              { title: "Unlimited Views", desc: "Watch as many videos as you like, without restrictions." },
              { title: "Community", desc: "Join a growing network of creators and viewers." },
            ].map((feature, i) => (
              <div key={i} className="bg-[#242424] p-6 rounded-lg shadow-md hover:bg-[#2e2e2e] transition">
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 text-center bg-[#0f0f0f] w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Start Your Video Journey Today!
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Sign up now and be part of the VideoTube community. Upload your first
          video, create your channel, and start engaging with viewers today.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 transition"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-500 rounded-lg text-lg font-medium text-gray-200 hover:bg-[#1f1f1f] transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181818] py-8 px-4 md:px-8 border-t border-[#2a2a2a] w-full">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm w-full">
          &copy; {new Date().getFullYear()} VideoTube. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
