import { io, type Socket } from "socket.io-client";

// production url
const BASE_URL: string = "https://maya-talk.netlify.app";

//local url
//const BASE_URL: string = "http://localhost:5000";

const socket: Socket = io(`${BASE_URL}/`);

export default socket;
