import { connectToDatabase } from "@/config/MongoDB";

export default async function folioGeneration(){
    // contar el total de registros
    const db = await connectToDatabase();
    const collection = db.collection("cawsa-register-history");
    const query = {};
    const options = {};

    const result = await collection.find(query, options).toArray();

    // hacer un string con el siguiente formato: F-{total de registros + 1}
    const total = result.length;
    const folio = `F-${total + 1}`;
    return folio;
}