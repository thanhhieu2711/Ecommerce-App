'use client';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner';
import Container from '@/components/Layout/Container';
type Props = {};

export default function HomePageContainer(props: Props) {
    return (
        <div className="pt-4 pb-4 bg-secondary">
            <Container>
                <CategoryAndBanner />
            </Container>
        </div>
    );
}
