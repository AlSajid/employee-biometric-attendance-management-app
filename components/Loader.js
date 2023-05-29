export default function Loader({msg}) {
    return (
        <div className="flex justify-center items-center cursor-wait">
            <div className="border-r-4 border-dotted border-teal-700 rounded-full h-7 w-7 animate-spin">
            </div>
            <span className="text-teal-700 m-5">{msg}...</span>
        </div>
    )
}