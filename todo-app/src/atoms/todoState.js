import { atom } from "recoil";

export const todoState = atom({
  key: "todoState",
  default: []
})

export const currentListState = atom({
  key: "currentListState",
  default: "모든 리스트"
})