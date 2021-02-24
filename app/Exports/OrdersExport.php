<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Excel;

class OrdersExport implements FromCollection, Responsable, WithMapping, WithHeadings, ShouldAutoSize
{
    use Exportable;

    /**
     * It's required to define the fileName within
     * the export class when making use of Responsable.
     */
    private $fileName = 'orders.xlsx';

    /**
     * Optional Writer Type
     */
    private $writerType = Excel::XLSX;

    /**
     * Optional headers
     */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function headings(): array
    {
        return [
            '#',
            'Email',
            'Comment',
            'Products',
            'Created at',
        ];
    }

    /**
     * @var Order $order
     */
    public function map($order): array
    {
        $products = $order->products->map(function ($item) {
            return [
                $item->vendor_code,
                $item->slug,
                $item->pivot->quantity,
            ];
        });

        return [
            $order->id,
            $order->email,
            $order->comment,
            $products,
            $order->created_at,
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Order::all();
    }
}
