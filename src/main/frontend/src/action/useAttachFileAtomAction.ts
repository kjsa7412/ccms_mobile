import {EAttachFileAtomAction} from "@custom-enums/action-enum";
import {useRecoilState} from "recoil";
import {IAttachFile} from "@custom-interfaces/attachFile-interface";
import {attachFileAtom} from "../atoms/attachFileAtom";

export function useAttachFileAtomAction(actionName: EAttachFileAtomAction) {
    const [rcAttachFile, setRcAttachFile] = useRecoilState<IAttachFile>(attachFileAtom);

    const initAction = () => {
        if (actionName == EAttachFileAtomAction.InitUseSave) {
            setRcAttachFile((prev) => ({
                attachFile: [],
                deleteFile: [],
                savedFile: null,
                isLoadingSavedFile: true,
                useSavedFile: true
            }));
        } else if (actionName == EAttachFileAtomAction.InitUnUseSave) {
            setRcAttachFile((prev) => ({
                attachFile: [],
                deleteFile: [],
                savedFile: null,
                isLoadingSavedFile: true,
                useSavedFile: false
            }));
        }
    };

    return initAction;
}

export default useAttachFileAtomAction;