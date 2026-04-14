export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Kanji Sentence Review",
    "Grammar Review",
    "Statistics",
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white">
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <li
            key={item}
            className="p-4 hover:bg-gray-700 cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
