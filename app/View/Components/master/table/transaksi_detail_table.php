<?php

namespace App\View\Components\master\table;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class transaksi_detail_table extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.master.table.transaksi_detail_table');
    }
}
