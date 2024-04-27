import AssistantSpeechIndicator from "./call/AssistantSpeechIndicator";
import Button from "./base/Button";
import VolumeLevel from "./call/VolumeLevel";

function TalkingAvatar({ imageUrl, intensity }) {
  const animationIntensity = {
    boxShadow: `0 0 0 ${Math.max(0, intensity) * 2}px rgba(255, 165, 0, ${intensity / 10})`
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
      padding: '10px'
    },
    image: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'block',
      transition: 'box-shadow 0.5s',
      boxShadow: `0 0 20px ${intensity * 2}px rgba(255, 165, 0, 0.5)`
    },
    animation: {
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      right: '-10px',
      bottom: '-10px',
      borderRadius: '50%',
      boxShadow: intensity > 0 ? animationIntensity.boxShadow : 'none',
      animation: intensity > 0 ? `pulse ${2 / Math.max(intensity, 1)}s infinite` : 'none'
    },
    '@keyframes pulse': {
      '0%': {
        boxShadow: `0 0 0 0 rgba(255, 165, 0, 0.7)`
      },
      '70%': {
        boxShadow: `0 0 0 10px rgba(255, 165, 0, 0)`
      },
      '100%': {
        boxShadow: `0 0 0 0 rgba(255, 165, 0, 0)`
      }
    }
  };

  return (
    <div style={styles.container}>
      <img src={imageUrl} alt="Avatar" style={styles.image} />
      <div style={styles.animation}></div>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(255, 165, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
            }
          }
        `}
      </style>
    </div>
  );
}

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }: { assistantIsSpeaking: boolean, volumeLevel: number, onEndCallClick: () => void }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          width: "400px",
          height: "200px",
        }}
      >
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        {/* <VolumeLevel volume={volumeLevel} /> */}
        <TalkingAvatar imageUrl="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" intensity={volumeLevel} />
        
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button label="End Call" onClick={onEndCallClick} />
      </div>
    </div>
  );
};

export default ActiveCallDetail;
