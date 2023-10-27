import CustomResponse from "@/utils/CustomeResponse";
import UUIDGenerator from "@/utils/UUIDGenerator";

export default async function handler(req, res) {
    const { method } = req;

    const operation = {
        "POST": registerInOutOrder(req.body)
    }

    const result = await operation[method] ?? new CustomResponse(405, "Method not allowed", null, "Method not allowed");

    return res.status(result.status).json(result);
}

