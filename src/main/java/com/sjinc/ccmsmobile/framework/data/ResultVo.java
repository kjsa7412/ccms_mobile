package com.sjinc.ccmsmobile.framework.data;

public class ResultVo<T> {
    public boolean IsError;
    public boolean IsSessionError;
    public boolean IsWarning;
    public String ErrorMsg;
    public String WarningMsg;
    public T Content;
}
