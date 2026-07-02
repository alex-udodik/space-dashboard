import data from "@/data/starlink-constellation.json"

export async function GET(request: Request) {
    return Response.json(data);
}