import {
  daily_config,
  daily_room_config,
  daily_endpoints,
} from "../../config/daily.config";
import * as short_uuid from "short-uuid";

import "../../config/daily.config";
import ApiService from "../api.service";
import TimeHandler from "../../utils/timehandler.utils";
import {
  DailyGetterPromiseResponse,
  DailyResponseError,
} from "../../constants/daily.constants";

export default class DailyService {
  private dailyConfig;
  private apiService: ApiService;
  private timeHandler: TimeHandler;
  constructor() {
    this.apiService = new ApiService();
    this.timeHandler = new TimeHandler();
  }

  async createRoom(): Promise<any> {
    const expires: number = this.timeHandler.dateToTimestamp(
      daily_config.room_expiration
    );
    const room_name: string = short_uuid.generate();
    const properties: object = {
      exp: expires,
      enable_chat: daily_room_config.chat,
      max_participants: daily_room_config.max_participants,
    };
    try {
      const daily_create_room_response: any = await this.apiService.RequestData(
        "POST",
        daily_endpoints.rooms,
        "",
        { name: room_name, properties }
      );
      return daily_create_room_response;
    } catch (daily_create_room_response_error) {
      console.error(daily_create_room_response_error);
    }
  }
  async allRooms(): Promise<DailyGetterPromiseResponse | DailyResponseError> {
    try {
      const all_created_rooms: any = await this.apiService.RequestData(
        "GET",
        daily_endpoints.rooms
      );
      return {
        total_rooms: all_created_rooms.total_count,
        rooms: all_created_rooms.data,
      };
    } catch (daily_all_rooms_response_error) {
      const erro: DailyResponseError = {
        error: daily_all_rooms_response_error.error,
        message: daily_all_rooms_response_error.info,
      };
      return erro;
    }
  }
  async createRoomToken(room_name: string, exp: number): Promise<string> {
    try {
      const properties: { [key: string]: string | number } = {
        room_name,
        exp,
      };
      const { token }: any = await this.apiService.RequestData(
        "POST",
        daily_endpoints.meetingTokens,
        "",
        { properties }
      );
      return token;
    } catch (daily_create_room_token_response_erro) {
      console.error(daily_create_room_token_response_erro);
    }
  }

  async meetingInfo(
    room_name: string = ""
  ): Promise<DailyGetterPromiseResponse | DailyResponseError> {
    if (room_name !== "") room_name = `room=${room_name}`;
    try {
      const all_meetings: any = await this.apiService.RequestData(
        "GET",
        daily_endpoints.meetingData,
        "",
        "",
        room_name
      );
      return {
        total_meetings: all_meetings.total_count,
        meetings: all_meetings.data,
      };
    } catch (daily_all_mettings_response_error) {
      const erro: DailyResponseError = {
        error: daily_all_mettings_response_error.error,
        message: daily_all_mettings_response_error.info,
      };
      return erro;
    }
  }
}
