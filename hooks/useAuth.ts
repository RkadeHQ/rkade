import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default function useAuth() {
  const getWeb3Modal = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'testnet',
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              80001: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
            }
          }
        }
      }
    });
    return web3Modal;
  }, []);

  const connect = useCallback(async () => {
    console.log('ok');

    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    if (!localStorage.getItem('token')) signIn(connection, accounts[0]);
    else {
      const token = localStorage.getItem('token') as string;
    }
  }, []);

  const signIn = useCallback(async (connection: any, account: string) => {
    const authData = await fetch(`/api/auth?address=${account}`);
    const user = await authData.json();
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(user.nonce.toString());
    const response = await fetch(
      `/api/verify?address=${account}&signature=${signature}&id=${user.id}`
    );
    const data = await response.json();
    localStorage.setItem('token', data.token);
  }, []);

  return {
    connect
  };
}
