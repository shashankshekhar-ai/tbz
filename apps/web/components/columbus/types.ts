export type ColumbusScreen = "screen1" | "screen2" | "consent" | "conversation";

export interface ChatMessage {
  id: string;
  sender: "columbus" | "user";
  text: string;
  timestamp: string;
  recommendations?: { title: string; link: string; category: string }[];
}
