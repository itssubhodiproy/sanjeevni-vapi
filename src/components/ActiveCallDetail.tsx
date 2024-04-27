import AssistantSpeechIndicator from "./call/AssistantSpeechIndicator";
import Button from "./base/Button";
import VolumeLevel from "./call/VolumeLevel";

function TalkingAvatar({ imageUrl, intensity }) {
  // Calculate the animation width based on the intensity
  const animationWidth = intensity > 0 ? 5 + (intensity * 2) : 0;

  // Inline styles for the avatar and the animated ring
  const styles = {
    avatar: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: `url(${imageUrl}) center center / cover no-repeat`,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0 0 0 rgba(34, 193, 195, 0)',
      transition: 'box-shadow 0.3s ease-in-out'
    },
    ring: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${150 + animationWidth * 2}px`,
      height: `${150 + animationWidth * 2}px`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      boxShadow: `0 0 0 ${animationWidth}px rgba(34, 193, 195, 0.5)`,
      transition: 'box-shadow 0.3s ease-in-out',
      pointerEvents: 'none'  // Ensures the ring does not interfere with interactions
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={styles.avatar}>
        {/* Empty container for layout alignment */}
      </div>
      <div style={styles.ring}></div>
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
