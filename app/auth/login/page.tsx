import {redirect} from "next/navigation";

export default function LoginPage() {
    async function login(formData: FormData) {
        "use server";

        const user = formData.get("user");
        const pass = formData.get("pass");

        if (user === "admin" && pass === "ClAoWl1GECvQ") {
            redirect("/admin/dashboard");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                action={login}
                className="w-96 bg-white p-8 rounded-lg shadow space-y-6"
            >
                <h1 className="text-2xl font-semibold text-center">
                    管理画面ログイン
                </h1>

                <input
                    name="user"
                    placeholder="Username"
                    className="w-full border p-2 rounded"
                    defaultValue="admin"
                />

                <input
                    name="pass"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    defaultValue="ClAoWl1GECvQ"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    ログイン
                </button>
            </form>
        </div>
    );
}