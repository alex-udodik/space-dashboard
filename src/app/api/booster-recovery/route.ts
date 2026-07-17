import data from "@/data/booster-recovery.json"

export async function GET(request: Request) {
    return Response.json(data);
}
