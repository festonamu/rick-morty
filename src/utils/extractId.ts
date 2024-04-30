const extractId = (url: string) => {
  const match = url.match(/\/(\d+)$/);
  return match ? match[1] : String(Math.floor(Math.random() * 200) + 1);
};

export default extractId;