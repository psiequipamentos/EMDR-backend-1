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
  deleteAllRooms = async (req: Request, res: Response) => {
    const { error, data }: iDailyServiceReturn =
      await this.daily_service.allRooms();
    for (const { name } of data.rooms) {
      try {
        await this.daily_service.deleteRoom(name);
        console.log(`room ${name} deleted`);
      } catch (delete_room_error) {
        console.error(delete_room_error.error);
      }
    }
    return res.status(error ? 500 : 200).send(data);
  };
}
