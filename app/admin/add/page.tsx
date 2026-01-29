import {asinSchema} from "@/src/validators";
import {monitorProduct} from "@/src/apiHelper";
import { redirect, RedirectType } from 'next/navigation'
import {SubmitButton} from "@/components/submitButton";

async function addProductMonitoring(formData: FormData) {
    "use server"
    const raw = {
        asin: formData.get("asin"),
    };
    const parsed = asinSchema.safeParse(raw);
    if (!parsed.success) {
        const error = parsed.error.flatten().fieldErrors.asin?.[0]  ?? "入力内容が正しくありません";
        redirect(`/admin/error/?message=${encodeURIComponent(error)}`, RedirectType.replace)
    } else {
        const {asin} = parsed.data;
        await monitorProduct(asin);

        redirect('/admin/dashboard', RedirectType.replace)
    }
}

export default async function addPage() {
    return (
        <div className="max-w-xl bg-white p-6 rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">モニタリング・追加</h1>

            <form className="space-y-4" action={addProductMonitoring}>
                <div className="mt-8">
                    <label
                        className="block text-sm mb-1">ASIN（Amazon標準商品番号、10桁のアルファベットと数字の組み合わせ）</label>
                    <input
                        name="asin"
                        type="text"
                        placeholder="ASIN：10桁"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <SubmitButton/>
            </form>
        </div>
    );
};