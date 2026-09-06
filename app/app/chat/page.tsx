import ChatPanel from "./chat-panel";

export default function ChatPage() {
  return (
    <div className="h-full">
      <h2 className="mb-6 text-lg font-bold text-navy-900">Conversas</h2>
      <ChatPanel />
    </div>
  );
}
