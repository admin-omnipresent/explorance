export const convertAudioFileToBase64 = (audioFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onload = () => {
      const base64String = (reader?.result as string)?.split(",")[1];
      resolve(base64String ?? "");
    };
    reader.onerror = (error) => reject(error);
  });
};
