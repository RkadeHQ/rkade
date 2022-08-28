import type { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import router from '../../utils/router';

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  try {
    const userData = await router.get(
      `/users.json?orderBy="address"&equalTo="${address}"`
    );
    let userD = userData.data;

    let user = userD[Object.keys(userD)[0]];

    let id;

    if (!user) {
      id = uuidv4();

      user = {
        address,
        nonce: Math.floor(Math.random() * 10000000)
      };

      await router.put(`/users/${id}.json`, user);
    } else {
      id = Object.keys(userD)[0];
      const nonce = Math.floor(Math.random() * 10000000);
      user.nonce = nonce;
      await router.put(`/users/${id}.json`, user);
    }

    res.status(200).json({
      address: user.address,
      id,
      nonce: user.nonce,
      success: true
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  address?: string;
  nonce?: string;
  id?: string;
  success: boolean;
};
