import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilds } from '../../../../lib/papermc/builds';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const buildsData = await getBuilds("paper");
        res.status(200).json(buildsData);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Failed to fetch resource details' });
    }
}