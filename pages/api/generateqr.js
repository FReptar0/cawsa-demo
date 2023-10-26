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
    const { placas, NIV, maximoPeso, ultimaVerificacion } = data;

    if (!placas || !NIV || !maximoPeso || !ultimaVerificacion) {
        return new CustomResponse(400, "Bad request", null, "Bad request");
    }

    const qrData = {
        placas,
        NIV,
        maximoPeso,
        ultimaVerificacion
    }

    try {
        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        return new CustomResponse(200, "Success, QR generated", qrCode, null);
    } catch (error) {
        console.log(error);
        return new CustomResponse(500, "Internal server error", null, error);
    }
}