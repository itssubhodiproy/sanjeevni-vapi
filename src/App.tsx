import { useEffect, useState } from 'react'
import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import './App.css'
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

function App() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

  // hook into Vapi events
  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);

      setConnecting(false);
      if (isPublicKeyMissingError({ vapiError: error })) {
        setShowPublicKeyInvalidMessage(true);
      }
    });
  }, []);

  // call start handler
  const startCallInline = () => {
    setConnecting(true);
    vapi.start(import.meta.env.VITE_SANJEEVNI_AI_ASSISTANT_ID);
  };
  const endCall = () => {
    vapi.stop();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!connected ? (
        <Button
          label="Talk"
          onClick={startCallInline}
          isLoading={connecting}
          color='#fff'
          backgroundColor='#0b8043'
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
          <ActiveCallDetail
            volumeLevel={volumeLevel}
            onEndCallClick={endCall}
          />
        </div>

      )}

      {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
    </div>
  )
}

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

  // close public key invalid message after delay
  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

const PleaseSetYourPublicKeyMessage = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        left: "25px",
        padding: "10px",
        color: "#fff",
        backgroundColor: "#f03e3e",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      Is your Vapi Public Key missing? (recheck your code)
    </div>
  );
};

export default App
