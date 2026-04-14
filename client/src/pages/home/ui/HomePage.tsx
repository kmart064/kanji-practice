import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen flex items-start justify-center px-4">
        <div
          className="
            w-full max-w-md p-6 text-center space-y-6
            glass
          "
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <Link to="/manage" className="btn-tinted btn-blue">
                Manage Deck
              </Link>
            </div>
            <div className="flex justify-center">
              <Link to="/study" className="btn-tinted btn-green">
                Study Kanji
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Built for Immersive Kanji learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
