import { NextApiRequest, NextApiResponse } from 'next';
import { IResError } from 'types/common';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResError | string>
) {
  if (req.method !== 'GET') {
    return res.status(404).send('');
  }

  try {
    await res.revalidate(`/cocktail/${req.query.slug}`);

    return res.json('revalidated');
  } catch (err) {
    console.log(err);

    return res.status(500).send({ error: 'Error revalidating' });
  }
}
