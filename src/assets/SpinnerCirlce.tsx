const SpinnerCircle = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-lime-800">
            <div
                className="w-20 h-20 border-4 border-white border-t-pink-400 rounded-full animate-spin"
            />
        </div>
    );
};

export default SpinnerCircle;