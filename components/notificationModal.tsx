"use client";

import {useEffect, useState, useTransition} from "react";
import {
    getNotificationSetting,
    updateNotificationSetting
} from "@/src/apiHelper";

type Props = {
    productId: number;
    onClose: () => void;
};

export default function NotificationModal({productId, onClose}: Props) {
    const [enabled, setEnabled] = useState(false);
    const [rate, setRate] = useState(5.0); // 5%
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    // 🔥 Modal 打开时拉取服务器数据
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const data = await getNotificationSetting(productId);

                if (!mounted) return;

                setEnabled(data.notificationEnabled);
                setRate(data.decreaseRate);
                setEmail(data.recipientEmail ?? "");
            } catch (e) {
                console.error(e);
                // 没设置过时保持默认值即可
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [productId]);

    const onSubmit = () => {
        startTransition(async () => {
            await updateNotificationSetting({
                productId,
                notificationEnabled: enabled,
                decreaseRate: rate,
                recipientEmail: email,
            });
            onClose();
        });
    };

    // ⏳ loading 状态
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded p-6 text-sm">
                    読み込み中...
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] rounded shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                    値下げ通知設定
                </h2>

                <div className="space-y-4 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)}
                        />
                        通知を有効にする
                    </label>

                    <div>
                        <label className="block mb-1">
                            値下げ率（％）
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={90}
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">
                            通知先メール
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        キャンセル
                    </button>
                    <button
                        disabled={isPending}
                        onClick={onSubmit}
                        className="px-4 py-2 bg-gray-800 text-white rounded"
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}
