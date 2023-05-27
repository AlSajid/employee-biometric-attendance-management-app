export default function Board({ children, title, actionButton}) {

    return (
        <div className="flex mx-5 h-full flex-col">

            {/* top menus */}
            <div className="my-3 grid grid-cols-12">
                <div className="col-span-6">
                    <h1 className="text-3xl font-bold flex-none theme-text m-6">{title}</h1>
                </div>

                <div className="col-span-6 flex justify-end">
                    {actionButton}
                </div>
            </div>

            <div className="rounded-xl w-full grow mb-3 overflow-y-auto shadow bg-teal-100">
                {children}
            </div>
        </div>
    )
}