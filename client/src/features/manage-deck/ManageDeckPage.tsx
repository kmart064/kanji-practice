import AddKanjiForm from "./addKanjiForm";
import DeleteKanjiForm from "./deleteKanjiForm";
import SearchKanjiForm from "./SearchKanjiForm";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function AddKanjiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <PlusIcon className="h-8 w-8 text-green-600" />
            Add New Kanji
          </h1>
          <AddKanjiForm />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
            Search for Kanji
          </h2>
          <SearchKanjiForm />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
            Delete Kanji
          </h1>
          <DeleteKanjiForm />
        </div>
      </div>
    </div>
  );
}
