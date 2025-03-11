const Pending = () => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
                <h1 className="text-xl font-bold text-gray-700">¡Tu donación está pendiente!</h1>
                <p className="text-gray-600 mt-2">Por favor espera unos segundos para asegurar el estado de tu donación...</p>
            </div>
        </div>
    );
}

export default Pending;