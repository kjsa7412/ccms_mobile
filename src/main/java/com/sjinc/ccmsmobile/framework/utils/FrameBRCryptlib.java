package com.sjinc.ccmsmobile.framework.utils;

import com.sjinc.ccmsmobile.framework.utils.rc4.BRRC4;
import lombok.extern.slf4j.Slf4j;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

@Slf4j
public class FrameBRCryptlib {

    private static final String KEY_SEP = "|";
    private static final String CIPHER_NO = "NO";
    private static final String CIPHER_OTS = "OTS";
    private static final char[] hexArray = "0123456789ABCDEF".toCharArray();

    protected FrameBRCryptlib() {
        super();
    }


    /**
     * record encording
     *
     * @param enText
     * @param key
     * @return
     */
    public static String recordEncrypt(String enText, String key) {
        String result = enText;
        try {
            result = BRRC4.encryptR4(key, enText);
        } catch (Exception e) {
            log.error("", e);
        }
        return result;
    }

//	    public static String recordDecryptByData(Data data, String _key ){
//	        return recordEncrypt(data.toJson(), _key);
//	    }

    public static String recordDecrypt(String enText, String key) {
        String result = enText;
        try {
            result = BRRC4.decryptRC4(key, enText);
        } catch (Exception e) {
            log.error("", e);
        }
        return result;
    }

//	    public static Data recordDecryptToData(String _enText, String _key ){
//	        return new Data(recordDecrypt(_enText, _key));
//	    }

    // MD5 해쉬값을 구한다
    public static String getMD5String(String plainText) {
        String messageDigestStr = "";

        try {
            byte[] defaultBytes = plainText.getBytes(StandardCharsets.UTF_8);

            MessageDigest algorithm = MessageDigest.getInstance("MD5");
            algorithm.reset();
            algorithm.update(defaultBytes);
            byte messageDigestArr[] = algorithm.digest();

            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigestArr.length; i++)
                hexString.append(Integer.toHexString(0xFF & messageDigestArr[i]));
            messageDigestStr = hexString.toString().toLowerCase(Locale.getDefault());
        } catch (Exception e) {
            log.error("", e);
            messageDigestStr = "";
        }

        return messageDigestStr;
    }

    /**
     * 임의 길이의 비밀번호용 문자열 생성
     *
     * @param length
     * @return
     */
    public static String randomPassword(int length) {
        Random generator = new Random();
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuffer result = new StringBuffer();
        int randomIndex;
        for (int x = 0; x < length; x++) {
            randomIndex = generator.nextInt(chars.length());
            result.append(chars.charAt(randomIndex));
        }
        return result.toString();
    }

    /**
     * one-time-password
     *
     * @return
     */
    public static String makeOTP() {
        return randomPassword(8); // 8byte = 64bit
    }

    /**
     * Challenge 생성
     *
     * @return
     */
    public static String makeChallenge() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        return sdf.format(new Date());
    }


    public static String encodeBase64(String parm) {
        byte[] b1 = parm.getBytes(Charset.forName("UTF-8"));
        return encodeBase64(b1);
    }

    public static String encodeBase64(byte[] parm) {
        byte[] buf = null;
        String result = "";
        try {
            Class base64 = Class
                    .forName("org.apache.commons.codec.binary.Base64");
            Class[] parameterTypes = new Class[]{byte[].class};
            Method encodeBase64 = base64.getMethod("encodeBase64",
                    parameterTypes);
            buf = (byte[]) encodeBase64.invoke(base64, parm);
            result = new String(buf, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("", e);
        }

        return result;
    }

    public static String decodeBase64(String parm) {
        byte[] b1 = parm.getBytes(StandardCharsets.UTF_8);
        return decodeBase64(b1);
    }

    public static String decodeBase64(byte[] parm) {
        //Base64.Decoder decoder = Base64.getDecoder();
        String rst = "";

        return rst;
    }

    public static String encodeSha1Hash(String toHash) {
        String hash = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] bytes = toHash.getBytes("UTF-8");
            digest.update(bytes, 0, bytes.length);
            bytes = digest.digest();

            // This is ~55x faster than looping and String.formating()
            hash = bytesToHex(bytes);
        } catch (NoSuchAlgorithmException e) {
            log.error("", e);
        } catch (UnsupportedEncodingException e) {
            log.error("", e);
        }
        return hash;
    }

    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

}