import { TArticleInfo } from '@/types/general';
import { formatDate } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Article from './Article';

type Props = {
    articles: TArticleInfo[];
};

const ArticleSection = ({ articles }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            <p className="uppercase font-bold text-lg xl:text-2xl">
                tin tức công nghệ
            </p>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
                {articles?.map((i) => (
                    <Article key={i.id} article={i} />
                ))}
            </div>
        </div>
    );
};

export default ArticleSection;
