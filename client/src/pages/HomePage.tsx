import { Link } from "react-router-dom";
import Layout from "../shared/components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Link
                to="/manage"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
              >
                Manage Deck
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                to="/study"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
              >
                Study Kanji
              </Link>
            </div>
            <p className="text-sm text-gray-500 flex justify-center">
              Built for Immersive Kanji learning
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
