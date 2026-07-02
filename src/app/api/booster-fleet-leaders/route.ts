import data from "@/data/booster-fleet-leaders.json"

export async function GET(request: Request) {
    return Response.json(data);
}