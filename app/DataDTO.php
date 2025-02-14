<?php

namespace App;

class DataDTO
{
    public $data;

    public function __construct(array $data)
    {

        $this->data = $data;
    }

    public function toArray()
    {
        return $this->data;
    }
}
