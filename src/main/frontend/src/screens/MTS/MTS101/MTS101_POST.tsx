import {mts101Atom} from "../../../atoms/MTS101/mts101Atom";
import {useRecoilState} from "recoil";
import {IMTS101} from "@custom-interfaces/MTS101/mts101-interface";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../../atoms/searchAtom";
import Blank from "../../../components/Blank";
import {EBlank} from "@custom-enums/common-enum";
import ScreenLabel from "../../../components/label/ScreenLabel";
import Post from "../../../components/post/Post";
import {formattedDate} from "../../../utils/HandleDateFormat";
import LoadingPost from "../../../components/loading/LoadingPost";


const MTS101_POST = ({selectQuery, postMax}: { selectQuery: any, postMax: number }) => {
    // data
    const [, setRcMTS101] = useRecoilState<IMTS101>(mts101Atom);
    const [rcSearch,] = useRecoilState<ISearch>(searchAtom);

    // function
    const setId = (id: string) => {
        setRcMTS101((prev) => ({...prev, id: id}));
    }

    const getTotalCount = () => {
        let totalCount = 0;
        let cctvName = rcSearch.cctvName;
        let cctvTSGB = rcSearch.cctvTSGB;

        const inputData = selectQuery.data.data.Content;

        for (let data of inputData) {
            let isMatch1 = !!cctvName?.value ? cctvName.value === data.equi_cd : true;
            let isMatch2 = !!cctvTSGB?.value ? cctvTSGB.value === data.trou_gb_cotr_cd : true;

            if (isMatch1 && isMatch2) {
                totalCount++;
            }
        }

        return totalCount;
    }

    return (
        <>
            {
                selectQuery.status !== 'success' ||
                selectQuery.isFetching === true ?
                    (<>
                        <ScreenLabel title={'장애내역'} count={0}/>
                        <Blank type={EBlank.Row}/>
                        <LoadingPost pHeight={130}/>
                    </>) :
                    (<>
                        <ScreenLabel key="mts101-post-label" title={'장애내역'} count={getTotalCount()}/>
                        {
                            selectQuery.data.data.Content
                                .filter((value: any) => {
                                    let cctvName = rcSearch.cctvName;
                                    let cctvTSGB = rcSearch.cctvTSGB;

                                    let isMatch1 = !!cctvName?.value ? cctvName.value === value.equi_cd : true;
                                    let isMatch2 = !!cctvTSGB?.value ? cctvTSGB.value === value.trou_gb_cotr_cd : true;

                                    return isMatch1 && isMatch2;
                                })
                                .map((value: any, index: number) => {
                                    if (postMax < index) {
                                        return null;
                                    }

                                    const params = [
                                        {
                                            title: 'CCTV명',
                                            contents: value.equi_nm,
                                        },
                                        {
                                            title: '장애구분',
                                            contents: value.trou_gb_cotr_nm,
                                        },
                                        {
                                            title: '장애일자',
                                            contents: formattedDate(value.trou_dd_hrti),
                                        },
                                        {
                                            title: '세부내용',
                                            contents: value.trou_cont,
                                        },
                                    ];

                                    return (
                                        <div key={"div-" + value.trou_mngr_dd_no} style={{width: '100%'}}>
                                            <Blank key={"blank-" + value.trou_mngr_dd_no} type={EBlank.Row}/>
                                            <Post key={"post-" + value.trou_mngr_dd_no}
                                                  postData={params}
                                                  link={"/MTS101T1"}
                                                  onClick={() => {
                                                      setId(value.trou_mngr_dd_no)
                                                  }}/>
                                        </div>)
                                })
                        }
                        <Blank type={EBlank.Bottom}/>
                    </>)
            }
        </>
    )
}

export default MTS101_POST;