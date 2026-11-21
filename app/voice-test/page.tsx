import VoiceRoom from "../components/VoiceRoom";

export default function VoiceTestPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Voice test</h1>
      <VoiceRoom room="test-room" username={"player-" + Math.floor(Math.random() * 1000)} />
    </main>
  );
}
