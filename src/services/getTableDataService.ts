import axios from "axios";
import { tableUrl } from "../urls";

export const getTableDataService = async (eventType: string) => {
  try {
    return await axios(tableUrl + eventType);
  } catch (err: any) {
    return err.message;
  }
};
