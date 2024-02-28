import create from "zustand";
import io, { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,

  initializeSocket: (userId: string) => {
    const { socket } = get();

    if (!socket) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL || "", {
        query: { userId },
      });
      set({ socket: newSocket });
      console.log("Connected to WebSocket server");
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log("Disconnected from WebSocket server");
    }
  },
}));
