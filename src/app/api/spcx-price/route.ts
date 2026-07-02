import data from "@/data/spcx-price.json";

export async function GET(request: Request) {
    return Response.json(data);
}
