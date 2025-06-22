import AddKanjiForm from "./addKanjiForm";
import DeleteKanjiForm from "./deleteKanjiForm";
import SearchKanjiForm from "./SearchKanjiForm";

export default function AddKanjiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add New Kanji
          </h1>
          <AddKanjiForm />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Search for Kanji
          </h2>
          <SearchKanjiForm />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Delete Kanji
          </h1>
          <DeleteKanjiForm />
        </div>
      </div>
    </div>
  );
}
