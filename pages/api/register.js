import CustomResponse from "@/utils/CustomeResponse";
import UUIDGenerator from "@/utils/UUIDGenerator";
import runQuery from "@/config/SQLServerConnection";

export default async function handler(req, res) {
    const { method } = req;

    const operation = {
        "POST": registerInOutOrder(req.body)
    }

    const result = await operation[method] ?? new CustomResponse(405, "Method not allowed", null, "Method not allowed");

    return res.status(result.status).json(result);
}

async function registerInOutOrder(data) {
    const { folio, fechaEntrada, horaEntrada, fechaSalida, horaSalida, placas, nombreConductor } = data;

    const query = `INSERT INTO [dbo].[fesaCawsa] (uuid, folio, fechaEntrada, horaEntrada, fechaSalida, horaSalida, placas, nombreConductor) VALUES ('${UUIDGenerator()}', '${folio}', '${fechaEntrada}', '${horaEntrada}', '${fechaSalida}', '${horaSalida}', '${placas}', '${nombreConductor}')`;

    try {
        const result = await runQuery(query);

        if (result.rowsAffected[0] === 0) {
            return new CustomResponse(400, "Bad request", null, "Bad request");
        }

        return new CustomResponse(200, "Success, order saved", null, null);

    } catch (error) {
        return new CustomResponse(500, "Internal server error", null, error);
    }
}
