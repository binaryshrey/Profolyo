import axios from 'axios';

const TextToSpeech = async (voice, inputText) => {
  const VITE_ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_KEY;

  const VOICE_ID = voice === 'female' ? 'EXAVITQu4vr4xnSDxMaL' : 'JBFqnCBsd6RMkjVDRZzb';

  const options = {
    method: 'POST',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      'xi-api-key': `${VITE_ELEVENLABS_KEY}`,
    },
    data: {
      text: inputText,
    },
    responseType: 'arraybuffer',
  };

  const speechDetails = await axios.request(options);
  return speechDetails.data;
};

export default TextToSpeech;
