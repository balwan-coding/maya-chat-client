export type UserRole = "user" | "admin";
export type MessageType = "text" | "image" | "video" | "audio" | "file";

export interface Message {
  _id?: string;
  chatId: string;
  messageType: MessageType;
  media?: string;
  senderId: any;
  text?: string;
}

export interface Users {
  _id: string;
  id?: string;
  name: string;
  userName: string;
  profilePic?: string | null;
  isOnlie: boolean;
}

export interface User {
  id: string;
  name: string;
  userName: string;
  profilePic?: string | null;
  isOnlie: boolean;
  token: string;
  email: string;
  role: UserRole | null;
}

export interface CreateUserRequest {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
}

export interface LogingUserRequest {
  userNameOrEmail: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface CreateChat {
  currentUserId: string;
  targetUserId: string;
}

export interface GetChat {
  userId: string;
}

export interface Chat {
  _id: string;
  type: "private" | "group";
  memberIds: string[];
  groupName: string;
  createdAt: string;
  updatedAt: string;
}
