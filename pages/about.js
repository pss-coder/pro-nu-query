// pages/about.js
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-semibold mb-4">Hi there, I'm Pawandeep!</h1>
          <p className="text-lg mb-4">
            Welcome to my world of coding and learning. Let me introduce myself:
          </p>
          <p className="text-lg mb-4">
            📚 I&apos;m a final year Computer Science student.
          </p>
          <p className="text-lg mb-4">
            🚀 I built this project as part of my CS2220 Class Bio-informatics Project. It was a challenging but incredibly rewarding experience.
          </p>
          <p className="text-lg mb-4">
            🛠️ My tech toolbox includes React, Next.js, Tailwind CSS, Prisma, and PostgreSQL. Always learning and exploring new technologies!
          </p>
          <p className="text-lg mb-4">
            🤓 One of the key lessons I&apos;ve learned is the importance of data. I've discovered that cleaning and understanding data, as well as making meaningful connections, are the building blocks of every successful project.
          </p>
          <Link href="/"
            className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
