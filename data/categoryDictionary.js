import {
  economy,
  broadCast,
  it,
  english,
  sports,
  magazine,
  local,
} from "./pressList.js";

export const pressData = [
  { category: "종합/경제", pressList: economy },
  { category: "방송/통신", pressList: broadCast },
  { category: "IT", pressList: it },
  { category: "영자지", pressList: english },
  { category: "스포츠/연예", pressList: sports },
  { category: "매거진/전문지", pressList: magazine },
  { category: "지역", pressList: local },
];
