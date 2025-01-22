import request from "../../requests/request";
import {TaskData} from "../../../types/TaskData";

/**
 * Update the task status
 * @param {string} taskId
 * @param {string} status
 *
 * @return {Promise<TaskData>}
 */
const updateTaskStatus = async (taskId: string, status: string): Promise<TaskData> => {
    const data = { taskId, status };
    const response = await request("update_task_status", "POST", data );
    console.log("getTasks response", response);

    // @ts-ignore
    if (!response || !response.data) {
        //return empty TaskData
        return []
    }

    // @ts-ignore
    return response.data as Task[];
};

export default updateTaskStatus;
