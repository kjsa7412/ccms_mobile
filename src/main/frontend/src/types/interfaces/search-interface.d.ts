export interface ISearch {
    yyyy: ISearchData;
    mm: ISearchData;
    cctvName: ISearchData | undefined | null;
    cctvCode: ISearchData | undefined | null;
    cctvAddr: ISearchData | undefined | null;
    cctvTSGB: ISearchData | undefined | null;
    equiCd: ISearchData | undefined | null;
    equiNm: ISearchData | undefined | null;
    equiAddr: ISearchData | undefined | null;
}

export interface ISearchData {
    value: string;
    label: string;
}