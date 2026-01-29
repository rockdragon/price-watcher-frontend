"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`
                mt-2 px-4 py-2 rounded text-white
                ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
        >
            {pending ? "送信中..." : "サブミット"}
        </button>
    );
}