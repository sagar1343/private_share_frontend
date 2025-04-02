export interface IReceivedFile {
  id: number;
  file_name: string;
  sender: ISender;
}
interface ISender {
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
}
