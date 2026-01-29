"use client";

import {PriceTrend} from "@/src/entities";
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const mockChartData = [
    { date: "2025-01-01", price: 3200},
    { date: "2025-01-15", price: 3500},
    { date: "2025-02-01", price: 3100},
    { date: "2025-02-15", price: 3600},
    { date: "2025-03-01", price: 3800},
    { date: "2025-03-15", price: 4000},
    { date: "2025-04-01", price: 4500},
    { date: "2025-04-15", price: 3800},
    { date: "2025-05-01", price: 4800},
    { date: "2025-05-15", price: 3900},
    { date: "2025-06-01", price: 4300},
    { date: "2025-06-15", price: 4500},
    { date: "2025-07-01", price: 4800},
    { date: "2025-07-15", price: 5200},
    { date: "2025-08-01", price: 4500},
    { date: "2025-08-15", price: 4760},
    { date: "2025-09-01", price: 5100},
    { date: "2025-09-15", price: 5000},
    { date: "2025-10-01", price: 4800},
    { date: "2025-10-15", price: 4800},
    { date: "2025-11-01", price: 4200},
    { date: "2025-11-15", price: 4300},
    { date: "2025-12-01", price: 4400},
    { date: "2025-12-15", price: 4500},
];

type Props = {
    priceTrends: PriceTrend[]
}

export default function Chart({ priceTrends }: Props) {
    return (
        <div className="h-[360px]">
            <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={priceTrends}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="priceDate"/>
                        <YAxis/>
                        <Tooltip/>

                        <Bar
                            dataKey="price"
                            fill="#34d399"
                            radius={[4, 4, 0, 0]}
                        />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#facc15"
                            strokeWidth={3}
                            dot={false}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
