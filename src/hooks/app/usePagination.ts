// import { DEFAULT_PAGE_LIMIT } from '@/utils/constants/flight';
import { useEffect, useMemo, useState } from 'react';

type Props = {
    totalPage: number;
    currentPage: number;
    pageLimit?: number;
};

const usePagination = ({ totalPage, currentPage, pageLimit = 10 }: Props) => {
    const [activePage, setActivePage] = useState(currentPage);

    useEffect(() => {
        setActivePage(currentPage);
    }, [currentPage]);

    const firstPageValue = 1;

    const lastPageValue = totalPage;

    const minPageRangeValue = 2;

    const maxPageRangeValue = 5;

    const siblingLeft = activePage - 1;

    const siblingRight = activePage + 1;

    const leftPageRange = firstPageValue + maxPageRangeValue;

    const rightPageRange = lastPageValue - maxPageRangeValue;

    const isDisabledPrevBtn = activePage === firstPageValue;

    const isDisabledNextBtn = activePage === lastPageValue;

    const onPrev = () => {
        setActivePage((prev) => prev - 1);
    };

    const onNext = () => {
        setActivePage((prev) => prev + 1);
    };

    const onCurrentPageChange = (pageNumber: number) => {
        if (activePage !== pageNumber) {
            return setActivePage(pageNumber);
        }
    };

    const renderPaginationItem = (pageItem: number) => {
        const isActive = pageItem === activePage;

        const isShowLeftDots =
            pageItem === siblingLeft - 1 ||
            (pageItem === lastPageValue - maxPageRangeValue &&
                activePage > lastPageValue - maxPageRangeValue);

        const isShowRightDots =
            pageItem === siblingRight + 1 ||
            (pageItem === maxPageRangeValue + 1 &&
                activePage < maxPageRangeValue);

        const isShowSibling =
            pageItem === siblingLeft || pageItem === siblingRight;

        const isShowMaxPageRange =
            (pageItem < leftPageRange && activePage < leftPageRange) ||
            (pageItem > rightPageRange && activePage > rightPageRange);

        const isShowMinPageRange =
            pageItem <= minPageRangeValue ||
            pageItem > lastPageValue - minPageRangeValue;

        if (
            totalPage < pageLimit ||
            isShowSibling ||
            isActive ||
            isShowMaxPageRange ||
            isShowMinPageRange
        ) {
            return pageItem;
        }
        if (isShowLeftDots || isShowRightDots) {
            return 0;
        }
    };

    const listPageNumber = useMemo(() => {
        const pageRange = Array.from({ length: totalPage }, (_, index) => {
            return index + 1;
        });
        return pageRange.map((pageItem, index) => {
            return renderPaginationItem(pageItem);
        });
    }, [totalPage, activePage]);

    return {
        onPrev,
        onNext,
        onCurrentPageChange,
        isDisabledNextBtn,
        isDisabledPrevBtn,
        activePage,
        listPageNumber,
    };
};

export default usePagination;
