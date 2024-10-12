<?php

namespace App\View\Components\master\modal;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class metode_modal extends Component
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
        return view('components.master.modal.metode_modal');
    }
}
