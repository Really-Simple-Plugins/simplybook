<?php

namespace SimplyBook\Interfaces;

interface ListenerInterface
{
    /**
     * The method that gets called by the ListenerManager to hook into the
     * events its listening to
     */
    public function listen(): void;
}
