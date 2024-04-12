import { TArticleInfo } from '@/types/general';
import { formatDate } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';

type Props = {
    article: TArticleInfo;
};

const Article = ({ article }: Props) => {
    return (
        <Link
            href={`/articles/${article.slug}`}
            key={article.id}
            className="col-span-1 flex flex-col bg-white shadow-card-flight rounded-xl gap-4 cursor-pointer group"
        >
            <div className="w-full aspect-w-3 aspect-h-2 ">
                <Image
                    className="rounded-xl rounded-b-none"
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    loading="lazy"
                    alt="article"
                    src={article.thumbnail}
                />
            </div>
            <div className="flex-1 px-2 pb-2 flex flex-col gap-2">
                <p className="font-semibold text-lg line-clamp-2 group-hover:text-primary ">
                    {article.title}
                </p>
                <p className="text-sm text-black/50 mt-auto">
                    {formatDate(article.createdAt)}
                </p>
            </div>
        </Link>
    );
};

export default Article;
