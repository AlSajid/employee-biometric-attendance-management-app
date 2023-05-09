export default function HomeButton({ menu }) {

    return (
        <button className="p-5 rounded-xl w-60 h-40 gap-1
                        text-white font-semibold text-center 
                        mx-auto flex justify-center items-center flex-col
                        transition duration-100 hover:scale-110 ease-in-out"
        >
            <span className="text-5xl">{menu.icon}</span>
            <span className="text-3xl">{menu.option}</span>
        </button>
    )
}