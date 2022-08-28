import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
//@ts-ignore
import jwt from 'jsonwebtoken';
import router from '../../utils/router';

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let authenticated = false;
  const { address, signature, id } = req.query;

  try {
    const userData = await router.get(`/users/${id}.json`);
    let user = userData.data;

    const decodedAddress = ethers.utils.verifyMessage(
      user.nonce.toString(),
      signature as string
    );

    if ((address as string).toLowerCase() === decodedAddress.toLowerCase()) {
      authenticated = true;

      const payload = {
        user: {
          id: id as string
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' },
        (err: any, token: any) => {
          if (err) {
            throw err;
          }
          res.status(200).json({
            authenticated: true,
            success: true,
            token
          });
        }
      );
    } else {
      console.log('address not matched');

      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}

type Data = {
  authenticated?: boolean;
  success: boolean;
  points?: number;
  username?: string;
  token?: string;
};
