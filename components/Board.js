export default function Board({ children, title, actionButton }) {

    return (
        <div className="flex mx-5 h-full flex-col">
            <div className="my-3 grid grid-cols-12">
                <div className="col-span-6">
                    <h1 className="text-3xl font-bold flex-none theme-text">{title}</h1>
                </div>

                <div className="col-span-6 flex justify-end">
                    {actionButton}
                </div>
            </div>

            <div className="rounded-lg w-full grow overflow-y-auto shadow" style={{ backgroundColor: " rgb(94, 234, 212, 0.3)" }}>
                {children}
            </div>
        </div>
    )
}