import axios from 'axios';

const router = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_URL
});

export default router;
