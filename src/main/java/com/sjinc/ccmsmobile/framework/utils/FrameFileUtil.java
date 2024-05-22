package com.sjinc.ccmsmobile.framework.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.*;

/**
 * 프레임 공통 File 함수 정의
 */
@Slf4j
public class FrameFileUtil {

    /**
     * 디렉토리 생성한다.
     *
     * @param path
     * @return
     */
    public static String makeDir(String path) {

        String dir = path + File.separator + FrameDateUtil.getDate("yyyyMM");

        File folder = new File(dir);

        if (!folder.exists()) {
            try {
                //상위 디렉토리 있어야함
                folder.mkdirs();
            } catch (Exception e) {
                log.error(e.getMessage());
                e.printStackTrace();
            }
        }

        return dir;
    }

    /**
     * 파일을 저장한다.
     *
     * @param
     * @return map
     */
    public static Map<String, String> makeFile(MultipartFile multipartFile, String path) throws Exception {
        String systemOS = System.getProperty("os.name").toLowerCase();

        Map<String, String> map = new HashMap<String, String>();

        String orgFileName = multipartFile.getOriginalFilename();
        String orgExtension = getFileExt(orgFileName);

        if (orgFileName.indexOf(File.separator) > -1) {
            orgFileName = orgFileName.substring(orgFileName.lastIndexOf(File.separator) + 1);
        }

        String srcFileName = FrameDateUtil.getTimeLocale("yyyyMMddhhmmssS") + "_" + String.valueOf(new Random().nextInt(100000));

        InputStream is = null;
        FileOutputStream os = null;

        try {
            File file = new File(path + File.separator + srcFileName);

            is = multipartFile.getInputStream();
            os = new FileOutputStream(file);

            byte[] buf = new byte[1024 * 1024];
            int len = 0;

            while ((len = is.read(buf)) > 0) {
                os.write(buf, 0, len);
            }

            if(!systemOS.contains("win")) {
                Set<PosixFilePermission> perms = new HashSet<>();
                perms.add(PosixFilePermission.OWNER_READ);
                perms.add(PosixFilePermission.OWNER_WRITE);
                perms.add(PosixFilePermission.OWNER_EXECUTE);
                perms.add(PosixFilePermission.GROUP_READ);
                perms.add(PosixFilePermission.GROUP_WRITE);
                perms.add(PosixFilePermission.GROUP_EXECUTE);
                perms.add(PosixFilePermission.OTHERS_READ);
                perms.add(PosixFilePermission.OTHERS_WRITE);
                perms.add(PosixFilePermission.OTHERS_EXECUTE);

                Path filePath = Paths.get(path + File.separator + srcFileName);
                Files.setPosixFilePermissions(filePath, perms);
            }

            map.put("originalFilename", orgFileName);
            map.put("contentType", multipartFile.getContentType());
            map.put("name", multipartFile.getName());
            map.put("size", Long.toString(multipartFile.getSize()));
            map.put("orgExtension", orgExtension);
            map.put("srcFileName", srcFileName);
        } finally {
            if (os != null)
                os.close();
            if (is != null)
                is.close();
        }

        return map;
    }

    /**
     * 파일 확장자 구하기
     *
     * @param filename
     * @return
     */
    public static String getFileExt(String filename) {
        String extension = "";

        int i = filename.lastIndexOf('.');
        int p = Math.max(filename.lastIndexOf('/'), filename.lastIndexOf('\\'));

        if (i > p) {
            extension = filename.substring(i + 1);
        }
        return extension;
    }

    /**
     * 파일 리소스 구하기
     *
     * @param
     * @return
     */
    public static Resource loadAsResource(String path, String fileName) throws Exception {

        Path file = Paths.get(path).resolve(fileName);

        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new FileNotFoundException("Could not read file: " + fileName);
        }
    }

}
