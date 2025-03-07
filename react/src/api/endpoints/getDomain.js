import request from "../requests/request";

const getDomain = async () => {
    const res = await request("get_domain", "POST");
    if (!res || !res.data.domain) {
        return '';
    }
    return res.data.domain;
};

export default getDomain;