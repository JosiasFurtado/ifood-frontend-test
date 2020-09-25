import { NextApiResponse } from 'next'

export default async (_, res: NextApiResponse) => {
  const filters = await fetch(
    `${process.env.NEXT_PUBLIC_API_FILTERS_URL}/5a25fade2e0000213aa90776`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-br',
        Accept: 'application/json',
      },
    }
  ).then((response) => response.json())

  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate')
  res.json(filters)
}
