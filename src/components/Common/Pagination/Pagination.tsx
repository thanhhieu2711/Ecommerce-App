import cn from 'classnames';
import { Button } from '../Button';
// import usePagination from '@/hooks/apps/usePagination';
import { ReactNode } from 'react';
// import { ArrowLeftSLineIcon, ArrowRightSLineIcon } from '@/components/Icons';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import PaginationItem from './PaginationItem';
import usePagination from '@/hooks/app/usePagination';

type TPagination = {
    onPageChange: (param: number) => void;
    onNextButton: () => void;
    onPrevButton: () => void;
    totalPage: number;
    currentPage: number;
    containerClass?: string;
    pageItemClass?: string;
    prevButtonProps?: {
        className?: string;
        content?: ReactNode | string;
    };
    nextButtonProps?: {
        className?: string;
        content?: ReactNode | string;
    };
};

const Pagination = ({
    totalPage,
    currentPage,
    prevButtonProps,
    nextButtonProps,
    pageItemClass,
    containerClass,
    onPageChange,
    onNextButton,
    onPrevButton,
}: TPagination) => {
    const {
        listPageNumber,
        activePage,
        isDisabledNextBtn,
        isDisabledPrevBtn,
        onCurrentPageChange,
        // onNext,
        // onPrev,
    } = usePagination({
        totalPage,
        currentPage,
    });

    return (
        <div className={cn('flex flex-row gap-3', containerClass)}>
            <Button
                disabled={isDisabledPrevBtn}
                className={cn(
                    'h-10 w-10 hover:bg-primary/20 hover:!border-transparent',
                    isDisabledPrevBtn && '!border !border-black/20',
                    nextButtonProps?.className
                )}
                theme="white"
                variant="outline"
                onClick={() => {
                    onPrevButton();
                }}
            >
                {nextButtonProps?.content ? (
                    nextButtonProps.content
                ) : (
                    <BiArrowToLeft
                        className={cn(
                            '!w-4 !h-4 m-auto',
                            isDisabledPrevBtn && 'text-black/50 '
                        )}
                    />
                )}
            </Button>
            {listPageNumber.map((pageNumber, index) => {
                const isActive = activePage === pageNumber;
                if (pageNumber !== 0 && pageNumber !== undefined) {
                    return (
                        <PaginationItem
                            key={index}
                            className={pageItemClass}
                            isActive={isActive}
                            onClick={() => {
                                onCurrentPageChange(pageNumber);
                                onPageChange(pageNumber);
                            }}
                            value={pageNumber}
                        />
                    );
                }
                if (pageNumber === 0) {
                    return (
                        <div
                            key={index}
                            className="flex h-10 w-10 flex-row items-center justify-center"
                        >
                            <span>...</span>
                        </div>
                    );
                }
            })}
            <Button
                disabled={isDisabledNextBtn}
                className={cn(
                    'h-10 w-10 hover:bg-primary/20 hover:!border-transparent',
                    isDisabledNextBtn && '!border !border-black/20',
                    nextButtonProps?.className
                )}
                theme="white"
                variant="outline"
                onClick={() => {
                    onNextButton();
                }}
            >
                {nextButtonProps?.content ? (
                    nextButtonProps.content
                ) : (
                    <BiArrowToRight
                        className={cn(
                            '!w-4 !h-4 m-auto ',
                            isDisabledNextBtn && 'text-black/50'
                        )}
                    />
                )}
            </Button>
        </div>
    );
};

export default Pagination;
