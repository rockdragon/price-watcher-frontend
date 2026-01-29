import {searchProductByPaging, updateProductMonitored} from "@/src/apiHelper";
import {PageResponse, Product} from "@/src/entities";
import {revalidatePath} from "next/cache";
import Link from "next/link";
import NotificationSettingButton from "@/components/notificationSettingButton";

type Props = {
    searchParams: Promise<{
        keyword?: string
        page?: string
    }>
}

async function toggleMonitoredAction(
    id: number,
    monitored: boolean
) {
    await updateProductMonitored(id, monitored)
    revalidatePath("/admin/dashboard")
}

export default async function dashboardPage({searchParams}: Props) {
    const params = await searchParams
    const keyword = params.keyword ?? ""
    const page = Number(params.page ?? 0)
    const products: PageResponse<Product> = await searchProductByPaging(keyword, page)
    const currentPage = page;
    const hasPrev = currentPage > 0;
    const hasNext = !products.last;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">モニタリング・リスト</h1>

            <div className="mb-4 flex gap-2">
                <form method="get" className="mb-4 flex gap-2">
                    <input
                        name="keyword"
                        placeholder="キーワード"
                        defaultValue={keyword}
                        className="border rounded px-3 py-2 flex-1"
                    />

                    <input type="hidden" name="page" value="0"/>

                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        検索
                    </button>
                </form>
            </div>

            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-3 py-2 text-left">ASIN</th>
                    <th className="border px-3 py-2 text-left">商品</th>
                    <th className="border px-3 py-2">モニタリング中？</th>
                    <th className="border px-3 py-2">値下げの通知</th>
                    <th className="border px-3 py-2">操作</th>
                </tr>
                </thead>
                <tbody>
                {products.content.length > 0 && products.content.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-3 py-2">
                            <a href={item.pageUrl} target="_blank" className="text-xs text-blue-600 hover:underline">
                                {item.asin}
                            </a>
                        </td>
                        <td className="border px-3 py-2">{item.name}</td>
                        <td className="border px-3 py-2 ">
                            <div className="flex items-center justify-center gap-2">
                                <span>{item.monitored ? "有り" : "無し"}</span>
                                <form action={async () => {
                                    "use server"
                                    await toggleMonitoredAction(item.id, !item.monitored)
                                }}
                                >
                                    <button
                                        type="submit"
                                        className="text-xs text-blue-600 hover:underline cursor-pointer"
                                    >
                                        切替
                                    </button>
                                </form>
                            </div>
                        </td>
                        <td className="border px-3 py-2 text-center">
                            <NotificationSettingButton
                                productId={item.id}
                            />
                        </td>
                        <td className="border px-3 py-2 text-center">
                            <a
                                href={`/admin/priceTrend/${item.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                詳細
                            </a>
                        </td>
                    </tr>
                ))}
                {products.content.length == 0 && (
                    <tr>
                        <td colSpan={4} className="border px-3 py-2 text-center">データー無し</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end gap-2">
                {/* 前へ */}
                {hasPrev ? (
                    <Link
                        href={{
                            pathname: "/admin/dashboard",
                            query: {
                                keyword,
                                page: currentPage - 1,
                            },
                        }}
                        className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                    >
                        前へ
                    </Link>
                ) : (
                    <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
                    前へ
                    </span>
                )}
                {/* 次へ */}
                {hasNext ? (
                    <Link
                        href={{
                            pathname: "/admin/dashboard",
                            query: {
                                keyword,
                                page: currentPage + 1,
                            },
                        }}
                        className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                    >
                        次へ
                    </Link>
                ) : (
                    <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
                        次へ
                    </span>
                )}
            </div>
        </div>
    );
};