import {EModalMutationStatus} from "@custom-enums/common-enum";

export interface IModalAlert {
    isOpen: boolean;
    message: string;
}

export interface IModalMutation {
    modalMutationStatus: EModalMutationStatus;
    resultMutation: any;
    message: string;
}