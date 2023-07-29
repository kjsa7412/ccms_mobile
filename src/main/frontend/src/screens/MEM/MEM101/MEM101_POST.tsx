import {useRecoilState} from "recoil";
import {IMEM101} from "@custom-interfaces/MEM101/mem101-interface";
import {mem101Atom} from "../../../atoms/MEM101/mem101Atom";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../../atoms/searchAtom";
import ScreenLabel from "../../../components/label/ScreenLabel";
import Blank from "../../../components/Blank";
import {EBlank} from "@custom-enums/common-enum";
import LoadingPost from "../../../components/loading/LoadingPost";
import Post from "../../../components/post/Post";

const MEM101_POST = ({selectQuery, postMax}: { selectQuery: any, postMax: number }) => {
    // data
    const [, setRcMEM101] = useRecoilState<IMEM101>(mem101Atom);
    const [rcSearch,] = useRecoilState<ISearch>(searchAtom);

    // fucntion
    const setId = (id: string) => {
        setRcMEM101((prev) => ({...prev, id: id}));
    }

    const getTotalCount = () => {
        let totalCount = 0;
        let equiNm = rcSearch.equiNm;
        let equiCd = rcSearch.equiCd;
        let equiAddr = rcSearch.equiAddr;

        const inputData = selectQuery.data.data.Content;

        for (let data of inputData) {
            let isMatch1 = !!equiCd?.value ? equiCd.value === data.equi_cd : true;
            let isMatch2 = !!equiNm?.value ? equiNm.value === data.equi_nm : true;
            let isMatch3 = !!equiAddr?.value ? equiAddr.value === data.inst_addr : true;

            if (isMatch1 && isMatch2 && isMatch3) {
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
                        <ScreenLabel title={'장비목록'} count={0}/>
                        <Blank type={EBlank.Row}/>
                        <LoadingPost pHeight={130}/>
                    </>) :
                    (<>
                        <ScreenLabel key="mem101-post-label" title={'장비목록'} count={getTotalCount()}/>
                        {
                            selectQuery.data.data.Content
                                .filter((value: any) => {
                                    let equiNm = rcSearch.equiNm;
                                    let equiCd = rcSearch.equiCd;
                                    let equiAddr = rcSearch.equiAddr;

                                    let isMatch1 = !!equiCd?.value ? equiCd.value === value.equi_cd : true;
                                    let isMatch2 = !!equiNm?.value ? equiNm.value === value.equi_nm : true;
                                    let isMatch3 = !!equiAddr?.value ? equiAddr.value === value.inst_addr : true;

                                    return isMatch1 && isMatch2 && isMatch3;
                                })
                                .map((value: any, index: number) => {
                                    if (postMax < index) {
                                        return null;
                                    }

                                    const params = [
                                        {
                                            title: '장비코드',
                                            contents: value.equi_cd,
                                        },
                                        {
                                            title: '장비명',
                                            contents: value.equi_nm,
                                        },
                                        {
                                            title: '제조사',
                                            contents: value.manu_comp,
                                        },
                                        {
                                            title: '설치주소',
                                            contents: value.inst_addr,
                                        },
                                    ];

                                    return (
                                        <div key={"div-" + value.equi_cd} style={{width: '100%'}}>
                                            <Blank key={"blank-" + value.equi_cd} type={EBlank.Row}/>
                                            <Post key={"post-" + value.equi_cd}
                                                  postData={params}
                                                  link={"/MEM101T1"}
                                                  onClick={() => {
                                                      setId(value.equi_cd)
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

export default MEM101_POST;