import React, {useEffect} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderClose, HeaderTitle} from "../../../components/header/HeaderItems";
import {useRecoilState, useResetRecoilState} from "recoil";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../../atoms/menuAtom";
import {IMTS101} from "@custom-interfaces/MTS101/mts101-interface";
import {mts101Atom} from "../../../atoms/MTS101/mts101Atom";
import {FormProvider, useForm} from 'react-hook-form';
import {initData} from "./MTS101T1_FORM";
import {insertTROU, selectAtfi, selectMTS101T1, selectTSGBForSearch, selectTSMETHForSearch} from "./MTS101T1_API";
import {useMutation, useQuery} from 'react-query';
import ScreenLabel from "../../../components/label/ScreenLabel";
import LoadingPost from "../../../components/loading/LoadingPost";
import RowContents from "../../../components/contents/RowContents";
import {formattedDate, getHHMMSS, getYYYYMMDD} from "../../../utils/HandleDateFormat";
import Input from "../../../components/input/Input";
import {EBlank, EInput, EModalMutationStatus} from "@custom-enums/common-enum";
import InputContainer from "../../../components/containers/InputContainer";
import UpsertSubmitButton from "../../../components/button/UpsertSubmitButton";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import Blank from "../../../components/Blank";
import {modalAlertAtom} from "../../../atoms/modalAlertAtom";
import {IModalAlert, IModalMutation} from "@custom-interfaces/modal-interface";
import {modalMutationAtom} from "../../../atoms/modalMutationAtom";
import ImageListRow from "../../../components/imageList/ImageListRow";
import AttachFile from "../../../components/attachFile/AttachFile";
import {attachFileAtom} from "../../../atoms/attachFileAtom";
import {IAttachFile} from "@custom-interfaces/attachFile-interface";
import useAttachFileAtomAction from "../../../action/useAttachFileAtomAction";
import {EAttachFileAtomAction} from "@custom-enums/action-enum";

const MTS101T1 = () => {
    // data
    const [rcMenu,] = useRecoilState<IMenu>(menuAtom);
    const [rcMTS101,] = useRecoilState<IMTS101>(mts101Atom);
    const [, setRcModalAlert] = useRecoilState<IModalAlert>(modalAlertAtom);
    const [, setRcModalMutation] = useRecoilState<IModalMutation>(modalMutationAtom);

    const [rcAttachFile] = useRecoilState<IAttachFile>(attachFileAtom);
    const initUnUseSave = useAttachFileAtomAction(EAttachFileAtomAction.InitUnUseSave);


    // form
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: initData,
    });

    // query
    const resultQuery_selectMTS101T1 = useQuery(
        [EQueryKey.MTS101T1_selectMTS101T1],
        () => selectMTS101T1({id: rcMTS101.id})
    );

    const resultQuery_selectAtfi = useQuery(
        [EQueryKey.MTS101T1_selectAtfi],
        () => selectAtfi({atfi_id: rcMTS101.atfi_id})
    );

    const resultQuery_selectTSGBForSearch = useQuery(
        [EQueryKey.SEARCH_TSGB],
        selectTSGBForSearch,
    );

    const resultQuery_selectTSMETHForSearch = useQuery(
        [EQueryKey.SEARCH_TSMETH],
        selectTSMETHForSearch,
    );

    // mutation
    const resultMutation_insertTROU = useMutation(
        () => {
            const fd = new FormData();
            fd.append("id", rcMTS101.id);
            fd.append("trou_acto_stts_cd", methods.getValues("trou_acto_stts_cd"));
            // @ts-ignore
            fd.append("trou_gb_acto_cd", methods.getValues("trou_gb_acto_cd").value);
            // @ts-ignore
            fd.append("trou_acto_meth_cd", methods.getValues("trou_acto_meth_cd").value);
            fd.append("trou_acto_dd", getYYYYMMDD(methods.getValues("trou_acto_dd")));
            fd.append("trou_acto_hrti", getHHMMSS(methods.getValues("trou_acto_dd")));
            fd.append("trou_actr_nm", methods.getValues("trou_actr_nm"));
            fd.append("trou_acto_cont", methods.getValues("trou_acto_cont"));
            fd.append("recall_dt", !!methods.getValues("recall_dt") ? getYYYYMMDD(methods.getValues("recall_dt")) : "");
            fd.append("equi_cd",
                resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.p_equi_cd ?
                resultQuery_selectMTS101T1.data.data.Content[0].p_equi_cd : "");

            rcAttachFile.attachFile.forEach(function(item) {
                fd.append("file", item.imgFile);
            })

            return insertTROU(fd);
        },
        {
            onSuccess: (data, variables, context) => {
                if (data.data.IsError) {
                    setRcModalMutation(() => ({
                        resultMutation: resultMutation_insertTROU,
                        message: "등록",
                        modalMutationStatus: EModalMutationStatus.Error
                    }));
                } else {
                    setRcModalMutation(() => ({
                        resultMutation: resultMutation_insertTROU,
                        message: "등록",
                        modalMutationStatus: EModalMutationStatus.Success
                    }));
                }
            },
            onError: (error, variables, context) => {
                setRcModalMutation(() => ({
                    resultMutation: resultMutation_insertTROU,
                    message: "등록",
                    modalMutationStatus: EModalMutationStatus.Error
                }));
            },
        },
    )

    // validation
    const handleFunction = () => {
        let validation = true;

        const data = methods.getValues();

        if (!data.trou_gb_acto_cd) {
            setRcModalAlert((prev) => ({isOpen: true, message: '장애구분을 선택해주세요.'}));
            return;
        }

        if (!data.trou_acto_meth_cd) {
            setRcModalAlert((prev) => ({isOpen: true, message: '처리방법을 선택해주세요.'}));
            return;
        }

        if (!data.trou_acto_dd) {
            setRcModalAlert((prev) => ({isOpen: true, message: '처리일자를 선택해주세요.'}));
            return;
        }


        if (!data.trou_acto_hrti) {
        }


        if (!data.trou_actr_nm) {
            setRcModalAlert((prev) => ({isOpen: true, message: '처리자를 작성해주세요.'}));
            return;
        }


        if (!data.trou_acto_cont) {
            setRcModalAlert((prev) => ({isOpen: true, message: '처리내용을 작성해주세요.'}));
            return;
        }

        if (validation) {
            setRcModalMutation(() => ({
                resultMutation: resultMutation_insertTROU,
                message: "등록",
                modalMutationStatus: EModalMutationStatus.Confirm
            }));
        }
    };

    useEffect(() => {
        initUnUseSave();
        return () => {
        };
    }, []);

    return (
        <ScreenContainer>
            <PageTitle title={'MTS101T1'}/>
            <HeaderBase left={[<HeaderClose closePath={!!rcMenu.childMenu?.link ? rcMenu.childMenu.link : '/'}/>]}
                        center={[<HeaderTitle title={'장애처리'}/>]}/>
            <FormProvider {...methods}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'normal',
                    alignItems: 'center',
                    width: '100%',
                    paddingRight: '1em',
                    paddingLeft: '1em',
                    paddingTop: '70px'
                }} onSubmit={methods.handleSubmit(handleFunction)}>
                    <ScreenLabel title={'장애내역'}/>
                    {
                        resultQuery_selectMTS101T1.status !== 'success' ||
                        resultQuery_selectMTS101T1.isFetching === true ||
                        resultQuery_selectAtfi.status !== 'success' ||
                        resultQuery_selectAtfi.isFetching === true ?
                            <LoadingPost pHeight={325}/> :
                            <>
                                <RowContents title={"장애관리번호"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.trou_mngr_dd_no}/>
                                <RowContents title={"장애구분"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.trou_gb_cotr_nm}/>
                                <RowContents title={"장비코드"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.equi_cd}/>
                                <RowContents title={"장비명"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.equi_nm}/>
                                <RowContents title={"장애날짜"}
                                             contents={formattedDate(resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.trou_dd_hrti)}/>
                                <RowContents title={"날씨"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.weth_nm}/>
                                <RowContents title={"관제사"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.coer_nm}/>
                                <RowContents title={"관제사부서"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.coer_dept_nm}/>
                                <RowContents title={"장애내용"}
                                             contents={resultQuery_selectMTS101T1.data?.data?.Content?.[0]?.trou_cont}/>
                                <ImageListRow atfi={resultQuery_selectAtfi.data.data.Content}/>
                            </>
                    }
                    <Blank type={EBlank.Row}/>
                    <ScreenLabel title={'장애처리'}/>
                    <InputContainer>
                        <Input
                            type={EInput.Database}
                            title={'장애구분'}
                            required={true}
                            name={'trou_gb_acto_cd'}
                            isHalf={true}
                            optionData={
                                !!resultQuery_selectTSGBForSearch.data?.data?.Content ?
                                    resultQuery_selectTSGBForSearch.data?.data?.Content : []}
                            isLoading={
                                resultQuery_selectTSGBForSearch.status !== 'success' ||
                                resultQuery_selectTSGBForSearch.isFetching === true
                            }
                        />
                        <Input
                            type={EInput.Database}
                            title={'처리방법'}
                            required={true}
                            name={'trou_acto_meth_cd'}
                            isHalf={true}
                            optionData={
                                !!resultQuery_selectTSMETHForSearch.data?.data?.Content ?
                                    resultQuery_selectTSMETHForSearch.data?.data?.Content : []}
                            isLoading={
                                resultQuery_selectTSMETHForSearch.status !== 'success' ||
                                resultQuery_selectTSMETHForSearch.isFetching === true
                            }
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            type={EInput.Calendar}
                            title={'처리일자'}
                            required={true}
                            name={'trou_acto_dd'}
                            isHalf={true}
                            showTimeSelect={true}
                        />
                        <Input
                            type={EInput.Calendar}
                            title={'회수날짜'}
                            required={false}
                            name={'recall_dt'}
                            isHalf={true}
                        />
                    </InputContainer>
                    <Input
                        type={EInput.TextareaMini}
                        title={'처리자'}
                        required={true}
                        name={'trou_actr_nm'}
                    />
                    <Input
                        type={EInput.Textarea}
                        title={'처리내용'}
                        required={true}
                        name={'trou_acto_cont'}
                    />
                    <Blank type={EBlank.Row}/>
                    <ScreenLabel title={'첨부파일'}/>
                    <AttachFile/>
                    <UpsertSubmitButton
                        value={'등록'}
                        isLoading={resultMutation_insertTROU.isLoading}
                        disabled={
                            resultQuery_selectMTS101T1.status !== 'idle'
                                ? resultQuery_selectMTS101T1.status !== 'success' ||
                                resultQuery_selectMTS101T1.isFetching === true
                                : false
                        }
                    />
                </form>
            </FormProvider>
        </ScreenContainer>
    )
}

export default MTS101T1;