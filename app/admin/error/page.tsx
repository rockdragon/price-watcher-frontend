type Props = {
    searchParams: Promise<{
        message?: string;
    }>
}

export default async function ErrorPage({ searchParams }: Props) {
    const params = await searchParams
    const message = params.message
        ? decodeURIComponent(params.message)
        : "不明なエラー";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
                <h1 className="text-xl font-semibold text-red-600 mb-4">
                    エラーが発生しました
                </h1>

                <p className="text-gray-700 break-all">
                    エラー内容：
                    <span className="ml-2 font-mono text-sm text-gray-900">
                        {decodeURIComponent(message)}
                    </span>
                </p>

                <div className="mt-6 text-right">
                    <a
                        href="/admin/dashboard"
                        className="text-blue-600 hover:underline text-sm"
                    >
                        ダッシュボードへ戻る
                    </a>
                </div>
            </div>
        </div>
    );
}
