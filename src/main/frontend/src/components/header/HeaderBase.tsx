import {HeaderBlankSpace} from "./HeaderItems";
import './HeaderBase.css'

interface Props {
    left?: Array<JSX.Element | JSX.Element[]>;
    center?: Array<JSX.Element | JSX.Element[]>;
    right?: Array<JSX.Element | JSX.Element[]>;
    isBackground?: boolean;
}

const HeaderBase = ({left = [], center = [], right = [], isBackground = true}: Props) => {
    return (
        <div className={`headerBase-baseContainer ${!isBackground && 'headerBase-noneBackground'}`}>
            <div className={"headerBase-leftContainer"}>
                {!!left?.length ? (
                    left.map((value, index) =>
                        <div className={`headerBase-itemContainer ${!isBackground && 'headerBase-noneBackground'}`}
                             key={index}>{value}</div>)
                ) : (
                    <HeaderBlankSpace/>
                )}
            </div>
            <div className={"headerBase-centerContainer"}>
                {!!center?.length &&
                    center.map((value, index) =>
                        <div className={`headerBase-itemContainer ${!isBackground && 'headerBase-noneBackground'}`}
                             key={index}>{value}</div>)
                }
            </div>
            <div className={"headerBase-rightContainer"}>
                {!!right?.length ? (
                    right.map((value, index) =>
                        <div className={`headerBase-itemContainer ${!isBackground && 'headerBase-noneBackground'}`}
                             key={index}>{value}</div>)
                ) : (
                    <HeaderBlankSpace/>
                )}
            </div>
        </div>
    );
};

export default HeaderBase;