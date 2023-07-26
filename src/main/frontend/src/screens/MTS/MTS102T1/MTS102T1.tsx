import React, {useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderClose, HeaderDelete, HeaderTitle} from "../../../components/header/HeaderItems";
import {useRecoilState} from "recoil";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../../atoms/menuAtom";
import {useNavigate} from "react-router-dom";
import {IModalAlert} from "@custom-interfaces/common-interface";
import {EInput, EModalMutationStatus} from "@custom-enums/common-enum";
import {mts102Atom} from "../../../atoms/MTS102/mts102Atom";
import {IMTS102} from "@custom-interfaces/MTS102/mts102-interface";
import {FormProvider, useForm} from "react-hook-form";
import {initData} from "../MTS102T1/MTS102T1_FORM";
import {useMutation, useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import {deleteTROU, selectMTS102T1, updateTROU, selectTSGBForSearch, selectTSMETHForSearch} from "./MTS102T1_API";
import ModalAlert from "../../../components/modal/ModalAlert";
import ModalMutation from "../../../components/modal/ModalMutation";
import ScreenLabel from "../../../components/label/ScreenLabel";
import LoadingPost from "../../../components/loading/LoadingPost";
import RowContents from "../../../components/contents/RowContents";
import {formattedDate, parseDateStringToDate} from "../../../utils/HandleDateFormat";
import InputContainer from "../../../components/containers/InputContainer";
import Input from "../../../components/input/Input";
import UpsertSubmitButton from "../../../components/button/UpsertSubmitButton";

const MTS102T1 = () => {
    // data
    const navigate = useNavigate();
    const [rcMenu,] = useRecoilState<IMenu>(menuAtom);
    const [rcMTS102,] = useRecoilState<IMTS102>(mts102Atom);
    const [modalAlert, setModalAlert] = useState<IModalAlert>({isOpen: false, message: ""});
    const [modalMutationStatus, setModalMutationStatus] = useState<EModalMutationStatus>(
        EModalMutationStatus.Close,
    );
    const [modalDeleteMutationStatus, setModalDeleteMutationStatus] = useState<EModalMutationStatus>(
        EModalMutationStatus.Close,
    );

    // form
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: initData,
    });

    // query
    const resultQuery_selectMTS102T1 = useQuery(
        [EQueryKey.MTS102T1_selectMTS102T1],
        () => selectMTS102T1({id: rcMTS102.id}),
        {
            onSuccess: (data) => {
                let inputData = data?.data?.Content[0];

                methods.setValue("trou_acto_stts_cd", inputData.trou_acto_stts_cd);
                methods.setValue("trou_gb_acto_cd", {
                    value: inputData.trou_gb_acto_cd,
                    label: inputData.trou_gb_acto_nm
                });
                methods.setValue("trou_acto_meth_cd", {
                    value: inputData.trou_acto_meth_cd,
                    label: inputData.trou_acto_meth_nm
                });
                methods.setValue("trou_acto_dd", parseDateStringToDate(inputData.trou_acto_dd + inputData.trou_acto_hrti));
                methods.setValue("trou_actr_nm", inputData.trou_actr_nm);
                methods.setValue("trou_acto_cont", inputData.trou_acto_cont);
            }
        }
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
    const resultMutation_updateTROU = useMutation(
        () => updateTROU({id: rcMTS102.id, ...methods.getValues()}),
        {
            onSuccess: (data, variables, context) => {
                if (data.data.IsError) {
                    setModalMutationStatus(EModalMutationStatus.Error);
                } else {
                    setModalMutationStatus(EModalMutationStatus.Success);
                }
            },
            onError: (error, variables, context) => {
                setModalMutationStatus(EModalMutationStatus.Error);
            },
        },
    )

    const resultMutation_deleteTROU = useMutation(
        () => deleteTROU({id: rcMTS102.id}),
        {
            onSuccess: (data, variables, context) => {
                if (data.data.IsError) {
                    setModalDeleteMutationStatus(EModalMutationStatus.Error);
                } else {
                    setModalDeleteMutationStatus(EModalMutationStatus.Success);
                }
            },
            onError: (error, variables, context) => {
                setModalDeleteMutationStatus(EModalMutationStatus.Error);
            },
        },
    )

    // validation
    const handleFunction = () => {
        let validation = true;

        const data = methods.getValues();

        if (!data.trou_gb_acto_cd) {
            validation = false;
            setModalAlert({isOpen: true, message: '장애구분을 선택해주세요.'});
            return;
        }

        if (!data.trou_acto_meth_cd) {
            validation = false;
            setModalAlert({isOpen: true, message: '처리방법을 선택해주세요.'});
            return;
        }

        if (!data.trou_acto_dd) {
            validation = false;
            setModalAlert({isOpen: true, message: '처리일자를 선택해주세요.'});
            return;
        }


        if (!data.trou_acto_hrti) {
        }


        if (!data.trou_actr_nm) {
            validation = false;
            setModalAlert({isOpen: true, message: '처리자를 작성해주세요.'});
            return;
        }


        if (!data.trou_acto_cont) {
            validation = false;
            setModalAlert({isOpen: true, message: '처리내용을 작성해주세요.'});
            return;
        }

        if (validation) {
            setModalMutationStatus(EModalMutationStatus.Confirm);
        }
    };

    return (
        <ScreenContainer>
            <PageTitle title={'MTS102T1'}/>
            <ModalAlert modalIsOpen={modalAlert.isOpen}
                        funcCloseModal={setModalAlert}
                        message={modalAlert.message}/>
            <ModalMutation
                modalMutationStatus={modalMutationStatus}
                setModalMutationStatus={setModalMutationStatus}
                resultMutation={resultMutation_updateTROU}
                successFunction={() => {
                    !!rcMenu.childMenu?.link ? navigate(rcMenu.childMenu.link) : navigate('/');
                }}/>
            <ModalMutation
                modalMutationStatus={modalDeleteMutationStatus}
                setModalMutationStatus={setModalDeleteMutationStatus}
                resultMutation={resultMutation_deleteTROU}
                successFunction={() => {
                    !!rcMenu.childMenu?.link ? navigate(rcMenu.childMenu.link) : navigate('/');
                }}/>
            <HeaderBase left={[<HeaderClose closePath={!!rcMenu.childMenu?.link ? rcMenu.childMenu.link : '/'}/>]}
                        center={[<HeaderTitle title={'장애처리'}/>]}
                        right={[<HeaderDelete
                            onClick={() => setModalDeleteMutationStatus(EModalMutationStatus.Confirm)}/>]}
            />
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
                        resultQuery_selectMTS102T1.status !== 'success' ||
                        resultQuery_selectMTS102T1.isFetching === true ?
                            <LoadingPost pHeight={225}/> :
                            <>
                                <RowContents title={"장애관리번호"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.trou_mngr_dd_no}/>
                                <RowContents title={"장애구분"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.trou_gb_cotr_nm}/>
                                <RowContents title={"장비코드"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.equi_cd}/>
                                <RowContents title={"장비명"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.equi_nm}/>
                                <RowContents title={"장애날짜"}
                                             contents={formattedDate(resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.trou_dd_hrti)}/>
                                <RowContents title={"날씨"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.weth_nm}/>
                                <RowContents title={"관제사"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.coer_nm}/>
                                <RowContents title={"관제사부서"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.coer_dept_nm}/>
                                <RowContents title={"장애내용"}
                                             contents={resultQuery_selectMTS102T1.data?.data?.Content?.[0]?.trou_cont}/>
                            </>
                    }
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
                                resultQuery_selectTSGBForSearch.isFetching === true ||
                                resultQuery_selectMTS102T1.status !== 'success' ||
                                resultQuery_selectMTS102T1.isFetching === true
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
                                resultQuery_selectTSGBForSearch.status !== 'success' ||
                                resultQuery_selectTSGBForSearch.isFetching === true ||
                                resultQuery_selectMTS102T1.status !== 'success' ||
                                resultQuery_selectMTS102T1.isFetching === true
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
                            isLoading={
                                resultQuery_selectMTS102T1.status !== 'success' ||
                                resultQuery_selectMTS102T1.isFetching === true
                            }
                        />
                        <Input
                            type={EInput.TextareaMini}
                            title={'처리자'}
                            required={true}
                            name={'trou_actr_nm'}
                            isHalf={true}
                            isLoading={
                                resultQuery_selectMTS102T1.status !== 'success' ||
                                resultQuery_selectMTS102T1.isFetching === true
                            }
                        />
                    </InputContainer>
                    <Input
                        type={EInput.Textarea}
                        title={'처리내용'}
                        required={true}
                        name={'trou_acto_cont'}
                        isLoading={
                            resultQuery_selectMTS102T1.status !== 'success' ||
                            resultQuery_selectMTS102T1.isFetching === true
                        }
                    />
                    <UpsertSubmitButton
                        value={'등록'}
                        isLoading={resultMutation_updateTROU.isLoading}
                        disabled={
                            resultQuery_selectMTS102T1.status !== 'idle'
                                ? resultQuery_selectMTS102T1.status !== 'success' ||
                                resultQuery_selectMTS102T1.isFetching === true
                                : false
                        }
                    />
                </form>
            </FormProvider>
        </ScreenContainer>
    )
}

export default MTS102T1;

