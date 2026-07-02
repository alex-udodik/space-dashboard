import data from "@/data/recent-launches.json"

export async function GET(request: Request) {
    return Response.json(data);
}
