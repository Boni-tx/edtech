import ChatPanel from "./chat-panel";
import { getServerDictionary } from "@/lib/i18n/server";

export default function ChatPage() {
  const { dict } = getServerDictionary();
  return (
    <div className="h-full">
      <h2 className="mb-6 text-lg font-bold text-navy-900 dark:text-white">{dict.chat.title}</h2>
      <ChatPanel
        placeholder={dict.chat.placeholder}
        emptyLabel={dict.chat.empty}
        noConversationsLabel={dict.chat.noConversations}
      />
    </div>
  );
}
