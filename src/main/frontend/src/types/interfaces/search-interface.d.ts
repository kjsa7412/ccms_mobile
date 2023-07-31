export interface ISearch {
    yyyy: ISearchData;
    mm: ISearchData;
    cctvName: ISearchData | null;
    cctvCode: ISearchData | null;
    cctvAddr: ISearchData | null;
    cctvTSGB: ISearchData | null;
    equiCd: ISearchData | null;
    equiNm: ISearchData | null;
    equiAddr: ISearchData | null;
}

export interface ISearchData {
    value: any;
    label: string;
}