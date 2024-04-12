import ArticleDetailCtn from '@/containers/Articles/ArticleDetail';
import { Metadata } from 'next';

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    return {
        title: params.slug.replaceAll('-', ' '),
    };
};

export default function ArticleDetail({ params }: Props) {
    return <ArticleDetailCtn slug={params.slug} />;
}
