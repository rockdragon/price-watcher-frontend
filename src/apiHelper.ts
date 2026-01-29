// search products by paging
export async function searchProductByPaging(keyworkd: string, page: number = 0) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/product/search?keyword=${keyworkd}&page=${page}`;

    try {
        const res = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// update product's monitored
export async function updateProductMonitored(id: number, monitored:boolean) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/product/update_product_monitored?id=${id}&monitored=${monitored}`;
    try {
        const res = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// get single prodcut info
export async function getProduct(id: number) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/product/${id}`;
    try {
        const res = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// submit a crawl job
export async function monitorProduct(asin: string) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/spider/crawl/${asin}`;
    try {
        const res = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// get product price trends
export async function getProductPriceTrends(id: number) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/product/${id}/price_trends`;
    try {
        const res = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// get price notification
export async function getNotificationSetting(productId: number) {
    const apiURL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/notification/product/${productId}/setting`;
    try {
        const res = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // if backend side returned HttpOnly cookie
            cache: "no-store",
        });

        return res.json() as Promise<{
            productId: number;
            notificationEnabled: boolean;
            decreaseRate: number;
            recipientEmail: string;
        }>;
    } catch (error) {
        console.error(error);
        return null;
    }
}
// set price notification
export async function updateNotificationSetting(payload: {
    productId: number;
    notificationEnabled: boolean;
    decreaseRate: number;
    recipientEmail: string;
}) {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/notification/product/setting`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
}
