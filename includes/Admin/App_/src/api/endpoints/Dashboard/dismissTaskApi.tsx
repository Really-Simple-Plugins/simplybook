import request from "../../requests/request";
import {TaskData} from "../../../types/TaskData";
import {Task} from "../../../types/Task";

/**
 * Update the task status
 * @param {string} taskId
 *
 * @return {Promise<TaskData>}
 */
const dismissTaskApi = async (taskId: string): Promise<TaskData> => {
    const data = { taskId };
    const response = await request("dismiss_task", "POST", data );
    console.log("dismissing task", response);

    // @ts-ignore
    if (!response || !response.data) {
        //return empty TaskData
        return [] as Task[];
    }

    // @ts-ignore
    return response.data as Task[];
};

export default dismissTaskApi;
