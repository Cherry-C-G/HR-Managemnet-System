export class Response {
}

export interface statusResponse {
    status: string;
    visaType:string;
    visaStatus:string;
    name:string;
    visaEndDate:Date;
    avatar:string;
    comment:string;
    documentComment:Array<{
      title:string;
      comment:string;
    }>
  }