import { create } from "zustand";

const useConversation = create((set) => ({
    messages: [],
    selectedConversation: null,
    setMessages: (newMessages) => set({ messages: newMessages }),
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    // Any other state or actions as needed
 }));

export default useConversation;
