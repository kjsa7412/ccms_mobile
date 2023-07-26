import './HeaderItems.css'
import {Link} from "react-router-dom";
import {Icons} from "../icons";
import {EIcon} from "@custom-enums/common-enum";
import {useRecoilState} from "recoil";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../atoms/menuAtom";

export const HeaderBlankSpace = () => {
  return <div className={"headerItems-container"}/>;
};

export const HeaderClose = ({closePath}: { closePath: string }) => {
  return (
    <Link className={"headerItems-close"} to={closePath}>
      <Icons iconType={EIcon.Close} fill={"black"} width={"20"} height={"20"}/>
    </Link>
  );
};

export const HeaderTitle = ({title}: { title: string }) => {
  return (
    <div className={"headerItems-titleContainer"}>
      <span>{title}</span>
    </div>
  );
};

export const HeaderMenu = () => {
  const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);

  const onClick = () => {
    if (rcMenu.isMenuOpened === true) {
      setRcMenu((prev) => ({
        ...prev,
        immediately: false,
        isMenuOpened: false,
        xPosition: -window.innerWidth - 5,
      }));
    } else {
      setRcMenu((prev) => ({
        ...prev,
        immediately: false,
        isMenuOpened: true,
        xPosition: 0,
      }));
    }
  };

  return (
    <div className={"headerItems-container"} onClick={onClick}>
      <Icons iconType={EIcon.Menu} fill={"black"} width={"20"} height={"20"}/>
    </div>
  );
};

export const HeaderSave = ({onClick}: any) => {
  return (
    <div className={"headerItems-saveContainer"} onClick={onClick}>
      <span>저장</span>
    </div>
  );
};

export const HeaderDelete = ({onClick}: any) => {
  return (
    <div className={"headerItems-deleteContainer"} onClick={onClick}>
      <span>삭제</span>
    </div>
  );
};

export const HeaderWrite = ({link}: any) => (
  <Link className={"headerItems-write"} to={link}>
    <Icons iconType={EIcon.Menu} fill={"black"} width={"20"} height={"20"}/>
  </Link>
);
