export const enum EJWT {
    ExpiryTime = 60 * 60 * 1000,
    ExpiryTimeForTest = 1 * 60 * 1000
}

export const enum EIcon {
    Close = "Close",
    SignOut = "SignOut",
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    MTS = "MTS",
    MEM = "MEM",
    Menu = "Menu"
}

export const enum EBlank {
    Header = 'Header',
    Column = 'Column',
    Row = 'Row',
    Tab = 'Tab',
    Bottom = 'Bottom',
}

export const enum EInput {
    Undefined = 'Undefined',
    Database = 'Database',
    Calendar = 'Calendar',
    Checkbox = 'Checkbox',
    Textarea = 'Textarea',
    TextareaMini = 'TextareaMini',
    Radiobox = 'Radiobox',
    Loading = 'Loading',
    LoadingTextarea = 'LoadingTextarea',
}

export const enum EModalMutationStatus {
    Close = 'Close',
    Confirm = 'Confirm',
    Progress = 'Progress',
    Success = 'Success',
    Error = 'Error',
}