import request from "../../requests/request";
import {TaskData} from "../../../types/TaskData";

/**
 * Get the bookings count
 * @return {Promise<TaskData>}
 */
const getTasks = async (): Promise<TaskData> => {
    const response = await request("get_tasks", "POST");
    console.log("getTasks response", response);

    // @ts-ignore
    if (!response || !response.data) {
        return [];
    }

    // @ts-ignore
    return response.data as Task[];
};

export default getTasks;
