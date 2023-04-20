export default function Board({ children, title }) {

    return (
        <div className="flex mx-5 h-full flex-col">
            <div className="my-3">
                <h1 className="text-3xl font-bold flex-none theme-text">{title}</h1>
            </div>

            <div className="rounded-xl w-full grow overflow-y-scroll" style={{ backgroundColor: "rgba(9, 185, 150, 0.15)" }}>
                {children}
            </div>
        </div>
    )
}