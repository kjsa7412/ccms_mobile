import {Controller, useFormContext} from 'react-hook-form';
import {ISearchData} from "@custom-interfaces/search-interface";
import {EInput} from "@custom-enums/common-enum";
import React from "react";
import './Input.css';
import LoadingBox from "../loading/LoadingBox";
import LoadingPost from "../loading/LoadingPost";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';

type Props = {
    isHalf?: boolean;
    name: string;
    type: EInput;
    title?: string;
    disabled?: boolean;
    required?: boolean;
    radioData?: Array<string>;
    checkboxData?: Array<string>;
    optionData?: Array<ISearchData>;
    isLoading?: boolean;
}

const Input = ({
                   isHalf = false,
                   name = '',
                   type = EInput.Undefined,
                   title = '',
                   disabled = false,
                   required = false,
                   radioData = [],
                   checkboxData = [],
                   optionData = [],
                   isLoading = false,
               }: Props) => {
    const {control} = useFormContext();

    const placeholderComponent = (
        <div>
            <span style={{color: 'gray', fontSize: 8}}>{title}</span>
        </div>
    );

    const customStyles = {
        control: (provided: any) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            width: '100%',
            fontSize: 13,
            borderRadius: 5
        }),
        input: (provided: any) => ({
            ...provided,
        }),
        option: (provided: any) => ({
            ...provided,
            fontSize: 13,
            lineHeight: 0.9
        }),
    };

    return (
        <div className={"input-baseContainer"} style={{width: isHalf ? '50%' : '100%'}}>
            {
                !!title &&
                <div className={"input-title"}>
                    <span>{title}</span>
                    {
                        !!required && <span style={{color: "red", marginLeft: "5px"}}> * </span>
                    }
                </div>
            }

            {type === EInput.Loading && <LoadingBox isLong={true}/>}
            {isLoading && type === EInput.Database && <LoadingBox isLong={true}/>}
            {isLoading && type === EInput.Calendar && <LoadingBox isLong={true}/>}
            {isLoading && type === EInput.Checkbox && <LoadingBox isLong={true}/>}
            {isLoading && type === EInput.Textarea && <LoadingPost pHeight={100}/>}
            {isLoading && type === EInput.TextareaMini && <LoadingBox isLong={true}/>}

            {!isLoading && type === EInput.Database && (
                <Controller
                    control={control}
                    name={'' + name}
                    render={({field}) => (
                        <Select
                            placeholder={placeholderComponent}
                            isClearable={true}
                            options={optionData}
                            styles={customStyles}
                            {...field}
                        />
                    )}
                />
            )}

            {!isLoading && type === EInput.Calendar && (
                <Controller
                    control={control}
                    name={'' + name}
                    render={({field}) => (
                        <DatePicker
                            className={"input-datePicker"}
                            selected={field.value}
                            locale={ko}
                            showTimeSelect // 시간 선택 기능 활성화
                            dateFormat="yyyy-MM-dd HH:mm" // 날짜와 시간 형식 설정
                            timeFormat="HH:mm" // 시간 형식 설정
                            timeIntervals={30} // 시간 간격 설정 (예: 15분 단위)
                            timeCaption="Time" // 시간 선택 레이블
                            closeOnScroll={true}
                            placeholderText={'점검일자'}
                            {...field}
                        />
                    )}
                />
            )}

            {!isLoading && type === EInput.Checkbox && (
                <div className={"input-checkboxContainer"}>
                    {!!checkboxData?.length &&
                        checkboxData.map((item, index) => (
                            <Controller
                                key={item}
                                control={control}
                                name={'' + name + '_' + index}
                                render={({field}) => (
                                    <div className={"input-checkboxContainer-inner"}>
                                        <label className={"input-checkboxLabel"} htmlFor={item}>{item}</label>
                                        <input className={"input-checkbox"} id={item} type="checkbox"
                                               checked={field.value} {...field} />
                                    </div>
                                )}
                            />
                        ))}
                </div>
            )}

            {!isLoading && type === EInput.Textarea && (
                <Controller
                    control={control}
                    name={'' + name}
                    render={({field}) => (
                        <textarea className={"input-textarea"} style={{height: "100px"}}
                                  placeholder={title} {...field} disabled={disabled}/>
                    )}
                />
            )}

            {!isLoading && type === EInput.TextareaMini && (
                <Controller
                    control={control}
                    name={'' + name}
                    render={({field}) => (
                        <textarea className={"input-textareaMini"}
                                  placeholder={title} {...field} disabled={disabled}/>
                    )}
                />
            )}

            {!isLoading && type === EInput.Radiobox && (
                <div className={"input-radioContainer"}>
                    <div className={"input-radioHeaderConatainer"}>
                        <div className={"input-radioHeaderItem"}>미점검</div>
                        <div className={"input-radioHeaderItem"}>불량</div>
                        <div className={"input-radioHeaderItem"}>정비필요</div>
                        <div className={"input-radioHeaderItem"}>양호</div>
                    </div>
                    {!!radioData?.length &&
                        radioData.map((item, index) => (
                            <div className={"input-radioContentsContainer"} key={item}>
                                <div className={"input-radioContentsLabel"}>{item}</div>
                                <Controller
                                    control={control}
                                    name={'' + name + '_' + index}
                                    render={({field}) => (
                                        <>
                                            <div className={"input-radio"}>
                                                <input
                                                    name={field.name}
                                                    value="0"
                                                    type="radio"
                                                    checked={field.value === '0'}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className={"input-radio"}>
                                                <input
                                                    name={field.name}
                                                    value="1"
                                                    type="radio"
                                                    checked={field.value === '1'}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className={"input-radio"}>
                                                <input
                                                    name={field.name}
                                                    value="2"
                                                    type="radio"
                                                    checked={field.value === '2'}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className={"input-radio"}>
                                                <input
                                                    name={field.name}
                                                    value="3"
                                                    type="radio"
                                                    checked={field.value === '3'}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default Input;