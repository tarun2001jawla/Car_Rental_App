/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from "buffer";

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

export const parseJwt = (token: string)=> {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
