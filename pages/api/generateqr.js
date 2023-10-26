import QRCode from 'qrcode'
import CustomResponse from "@/utils/CustomeResponse";

export default function qrhandlergenerator(req, res) {
    const { method } = req;

    if (method === "POST") {
        const result = generateQR(req.body).then((result) => {
            return res.status(result.status).json(result);
        });
        return result;
    } else {
        return res.status(405).json(new CustomResponse(405, "Method not allowed", null, "Method not allowed"));
    }

}


async function generateQR(data) {
    const { placas, nombreConductor } = data;

    if (!placas || !nombreConductor) {
        return new CustomResponse(400, "Bad request", null, "Bad request");
    }

    const qrData = {
        placas,
        nombreConductor
    }

    try {
        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        return new CustomResponse(200, "Success, QR generated", qrCode, null);
    } catch (error) {
        console.log(error);
        return new CustomResponse(500, "Internal server error", null, error);
    }
}