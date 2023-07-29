export interface IAPIResponse<T> {
    IsError: boolean;
    IsSessionError: boolean;
    IsWarning: boolean;
    ErrorMsg: string;
    WarningMsg: string;
    Content: [T];
}

export interface IPostData {
    title: string;
    contents: string;
}