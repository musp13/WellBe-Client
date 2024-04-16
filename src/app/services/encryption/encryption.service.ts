import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
/* import 'dotenv/config'
require('dotenv').config() */

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(value: string) : string{
    return CryptoJS.AES.encrypt(value, 'my-secret-key').toString();
  }

  decrypt(value: string) : string{
    return CryptoJS.AES.decrypt( value,  'my-secret-key').toString(CryptoJS.enc.Utf8);
  }
}
