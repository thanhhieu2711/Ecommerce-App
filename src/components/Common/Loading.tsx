type Props = {};

export const Loading = (props: Props) => {
    return (
        <div className="absolute inset-0 grid place-items-center z-[100] bg-transparent">
            <div className="absolute w-[500px] h-[500px] flex justify-center items-center z-[200]">
                <div className="flex items-center justify-center h-screen">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-white"></div>
                        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-primary/80 animate-spin"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
