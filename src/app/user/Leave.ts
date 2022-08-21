import { User } from './User';
export interface Leave{
  id?: number,
  type: string,
  startDate: string,
  endDate: string,
  description: string,
  status: string,
  reasonOfReject: string,
  userId?: User | null | undefined,
  mangerId?:User | null
}
