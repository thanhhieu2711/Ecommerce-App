export const InputSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
} as const;

export const InputSizeStyle = {
    [InputSize.SM]: 'py-2 pl-4 pr-2',
    [InputSize.MD]: 'py-4 pl-4 pr-3',
    [InputSize.LG]: 'py-4 pl-4 pr-3',
} as const;
