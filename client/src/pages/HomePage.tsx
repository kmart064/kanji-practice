import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-4 text-center">
        <Link
          to="/add"
          className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Add New Kanji
        </Link>
        <Link
          to="/study"
          className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Study Kanji
        </Link>
      </div>
    </Layout>
  );
}
