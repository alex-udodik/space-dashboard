import data from "@/data/payload-orbit.json"

export async function GET(request: Request) {
    return Response.json(data);
}
