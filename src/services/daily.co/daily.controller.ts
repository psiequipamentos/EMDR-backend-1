import DailyService from "./daily.service";
import { Request, Response } from "express";
export default class DailyController {
  private daily_service: DailyService;
  constructor() {
    this.daily_service = new DailyService();
  }
  createRoom = async (req: Request, res: Response) => {
    const { error, data }: iDailyServiceReturn =
      await this.daily_service.createRoom();

    return res.status(error ? 500 : 200).send(data);
  };

  allRooms = async (req: Request, res: Response) => {
    const { error, data }: iDailyServiceReturn =
      await this.daily_service.allRooms();

    return res.status(error ? 500 : 200).send(data);
  };
  meetingInfo = async (req: Request, res: Response) => {
    const { error, data }: iDailyServiceReturn =
      await this.daily_service.meetingInfo();

    return res.status(error ? 500 : 200).send(data);
  };
}
