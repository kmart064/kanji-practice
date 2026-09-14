import { GrammarCardItem } from "./types";

export const demoGrammar: GrammarCardItem[] = [
  {
    id: "1",
    sentence: "昨日は疲れていた＿＿、夜遅くまで仕事をしていた。",
    choices: [
      { id: "a", text: "にもかかわらず" },
      { id: "b", text: "わけではなく" },
      { id: "c", text: "ことになって" },
      { id: "d", text: "に違いなく" },
    ],
    correctChoiceId: "a",
    translation:
      "Although I was tired yesterday, I worked until late at night.",
  },
  {
    id: "2",
    sentence:
      "この店は駅から少し離れている＿＿、週末になると多くの客が訪れる。",
    choices: [
      { id: "a", text: "にすぎず" },
      { id: "b", text: "ものの" },
      { id: "c", text: "わけで" },
      { id: "d", text: "ことから" },
    ],
    correctChoiceId: "b",
    translation:
      "Although this shop is a little far from the station, many customers visit on weekends.",
  },
  {
    id: "3",
    sentence: "説明を何度も読んだ＿＿、使い方がよく分からなかった。",
    choices: [
      { id: "a", text: "ところで" },
      { id: "b", text: "うえに" },
      { id: "c", text: "それでも" },
      { id: "d", text: "おかげで" },
    ],
    correctChoiceId: "c",
    translation:
      "Even after reading the instructions several times, I still couldn't understand how to use it.",
  },
  {
    id: "4",
    sentence:
      "彼は忙しいと言っていたが、頼んでみた＿＿、意外にも手伝ってくれた。",
    choices: [
      { id: "a", text: "ところ" },
      { id: "b", text: "ばかりか" },
      { id: "c", text: "ものなら" },
      { id: "d", text: "わけには" },
    ],
    correctChoiceId: "a",
    translation:
      "He said he was busy, but when I asked him, he unexpectedly helped me.",
  },
  {
    id: "5",
    sentence: "この問題については、もう少し詳しく調べてから判断する＿＿だ。",
    choices: [
      { id: "a", text: "ことにした" },
      { id: "b", text: "わけがない" },
      { id: "c", text: "に違いない" },
      { id: "d", text: "ことになった" },
    ],
    correctChoiceId: "a",
    translation:
      "I've decided to look into this issue in more detail before making a decision.",
  },
  {
    id: "6",
    sentence: "彼が約束を忘れていた＿＿、連絡もしてこなかった。",
    choices: [
      { id: "a", text: "だけでなく" },
      { id: "b", text: "にしては" },
      { id: "c", text: "わりに" },
      { id: "d", text: "どころか" },
    ],
    correctChoiceId: "a",
    translation:
      "Not only did he forget the appointment, but he didn't even contact me.",
  },
  {
    id: "7",
    sentence: "この薬を飲んだからといって、すぐに症状が治る＿＿。",
    choices: [
      { id: "a", text: "わけではない" },
      { id: "b", text: "ことになっている" },
      { id: "c", text: "に違いない" },
      { id: "d", text: "おそれがある" },
    ],
    correctChoiceId: "a",
    translation:
      "Just because you take this medicine doesn't mean your symptoms will immediately go away.",
  },
  {
    id: "8",
    sentence:
      "新しいシステムを導入する＿＿、社員への説明会を開くことになった。",
    choices: [
      { id: "a", text: "にあたって" },
      { id: "b", text: "にすぎず" },
      { id: "c", text: "わけにはいかず" },
      { id: "d", text: "にほかならず" },
    ],
    correctChoiceId: "a",
    translation:
      "In preparation for introducing the new system, we decided to hold an information session for employees.",
  },
  {
    id: "9",
    sentence: "彼は、初めて会った人なのに、以前から知っていた＿＿話していた。",
    choices: [
      { id: "a", text: "に対して" },
      { id: "b", text: "ことなく" },
      { id: "c", text: "わりに" },
      { id: "d", text: "かのように" },
    ],
    correctChoiceId: "d",
    translation:
      "Although it was someone he had met for the first time, he spoke as if he had known them for a long time.",
  },
  {
    id: "10",
    sentence:
      "予定より作業が早く終わった＿＿、その日のうちに報告書まで提出できた。",
    choices: [
      { id: "a", text: "ことから" },
      { id: "b", text: "おかげで" },
      { id: "c", text: "わけにはいかず" },
      { id: "d", text: "どころではなく" },
    ],
    correctChoiceId: "b",
    translation:
      "Thanks to finishing the work earlier than scheduled, I was able to submit the report that same day.",
  },
];
