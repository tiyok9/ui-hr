import Echo from "laravel-echo";
import Pusher from "pusher-js";

(window as any).Pusher = Pusher;

let echo: any;

export const initEcho = (token: string) => {
  echo = new Echo({
    broadcaster: "reverb",
    key: "hgdycpjjaae7fnms036j",
    wsHost: "localhost",
    wsPort: 9001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: "http://localhost:8000/broadcasting/auth",

    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  return echo;
};

export const getEcho = () => echo;
