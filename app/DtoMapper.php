<?php

namespace App;

class DtoMapper
{
    public static function toDTO($model, array $excludeFields = []): DataDTO
    {

        $data = $model->toArray();

        foreach ($excludeFields as $field) {

            unset($data[$field]);
        }

        return new DataDTO($data);
    }

    public static function toDTOCollection($models, array $excludeFields = []): array
    {
        return $models->map(function ($model) use ($excludeFields) {
            return self::toDTO($model, $excludeFields);
        })->toArray();
    }
}
