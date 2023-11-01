import { useSpeechSynthesis } from "react-speech-kit";
import VoiceOverOffIcon from "@mui/icons-material/VoiceOverOff";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { ListItemIcon, MenuItem } from "@mui/material";

const Speech = ({ text }) => {
  const { speak, voices, cancel } = useSpeechSynthesis();
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
      <MenuItem onClick={handleSpeak}>
        <ListItemIcon>
          <RecordVoiceOverIcon />
        </ListItemIcon>
        Llamar paciente
      </MenuItem>
      <MenuItem onClick={handleStopSpeaking}>
        <ListItemIcon>
          <VoiceOverOffIcon />
        </ListItemIcon>
        Detener llamada
      </MenuItem>
    </>
  );
};

export default Speech;
