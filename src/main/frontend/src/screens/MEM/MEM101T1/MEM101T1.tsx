import React from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderClose, HeaderTitle} from "../../../components/header/HeaderItems";
import {useRecoilState} from "recoil";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../../atoms/menuAtom";
import {IMEM101} from "@custom-interfaces/MEM101/mem101-interface";
import {mem101Atom} from "../../../atoms/MEM101/mem101Atom";
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import {selectMEM101T1} from "./MEM101T1_API";
import ScreenLabel from "../../../components/label/ScreenLabel";
import BaseContainer from "../../../components/containers/BaseContainer";
import LoadingPost from "../../../components/loading/LoadingPost";
import RowContents from "../../../components/contents/RowContents";

const MEM101T1 = () => {
    // data
    const [rcMenu,] = useRecoilState<IMenu>(menuAtom);
    const [rcMEM101,] = useRecoilState<IMEM101>(mem101Atom);

    // query
    const resultQuery_selectMEM101T1 = useQuery(
        [EQueryKey.MEM101_selectMEM101T1],
        () => selectMEM101T1({vms_no: rcMEM101.vms_no})
    );

    return (
        <ScreenContainer>
            <PageTitle title={'MEM101T1'}/>
            <HeaderBase left={[<HeaderClose closePath={!!rcMenu.childMenu?.link ? rcMenu.childMenu.link : '/'}/>]}
                        center={[<HeaderTitle title={'장비정보'}/>]}/>
            <BaseContainer>
                <ScreenLabel title={'장비정보'}/>
                {
                    resultQuery_selectMEM101T1.status !== 'success' ||
                    resultQuery_selectMEM101T1.isFetching === true ?
                        <LoadingPost pHeight={25 * 28}/> :
                        <>
                            <RowContents title={"장비명"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.area_nm}/>
                            <RowContents title={"관리번호"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.area_id}/>
                            <RowContents title={"설치목적"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.purpose}/>
                            <RowContents title={"설치목적상세"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.purpose_detail}/>
                            <RowContents title={"설치일자"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.inst_dt}/>
                            <RowContents title={"장비IP"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_ip}/>
                            <RowContents title={"촬영시간"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.rec_time}/>

                            <ScreenLabel title={'위치정보'}/>

                            <RowContents title={"경도"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.lati}/>
                            <RowContents title={"위도"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.logi}/>
                            <RowContents title={"행정동"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.mgmt_town}/>
                            <RowContents title={"주민센터"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.town_center}/>
                            <RowContents title={"설치장소"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.inst_location}/>
                            <RowContents title={"설치주소(도로명)"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.inst_addr_road}/>
                            <RowContents title={"설치주소(지번)"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.inst_addr_lot}/>
                            <RowContents title={"위경도주소(도로명)"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.lati_logi_addr_road}/>
                            <RowContents title={"위경도주소(지번)"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.lati_logi_addr_lot}/>

                            <ScreenLabel title={'물리장비정보'}/>

                            <RowContents title={"물리장비명"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_nm}/>
                            <RowContents title={"물리장비코드"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_cd}/>
                            <RowContents title={"제조사"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.manu_comp}/>
                            <RowContents title={"모델명"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.model_nm}/>
                            <RowContents title={"시리얼번호"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.seri_no}/>
                            <RowContents title={"카메라유형"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.cam_type}/>
                            <RowContents title={"장비코드"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_cd}/>
                            <RowContents title={"VURIX"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.vurix}/>
                            <RowContents title={"감시거리"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.mon_dist}/>
                            <RowContents title={"감시각"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.view_angle}/>
                            <RowContents title={"카메라화소"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.cam_pixel}/>
                            <RowContents title={"비고"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.remark}/>
                        </>
                }
            </BaseContainer>
        </ScreenContainer>
    )
}

export default MEM101T1;

