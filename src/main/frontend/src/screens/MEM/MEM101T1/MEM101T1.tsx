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
        () => selectMEM101T1({id: rcMEM101.id})
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
                        <LoadingPost pHeight={225}/> :
                        <>
                            <RowContents title={"장비코드"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_cd}/>
                            <RowContents title={"장비명"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.equi_nm}/>
                            <RowContents title={"제조사"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.manu_comp}/>
                            <RowContents title={"설치주소"}
                                         contents={resultQuery_selectMEM101T1.data?.data?.Content?.[0]?.inst_addr}/>
                        </>
                }
            </BaseContainer>
        </ScreenContainer>
    )
}

export default MEM101T1;

