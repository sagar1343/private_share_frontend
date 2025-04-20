export interface IReceivedFile {
  id: number;
  file_name: string;
  size: string;
  is_protected: boolean;
  sender: ISender;
}

interface ISender {
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
}
