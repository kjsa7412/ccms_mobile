package com.sjinc.ccmsmobile.framework.utils.rc4;

import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;


@Slf4j
public class BRRC4 {

    protected BRRC4() {
        //super();
    }

    /**
     * RC4 로 인코딩 한다.
     *
     * @param key
     * @param text
     * @return
     */
    public static String encryptR4(String key, String text) {
        byte[] bcipher = null;
        try {
            final byte[] bkey = key.getBytes("utf-8");
            final byte[] btext = text.getBytes("utf-8");
            bcipher = doCipher(bkey, btext);

        } catch (Exception e) {
            log.error("", e);
        }
        return binArray2Hex(bcipher);
    }

    /**
     * RC4로 인코딩한다.
     *
     * @param key
     * @param btext
     * @return
     */
    public static byte[] encryptR4(String key, byte[] btext) {
        byte[] bcipher = null;
        try {
            final byte[] bkey = key.getBytes("utf-8");
            bcipher = doCipher(bkey, btext);

        } catch (Exception e) {
            log.error("", e);
        }
        return bcipher;
    }

    /**
     * RC4로 디코딩한다.
     *
     * @param key
     * @param text
     * @return
     */
    public static String decryptRC4(String key, String text) {
        byte[] bcipher = null;
        try {
            final byte[] bkey = key.getBytes("utf-8");
            final byte[] btext = hex2BinArray(text);
            bcipher = doCipher(bkey, btext);

        } catch (Exception e) {
            log.error("", e);
        }
        return (bcipher != null) ? new String(bcipher, StandardCharsets.UTF_8) : "";
    }

    /**
     * RC4로 디코딩한다.
     *
     * @param key
     * @param btext
     * @return
     */
    public static byte[] decryptRC4(String key, byte[] btext) {
        byte[] bcipher = null;
        try {
            final byte[] bkey = key.getBytes("utf-8");
            bcipher = doCipher(bkey, btext);

        } catch (Exception e) {
            log.error("", e);
        }
        return bcipher;
    }


    private static byte[] doCipher(byte[] bkey, byte[] text) {

        final int textLen = text.length;
        byte[] cipher = new byte[textLen];

        try {
            int[] key = new int[256];
            int[] box = new int[256];

            int a, i, j, k, tmp;

            for (i = 0; i < 256; i++) {
                key[i] = bkey[i % bkey.length];
                box[i] = i;
            }
            for (j = i = 0; i < 256; i++) {
                j = (j + box[i] + key[i]) % 256;
                tmp = box[i];
                box[i] = box[j];
                box[j] = tmp;
            }

            for (a = j = i = 0; i < textLen; i++) {
                a++;
                a %= 256;
                j += box[a];
                j %= 256;

                tmp = box[a];
                box[a] = box[j];
                box[j] = tmp;

                k = box[((box[a] + box[j]) % 256)];
                cipher[i] = (byte) (text[i] ^ k);
            }


        } catch (Exception e) {
            log.error("", e);
        }
        return cipher;
    }


    public static String binArray2Hex(byte buf[]) {

        if (buf == null)
            return "";

        StringBuffer strbuf = new StringBuffer(buf.length * 2);
        int i;
        for (i = 0; i < buf.length; i++) {
            if (((int) buf[i] & 0xff) < 0x10)
                strbuf.append("0");

            strbuf.append(Long.toString((int) buf[i] & 0xff, 16));
        }

        return strbuf.toString();
    }

    public static byte[] hex2BinArray(String hexStr) {
        byte bArray[] = new byte[hexStr.length() / 2 & 0xff];
        for (int i = 0; i < (hexStr.length() / 2); i++) {
            byte firstNibble = Byte.parseByte(hexStr.substring(2 * i, 2 * i + 1), 16); // [x,y)
            byte secondNibble = Byte.parseByte(hexStr.substring(2 * i + 1, 2 * i + 2), 16);
            int finalByte = (secondNibble) | (firstNibble << 4) & 0xff; // bit-operations only with numbers, not  bytes.
            bArray[i] = (byte) finalByte;
        }
        return bArray;
    }

}
