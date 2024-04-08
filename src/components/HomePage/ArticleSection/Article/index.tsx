import { TArticleInfo } from '@/types/general';
import { formatDate } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    article: TArticleInfo;
};

const Article = ({ article }: Props) => {
    return (
        <Link
            href={`/articles/${article.id}`}
            key={article.id}
            className="col-span-1 flex flex-col p-3 bg-white shadow-product-card rounded-xl gap-2 cursor-pointer group"
        >
            <div className="w-full aspect-w-3 aspect-h-2 ">
                <Image
                    className="rounded-xl"
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    loading="lazy"
                    alt="article"
                    src={article.thumbnail}
                />
            </div>
            <p className="font-semibold text-lg line-clamp-2 group-hover:text-primary ">
                {article.title}
            </p>
            <p className="text-sm text-black/50">
                {formatDate(article.createdAt)}
            </p>
        </Link>
    );
};

export default Article;
