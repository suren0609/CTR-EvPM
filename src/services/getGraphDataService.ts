import axios from "axios";
import { graphUrl } from "../urls";

export const getGraphDataService = async (eventType: string) => {
  try {
    return await axios(graphUrl + eventType);
  } catch (err: any) {
    return err.message;
  }
};
