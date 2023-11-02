import { useSpeechSynthesis } from "react-speech-kit";
import VoiceOverOffIcon from "@mui/icons-material/VoiceOverOff";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button } from "@mui/material";

const Speech = ({ text }) => {
  const { speak, voices, cancel, speaking } = useSpeechSynthesis();
  const esUS = "es-US";
  const esMX = "es-MX";
  const esES = "es-ES";
  const supportedLanguages = [esUS, esMX, esES];
  const supportedVoices = voices.filter((voice) =>
    supportedLanguages.includes(voice.lang)
  );
  const voiceEsUS = supportedVoices.find((voice) => voice.lang === esUS);
  const voiceEsMX = supportedVoices.find((voice) => voice.lang === esMX);
  const voiceEsES = supportedVoices.find((voice) => voice.lang === esES);
  const voice = voiceEsUS || voiceEsMX || voiceEsES;

  const handleSpeak = () => {
    speak({
      text,
      voice,
      rate: 0.7,
    });
  };

  const handleStopSpeaking = () => {
    cancel();
  };

  return (
    <>
      {!speaking && (
        <Button onClick={handleSpeak} color="secondary">
          Llamar
          <RecordVoiceOverIcon />
        </Button>
      )}
      {speaking && (
        <Button onClick={handleStopSpeaking} color="secondary">
          Detener
          <VoiceOverOffIcon />
        </Button>
      )}
    </>
  );
};

export default Speech;
