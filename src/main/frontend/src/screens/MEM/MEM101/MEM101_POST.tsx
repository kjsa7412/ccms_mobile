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

    // function
    const setAreaId = (vms_no: string) => {
        setRcMEM101((prev) => ({...prev, vms_no: vms_no}));
    }

    const getTotalCount = () => {
        let totalCount = 0;
        let areaNm = rcSearch.areaNm;

        const inputData = selectQuery.data.data.Content;

        for (let data of inputData) {
            let isMatch1 = !!areaNm?.value ? areaNm.value === data.vms_no : true;

            if (isMatch1) {
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
                                    let areaNm = rcSearch.areaNm;
                                    let isMatch1 = !!areaNm?.value ? areaNm.value === value.vms_no : true;
                                    return isMatch1;
                                })
                                .map((value: any, index: number) => {
                                    if (postMax < index) {
                                        return null;
                                    }

                                    const params = [
                                        {
                                            title: 'MainTitle',
                                            contents: value.area_nm,
                                        },
                                        {
                                            title: '관리번호',
                                            contents: value.area_id,
                                        },
                                        {
                                            title: '장비정보',
                                            contents: value.manu_info,
                                        },
                                        {
                                            title: '설치주소',
                                            contents: value.inst_addr_road,
                                        },
                                    ];

                                    return (
                                        <div key={"div-" + value.area_id} style={{width: '100%'}}>
                                            <Blank key={"blank-" + value.area_id} type={EBlank.Row}/>
                                            <Post key={"post-" + value.area_id}
                                                  postData={params}
                                                  link={"/MEM101T1"}
                                                  onClick={() => {
                                                      setAreaId(value.vms_no)
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