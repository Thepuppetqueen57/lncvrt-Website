import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        "paths": [
            "folia",
            "paper",
            "purformance",
            "travertine",
            "vanilla",
            "velocity",
            "waterfall"
        ]
    });
}