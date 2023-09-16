import Container from './Container';
type Props = {};

export default function TopHeader(props: Props) {
    return (
        <div className="max-w-full bg-black">
            <Container>
                <div className="w-full text-center">
                    <p className="text-xs py-3 text-white">Top header</p>
                </div>
            </Container>
        </div>
    );
}
