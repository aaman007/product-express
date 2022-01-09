import jwt from "jsonwebtoken";

const keys: {
    [key: string]: string,
} = {
    accessTokenPublicKey: `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ/6N8CbV5xZhF8keKkq4NRPf/
uldczB7m7BxJxzOF9SFFelxkYXVUdbZ+SJ1K/Uelk5z3ikhnIXOp+u6hcUpbiG8f
TfaOj4YsptCsH2DeMLy+kznwjbvGFi3X0LN4KiPsUIMXTLfLNW+UZvEvTTD0MycD
D9HAN6wXy+bJ0CE71wIDAQAB
-----END PUBLIC KEY-----`,
    accessTokenPrivateKey: `
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCZ/6N8CbV5xZhF8keKkq4NRPf/uldczB7m7BxJxzOF9SFFelxk
YXVUdbZ+SJ1K/Uelk5z3ikhnIXOp+u6hcUpbiG8fTfaOj4YsptCsH2DeMLy+kznw
jbvGFi3X0LN4KiPsUIMXTLfLNW+UZvEvTTD0MycDD9HAN6wXy+bJ0CE71wIDAQAB
AoGBAI25wSF0ZfmNqhglY0XavCgmIv7M5X3XtVDcVyRnGbnc4SPp+oG/V5XFR5Bt
D6Vl97wgX8NJFl0jYik7cMZPVxf5jUO6aD03qjO9RgRwR67j3Y+py+zNRZiXK6tl
v04+0z0mA1ueyejASqOxdDx8WQlo5pdsLIXMdhZN5KGsyaRxAkEA4piwwVHjNQl+
oqmHtBqTkfTdljI2m4qmuerGZ+1T7TiAsL0CQyF+n12cSWOq1beafbIx4P2BVtp9
N6ONSkKXLQJBAK37UbbGGarPwTY9Dai1Ukmils56j89++7zZAVNEwxt5uoPERo15
CAdofygWfHnlOFJ78Bz+frpDO6xZpiLKQZMCQQC9MkBjKbxLzGGv710fRBFzDMD3
Z3Ww6VPMZ/rBS6eHqmXJLAd3hb/z0HVt0YoSZ/rWeLKs6P3VRxjGHAkct/0BAkBV
V0je4c9nVR9OTqZrkf26NvHIeKAgRQaQvNWEld8qlAxkZBvDe5HvqFdvP5Bxbnmx
JDBE2KUrEp2rzhHLUPDXAkEAw7/0/44D1H48w7KVCXOq2RET0uM4vrtFlXZ/RRFh
UZPgOJg1rFwW00X+eoCBeksOWI9/Vh+6Q64Oseijo9iVKg==
-----END RSA PRIVATE KEY-----`,
    refreshTokenPublicKey: `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ/6N8CbV5xZhF8keKkq4NRPf/
uldczB7m7BxJxzOF9SFFelxkYXVUdbZ+SJ1K/Uelk5z3ikhnIXOp+u6hcUpbiG8f
TfaOj4YsptCsH2DeMLy+kznwjbvGFi3X0LN4KiPsUIMXTLfLNW+UZvEvTTD0MycD
D9HAN6wXy+bJ0CE71wIDAQAB
-----END PUBLIC KEY-----`,
    refreshTokenPrivateKey: `
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCZ/6N8CbV5xZhF8keKkq4NRPf/uldczB7m7BxJxzOF9SFFelxk
YXVUdbZ+SJ1K/Uelk5z3ikhnIXOp+u6hcUpbiG8fTfaOj4YsptCsH2DeMLy+kznw
jbvGFi3X0LN4KiPsUIMXTLfLNW+UZvEvTTD0MycDD9HAN6wXy+bJ0CE71wIDAQAB
AoGBAI25wSF0ZfmNqhglY0XavCgmIv7M5X3XtVDcVyRnGbnc4SPp+oG/V5XFR5Bt
D6Vl97wgX8NJFl0jYik7cMZPVxf5jUO6aD03qjO9RgRwR67j3Y+py+zNRZiXK6tl
v04+0z0mA1ueyejASqOxdDx8WQlo5pdsLIXMdhZN5KGsyaRxAkEA4piwwVHjNQl+
oqmHtBqTkfTdljI2m4qmuerGZ+1T7TiAsL0CQyF+n12cSWOq1beafbIx4P2BVtp9
N6ONSkKXLQJBAK37UbbGGarPwTY9Dai1Ukmils56j89++7zZAVNEwxt5uoPERo15
CAdofygWfHnlOFJ78Bz+frpDO6xZpiLKQZMCQQC9MkBjKbxLzGGv710fRBFzDMD3
Z3Ww6VPMZ/rBS6eHqmXJLAd3hb/z0HVt0YoSZ/rWeLKs6P3VRxjGHAkct/0BAkBV
V0je4c9nVR9OTqZrkf26NvHIeKAgRQaQvNWEld8qlAxkZBvDe5HvqFdvP5Bxbnmx
JDBE2KUrEp2rzhHLUPDXAkEAw7/0/44D1H48w7KVCXOq2RET0uM4vrtFlXZ/RRFh
UZPgOJg1rFwW00X+eoCBeksOWI9/Vh+6Q64Oseijo9iVKg==
-----END RSA PRIVATE KEY-----`
};

export const signJwt = (object: Object, keyName: string, options?: jwt.SignOptions) => {
    const signingKey: string = keys[keyName];
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
      });
};

export const verifyJwt = (token: string, keyName: string) => {
    const publicKey: string = keys[keyName];
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    }
    catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
};