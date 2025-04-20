import Hashids from "hashids";

const hashids = new Hashids("private-share-salt", 10);

export default function useHash() {
  const encodeId = (id: number): string => {
    return hashids.encode(id);
  };

  const decodeId = (hash: string): number | null => {
    const decoded = hashids.decode(hash);
    if (decoded.length === 0) return null;
    return decoded[0] as number;
  };

  return { encodeId, decodeId };
}
