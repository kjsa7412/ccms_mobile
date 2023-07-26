export interface ISearch {
  yyyy: ISearchData;
  mm: ISearchData;
  cctvName: ISearchData | undefined | null;
  cctvCode: ISearchData | undefined | null;
  cctvAddr: ISearchData | undefined | null;
  cctvTSGB: ISearchData | undefined | null;
}

export interface ISearchData {
  value: string;
  label: string;
}