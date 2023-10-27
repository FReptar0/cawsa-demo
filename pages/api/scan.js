import CustomResponse from "@/utils/CustomeResponse";
import UUIDGenerator from "@/utils/UUIDGenerator";
import { connectToDatabase, closeConnection } from "@/config/MongoDB";
import folioGeneration from "@/utils/FolioGeneration";

export default async function handler(req, res) {
    const { method } = req;

    const operation = {
        "POST": registerInOrOutOrder(req.body)
    }

    const result = await operation[method] ?? new CustomResponse(405, "Method not allowed", null, "Method not allowed");
    console.log(result);
    return res.status(result.status).json(result);
}

async function registerInOrOutOrder(body) {
    const { placas, nombreConductor } = body;
    const fecha = new Date();
    const fechaSinHora = fecha.toLocaleDateString();
    const hora = fecha.toLocaleTimeString();

    try {
        // buscar si existe una orden de entrada pendiente
        const db = await connectToDatabase();
        const collection = db.collection("cawsa-register-history");
        const query = { placas, isOut: false };
        const options = { sort: { fecha: -1 } };

        const result = await collection.findOne(query, options);
        if (result) {
            console.log("existe");
            // si existe, actualizar la orden de entrada
            const update = { $set: { isOut: true, horaSalida: hora, fechaSalida: fechaSinHora } };
            const filter = { _id: result._id };
            const options = { upsert: true };

            await collection.updateOne(filter, update, options);
            await closeConnection();

            return new CustomResponse(200, "Orden de salida registrada", null, "Orden de salida registrada");
        } else {
            console.log("no existe");
            const data = {
                _id: UUIDGenerator(),
                folio: await folioGeneration(),
                placas,
                nombreConductor,
                fechaSinHora,
                horaEntrada: hora,
                isOut: false
            };

            const result = await collection.insertOne(data);
            console.log(result);
            if (result.acknowledged) {
                await closeConnection();
                return new CustomResponse(100, "Orden de entrada registrada", null, "Orden de entrada registrada");
            } else {
                await closeConnection();
                return new CustomResponse(500, "Error interno del servidor", null, "Error interno del servidor");
            }

        }
    } catch (error) {
        console.log(error);
        return new CustomResponse(500, "Error interno del servidor", null, "Error interno del servidor");
    }
}