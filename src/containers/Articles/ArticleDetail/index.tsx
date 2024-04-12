'use client';
import Container from '@/components/Layout/Container';
import { TArticleInfo } from '@/types/general';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './articledetail.module.css';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/helper';
type Props = {
    slug: string;
};

const ArticleDetailCtn = ({ slug }: Props) => {
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState<TArticleInfo>();
    const [relatedArticles, setRelatedArticles] = useState<TArticleInfo[]>([]);

    const handleGetArticle = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/articles/${slug}`);
            if (data.isSuccess) {
                setArticle(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetRelatedArticles = async () => {
        try {
            const { data } = await axios.get(`/api/articles/related/${slug}`);
            if (data.isSuccess) {
                setRelatedArticles(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetArticle();
        handleGetRelatedArticles();
    }, [slug]);

    return (
        <div className="w-full h-full bg-secondary py-10 relative">
            <Container>
                <div className="grid grid-cols-6 gap-6 relative min-h-[70vh]">
                    {article?.id && (
                        <div
                            className={cn(
                                'col-span-6 md:col-span-4 bg-white rounded-lg p-4 shadow-card-flight'
                            )}
                        >
                            <p className="text-2xl md:text-3xl font-bold">
                                {article.title}
                            </p>
                            <div className="flex items-center gap-2 mt-4 ">
                                <Image
                                    src={'/assets/images/fallback_user.jpeg'}
                                    alt="article-img"
                                    loading="lazy"
                                    width={45}
                                    height={45}
                                    objectFit="contain"
                                    objectPosition="center"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold ">
                                        {article?.author}
                                    </p>
                                    <p className="text-xs text-black/80">
                                        {formatDate(article?.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={cn('mt-10', styles.content)}
                                dangerouslySetInnerHTML={{
                                    __html: article.content || '',
                                }}
                            />
                        </div>
                    )}
                    {!!relatedArticles.length && (
                        <div className="col-span-2 hidden md:flex flex-col gap-4 bg-white p-4 rounded-lg shadow-card-flight h-fit">
                            <p className="font-semibold text-xl">
                                Bài viết liên quan
                            </p>
                            {relatedArticles.map((i) => {
                                return (
                                    <Link
                                        href={`/articles/${i.slug}`}
                                        key={i.id}
                                        className="w-full border rounded-lg
                                    p-2 flex gap-2 group"
                                    >
                                        <Image
                                            src={i.thumbnail}
                                            alt=""
                                            className="rounded-lg h-[70px]"
                                            width={100}
                                            height={100}
                                            objectFit="contain"
                                            objectPosition="center"
                                            loading="lazy"
                                        />
                                        <div className="flex-1 flex flex-col gap-1">
                                            <p className="font-medium line-clamp-2 group-hover:text-primary">
                                                {i.title}
                                            </p>
                                            <p className="ml-auto text-xs text-black/50">
                                                {formatDate(i.createdAt)}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ArticleDetailCtn;
