import cn from 'classnames';
import { Button } from '../Button';
// import usePagination from '@/hooks/apps/usePagination';
import { ReactNode } from 'react';
// import { ArrowLeftSLineIcon, ArrowRightSLineIcon } from '@/components/Icons';
import PaginationItem from './PaginationItem';
import usePagination from '@/hooks/app/usePagination';

type TPagination = {
    onPageChange: (param: number) => void;
    onNextButton: () => void;
    onPrevButton: () => void;
    totalPage: number;
    pageCurrent: number;
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
    pageCurrent,
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
        onPageCurrentChange,
        onNext,
        onPrev,
    } = usePagination({
        totalPage: totalPage,
        pageCurrent: pageCurrent,
    });

    return (
        <div className={cn('flex flex-row gap-3', containerClass)}>
            <Button
                disabled={isDisabledPrevBtn}
                className={cn('h-10 w-10', prevButtonProps?.className)}
                onClick={() => {
                    onPrev();
                    onPrevButton();
                }}
            >
                {prevButtonProps?.content ? (
                    prevButtonProps.content
                ) : (
                    // <ArrowLeftSLineIcon className="h-6 w-6" />
                    <></>
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
                                onPageCurrentChange(pageNumber);
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
                className={cn('h-10 w-10', nextButtonProps?.className)}
                onClick={() => {
                    onNext(), onNextButton();
                }}
            >
                {nextButtonProps?.content ? (
                    nextButtonProps.content
                ) : (
                    // <ArrowRightSLineIcon className="h-6 w-6" />
                    <></>
                )}
            </Button>
        </div>
    );
};

export default Pagination;
