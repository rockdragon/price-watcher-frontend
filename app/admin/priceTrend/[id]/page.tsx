import Chart from "@/components/chart";
import {Product} from "@/src/entities";
import {getProduct, getProductPriceTrends} from "@/src/apiHelper";

type Props = Promise<{
    id: number
}>

export default async function PriceTrendPage({params}: { params: Props }) {
    const {id} = await params;
    const [product, priceTrends] = await Promise.all([
        await getProduct(id),
        await getProductPriceTrends(id),
    ]);

    return (
        <div className="space-y-6">
            {/* base info */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h1 className="text-xl font-semibold mb-4">商品詳細</h1>
                <div className="flex flex-col gap-2">
                    <div className="row-span w-sm flex items-center justify-center bg-gray-100 rounded">
                        <img
                            src={product.photoUrl}
                            alt={product.name}
                            className="max-h-60 object-contain"
                        />
                    </div>
                    <div>
                        <span className="text-gray-500">ASIN：</span>
                        <a href={product.pageUrl} target="_blank" className="underline text-blue-600"
                           rel="noreferrer">
                            {product.asin}
                        </a>
                    </div>
                    <div>
                        <span className="text-gray-500">商品：</span>
                        {product.name}
                    </div>
                    <div>
                        <span className="text-gray-500">状態：</span>
                        {product.outOfStock ?
                            (<label className="text-red-500">在庫切れ</label>) :
                            (<label className="text-green-500">在庫有り</label>)}
                    </div>
                </div>
            </div>

            {/* chart */
            }
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4">価格変化トレンド（単位：円）</h2>
                    </div>
                    <div className="p-4">
                        {/*<button*/}
                        {/*    className="*/}
                        {/*        inline-flex items-center*/}
                        {/*        rounded-md*/}
                        {/*        bg-blue-600*/}
                        {/*        px-4 py-2*/}
                        {/*        text-sm font-medium text-white*/}
                        {/*        hover:bg-blue-700*/}
                        {/*        active:bg-blue-800*/}
                        {/*  ">*/}
                        {/*    即時取得（手動）*/}
                        {/*</button>*/}
                    </div>
                </div>
                <Chart priceTrends={priceTrends}/>
            </div>
        </div>
    )
}