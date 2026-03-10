import Echo from "laravel-echo";
import Pusher from "pusher-js";

(window as any).Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: "hgdycpjjaae7fnms036j",
  wsHost: "localhost",
  wsPort: 9001,
  forceTLS: false,
  disableStats: true,
  authEndpoint: "http://localhost:8000/broadcasting/auth",

  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  },
});

export default echo;
