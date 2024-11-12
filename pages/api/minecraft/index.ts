import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json([
        "folia",
        "paper",
        "purformance",
        "travertine",
        "vanilla",
        "velocity",
        "waterfall",
    ]);
}