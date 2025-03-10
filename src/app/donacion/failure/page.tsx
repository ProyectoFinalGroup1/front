import Link from "next/link";

const Failure = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
                <h1 className="text-xl font-bold text-gray-700">¡Ha ocurrido un error!</h1>
                <p className="text-gray-600 mt-2">Tu donación no se ha podido concretar, por favor intenta nuevamente</p>
                <Link href="/dashboard/user/donaciones">
                    <button className="bg-green-800 hover:bg-green-500 px-4 py-2 text-base font-bold text-white rounded-xl transition-all duration-150
                                        my-4">
                        Click aquí para volver a donar.
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Failure;