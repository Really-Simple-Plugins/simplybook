import React from "react";

const CalendarLoading = () => {
    let grayBackground = "bg-gray-100";
    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg animate-pulse mt-5">
            <div className={`text-white text-center py-3 rounded-t-lg ${grayBackground}`}>
                <h2 className="h-10"></h2>
            </div>

            <div className="p-4">
                <div className="text-center h-40">
                    <div className={`w-full h-full ${grayBackground} rounded-md`}></div>
                </div>
            </div>

            <div className="p-4 border-t">
                <h4 className="text-gray-700 font-bold mb-4">
                    <div className={`h-6 ${grayBackground} rounded-md`}></div>
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                </div>
                <div className="text-gray-500 text-sm mt-3">
                    <span className={`inline-block w-3 h-3 rounded-full ${grayBackground}`}></span> - <span
                    className="font-medium"></span>
                </div>
            </div>
        </div>
    );
}
export default CalendarLoading;
