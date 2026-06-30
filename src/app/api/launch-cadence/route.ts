import data from "@/data/launch-cadence.json"

export async function GET(request: Request) {
    return Response.json(data);
}