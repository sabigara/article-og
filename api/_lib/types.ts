export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  text?: string;
  author?: string;
  service?: string;
  logo?: string;
}
