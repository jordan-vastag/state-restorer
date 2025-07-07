const DEFAULT_BOARD_SIZE = 3;
const API_URL = import.meta.env.VITE_API_URL;
const SOURCE_CODE_GITHUB_URL =
  "https://github.com/jordan-vastag/state-restorer";

enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export { API_URL, DEFAULT_BOARD_SIZE, Difficulty, SOURCE_CODE_GITHUB_URL };
