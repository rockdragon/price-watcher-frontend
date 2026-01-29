"use client";

import {useState} from "react";
import NotificationModal from "./notificationModal";

type Props = {
    productId: number;
};

export default function NotificationSettingButton(props: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-xs text-blue-600 hover:underline"
            >
                設定
            </button>

            {open && (
                <NotificationModal
                    {...props}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
