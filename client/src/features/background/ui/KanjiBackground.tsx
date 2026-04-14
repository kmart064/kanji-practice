import React from "react";

const kanjiList = [
  "心",
  "夢",
  "学",
  "道",
  "愛",
  "空",
  "海",
  "未来",
  "挑戦",
  "努力",
  "忍耐",
  "友情",
  "成長",
  "希望",
  "絆",
  "平和",
  "通貨",
  "必修",
  "記者",
  "真実",
  "梅雨",
  "集合場所",
  "語る",
  "解消",
  "囲む",
  "友好",
  "友好国",
  "友好関係",
  "区別",
  "差別",
  "限界",
  "通じる",
  "首都",
  "順調",
  "順調",
  "恋愛対象",
  "通知",
  "通知",
  "結論",
];
interface FloatingKanji {
  id: number;
  text: string;
  top: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  moveX: number;
  moveY: number;
}

function generateKanji(): FloatingKanji[] {
  const columns = 8;
  const rows = 6;

  const items: FloatingKanji[] = [];
  const cellWidth = 100 / columns;
  const cellHeight = 100 / rows;

  let id = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      items.push({
        id: id++,
        text: kanjiList[Math.floor(Math.random() * kanjiList.length)],
        top: row * cellHeight + Math.random() * cellHeight * 0.5,
        left: col * cellWidth + Math.random() * cellWidth * 0.5,
        delay: Math.random() * 20,
        duration: 40 + Math.random() * 40,
        size: 24 + Math.random() * 40,
        moveX: (Math.random() - 0.5) * 200,
        moveY: (Math.random() - 0.5) * 200,
      });
    }
  }

  return items;
}

const floatingKanji = generateKanji();

export default function KanjiBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-b from-blue-300 via-blue-100 to-white">
      {floatingKanji.map((item) => (
        <span
          key={item.id}
          className="absolute animate-float text-gray-500 font-japanese font-bold select-none"
          style={
            {
              top: `${item.top}%`,
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              animationDelay: `-${item.delay}s`,
              animationDuration: `${item.duration}s`,
              "--move-x": `${item.moveX}px`,
              "--move-y": `${item.moveY}px`,
            } as React.CSSProperties
          }
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
