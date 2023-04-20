export default function Loader({msg}) {
    return (
        <div className="my-3 flex justify-center items-center">
            <div className="border-r-4 border-dotted border-emerald-600 rounded-full h-10 w-10 animate-spin">
            </div>
            <span className="text-emerald-500 m-5">{msg}...</span>
        </div>
    )
}