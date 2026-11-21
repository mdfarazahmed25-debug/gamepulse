
"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import "@livekit/components-styles";

export default function VoiceRoom({ room, username }: { room: string; username: string }) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Getting entry pass…");
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  useEffect(() => {
    fetch(`/api/voice-token?room=${encodeURIComponent(room)}&username=${encodeURIComponent(username)}`)
      .then((r) => r.json())
      .then((d) => {
        setToken(d.token);
        setStatus("Got pass, connecting…");
      })
      .catch(() => setStatus("Could not get entry pass"));
  }, [room, username]);

  if (!token) return <p>{status}</p>;

  return (
    <>
      <p>
        Status: {status} | URL: {url ? "found" : "MISSING"}
      </p>
      <LiveKitRoom
        token={token}
        serverUrl={url}
        connect={true}
        audio={true}
        video={false}
        data-lk-theme="default"
        onConnected={() => setStatus("Connected ✅")}
        onDisconnected={() => setStatus("Disconnected")}
        onError={(e) => setStatus("Error: " + e.message)}
        onMediaDeviceFailure={(f) => setStatus("Microphone problem: " + String(f))}
      >
        <RoomAudioRenderer />
        <ControlBar controls={{ camera: false, screenShare: false, chat: false }} />
      </LiveKitRoom>
    </>
  );
}
