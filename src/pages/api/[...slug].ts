import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse): void {
    res.status(404).json({ message: "404: Not Found" });
}
