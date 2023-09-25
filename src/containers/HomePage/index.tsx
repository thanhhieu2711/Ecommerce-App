'use client';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner';
import Container from '@/components/Layout/Container';
type Props = {};

export default function HomePageContainer(props: Props) {
    return (
        <div className=" sm:pt-20 pb-10 bg-secondary">
            <Container>
                <CategoryAndBanner />
            </Container>
        </div>
    );
}
