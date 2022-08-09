export interface Leave{
  id?: number,
  type: string,
  startDate: string,
  endDate: string,
  description: string,
  results: string,
  reasonOfReject: string,
  userId?: number,
  userResultId?:number | string
}
